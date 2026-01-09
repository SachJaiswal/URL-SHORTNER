const Url = require("../model/url");
const User = require("../model/user");
const QRCode = require('qrcode');

async function handleGenerateNewShortURl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'url is required' });

    // Fetch user details to ensure name is available for the view
    const user = await User.findById(req.user._id);

    // 1. Check if this URL is already shortened
    // If it exists, return the existing one instead of creating a new one (and crashing)
    const existingEntry = await Url.findOne({ redirect_url: body.url, createdBy: req.user._id });
    if (existingEntry) {
        const allUrls = await Url.find({ createdBy: req.user._id });
        const qrCode = await QRCode.toDataURL(`${req.protocol}://${req.get("host")}/${existingEntry.short_id}`, { width: 400, margin: 2 });
        return res.render("home", { id: existingEntry.short_id, urls: allUrls, user: user, qrCode });
    }

    // 2. If not found, generate a new ID and create
    // Use nanoid (dynamic import for ESM compatibility)
    const { nanoid } = await import('nanoid');
    const shortID = nanoid(8);

    try {
        await Url.create({
            short_id: shortID,
            redirect_url: body.url,
            visit_history: [],
            createdBy: req.user._id,
        });
        const allUrls = await Url.find({ createdBy: req.user._id });
        const qrCode = await QRCode.toDataURL(`${req.protocol}://${req.get("host")}/${shortID}`, { width: 400, margin: 2 });
        return res.render("home", { id: shortID, urls: allUrls, user: user, qrCode });
    } catch (error) {
        console.error("Error in handleGenerateNewShortURl:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

async function getAnalysis (req,res){
    const shortId = req.params.shortId;
    const url = await Url.findOne({short_id:shortId});
    if (!url) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    return res.render("analytics", {
        url: url,
        user: req.user,
        shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`
    });
}

async function handleDeleteShortUrl(req, res) {
    const shortId = req.params.shortId;
    await Url.findOneAndDelete({ short_id: shortId, createdBy: req.user._id });
    const allUrls = await Url.find({ createdBy: req.user._id });
    const user = await User.findById(req.user._id);
    return res.render("home", { urls: allUrls, user: user });
}

async function handleRenderQrPage(req, res) {
    const allUrls = await Url.find({ createdBy: req.user._id });
    const user = await User.findById(req.user._id);
    return res.render("qrcode", { urls: allUrls, user: user });
}

async function handleGetQrCode(req, res) {
    const shortId = req.params.shortId;
    const urlEntry = await Url.findOne({ short_id: shortId });
    if (!urlEntry) return res.status(404).json({ error: "URL not found" });
    
    const url = `${req.protocol}://${req.get("host")}/${shortId}`;
    const qrCode = await QRCode.toDataURL(url, { width: 400, margin: 2 });
    return res.json({ qrCode });
}

module.exports = {
    handleGenerateNewShortURl,
    getAnalysis,
    handleDeleteShortUrl,
    handleRenderQrPage,
    handleGetQrCode
};

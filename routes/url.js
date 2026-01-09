const express = require("express");
const router = express.Router();
const Url = require("../model/url");
const {handleGenerateNewShortURl,getAnalysis, handleGetQrCode}= require("../controller/url");
/* =======================
    ROUTES
======================= */


router.post("/",handleGenerateNewShortURl);

router.get("/analytics/:shortId",getAnalysis);
router.get("/qr/:shortId", handleGetQrCode);
module.exports = router;
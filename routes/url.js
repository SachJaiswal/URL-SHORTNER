const express = require("express");
const router = express.Router();
const Url = require("../model/url");
const {handleGenerateNewShortURl,getAnalysis}= require("../controller/url");
/* =======================
    ROUTES
======================= */


router.post("/",handleGenerateNewShortURl);

router.get("/analysis/:shortId",getAnalysis);
module.exports = router;
const express = require("express");
const router = express.Router();
const Url = require("../model/url");
const User=require("../model/user")

router.get("/", async (req, res) => {
    if(!req.user) return res.redirect('/login');
    const allUrls = await Url.find({createdBy:req.user._id});
    return res.render("home", {
        urls: allUrls
    });
});

router.get("/signup",async(req,res)=>{
    return res.render("signup"); 
})

router.get("/login",async(req,res)=>{
    return res.render("login");
})

router.get("/logout", (req, res) => {
    res.clearCookie('uid');
    return res.redirect('/login');
});
module.exports = router;

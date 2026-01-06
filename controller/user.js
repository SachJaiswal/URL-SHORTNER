const User =require('../model/user')
const Url = require('../model/url')

const {setUser} = require('../service/auth');

async function handleUserSignUp(req,res){
    const{name,email,password}=req.body
    const user = await User.create({
        name,
        email,
        password,
    });
    const token = setUser(user.toObject());
    res.cookie('uid',token);
    const allUrls = await Url.find({createdBy: user._id});
    return res.render('home', {urls: allUrls, user: user});

}

async function handleUserLoginIn(req,res){
    const{email,password}=req.body
    const user = await User.findOne({
        email,
        password,
    });
    if(!user) return res.render('login',{
        msg:'Invalid Credentials'
    });
    
    const token = setUser(user.toObject());
    res.cookie('uid',token);
    const allUrls = await Url.find({createdBy: user._id});
    return res.render('home', {urls: allUrls, user: user});
}

module.exports={
    handleUserSignUp,
    handleUserLoginIn
}
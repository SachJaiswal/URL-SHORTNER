const {getUser} = require('../service/auth');


async function resstrictToLoggedinUserOnly(req,res,next){
    const userUid = req.headers["authorization"] || req.cookies.uid;
    if(!userUid) return res.redirect('/login');
    const token = userUid.startsWith('Bearer ') ? userUid.split(' ')[1] : userUid;
    try {
        const user = getUser(token);
        if(!user) return res.redirect('/login');
        req.user = user;
        next();
    } catch(err) {
        return res.redirect('/login');
    }
}

async function checkAuth(req,res,next){
    const userUid = req.headers["authorization"] || req.cookies.uid;
    try {
        if(userUid) {
            const token = userUid.startsWith('Bearer ') ? userUid.split(' ')[1] : userUid;
            const user = getUser(token);
            req.user = user;
        }
    } catch(err) {
        // Silent fail - user will be undefined if token is invalid
    }
    next();
}
module.exports = {
    resstrictToLoggedinUserOnly,
    checkAuth
};
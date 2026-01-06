const jwt =require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

function setUser (user){
    return jwt.sign({
        _id:user._id,
        email:user.email
    },JWT_SECRET_KEY);
}

function getUser (token){
    //Verify The User
    if(!token) return null;
    const user = jwt.verify(token,JWT_SECRET_KEY);
    return user;    
}

module.exports = {setUser,getUser};






















//StateLess
// const sessionIdToUserMap = new Map();

// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
//     return sessionIdToUserMap.get(id);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

// module.exports = {setUser,getUser};
const express=require('express')
const {handleUserSignUp,handleUserLoginIn}=require('../controller/user')
const router=express.Router();


router.post('/',handleUserSignUp);
router.post('/login',handleUserLoginIn);

module.exports=router;

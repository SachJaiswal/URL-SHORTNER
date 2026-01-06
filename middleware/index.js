//Log of the request
const fs = require("fs");

function  logreqres(filename){
    return (req,res,next)=>{
        fs.appendFile(
    filename,
    `${new Date().toISOString()} | ${req.method} | ${req.ip} | ${req.url}\n`,
    () => {}
  );
  next();
    }
}
module.exports=logreqres;
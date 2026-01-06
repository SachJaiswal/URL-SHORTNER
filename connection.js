const mongoose = require("mongoose");

async function connectiondb(url){
    return mongoose.connect(url)
}

module.exports = connectiondb
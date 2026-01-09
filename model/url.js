const mongoose= require("mongoose");

const urlSchema = new mongoose.Schema({
    short_id:{
        type:String,
        required:true,
        unique:true
    },
    redirect_url:{
        type:String,
        required:true
    },
    visit_history:{
        type:[{
            ip_address:{type:String},
            visited_at:{type:Date},
            user_agent:{type:String},
            referer:{type:String},
            country:{type:String},
            city:{type:String}
        }]
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }

},{timestamps:true})

const Url = new mongoose.model("url",urlSchema)

module.exports = Url;
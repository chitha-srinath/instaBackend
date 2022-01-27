const mongoose = require("mongoose");

const schema = mongoose.Schema

const postSchema = new schema({
    image :{type: String},
    name: {type:String},
    location: {type:String},
    // likes : {type:Number, default:0},
    description : {type:String},
    // image :{type: String},
    // date : {type:Number, default: Date.now()}
});

const post = mongoose.model("post", postSchema )

module.exports = post;
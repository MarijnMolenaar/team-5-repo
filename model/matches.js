const mongoose = require("mongoose")

const { Schema } = mongoose;
//structuur van  de database 

const matchesSchema = new mongoose.Schema({
    name:String,
    age:Number,
    name:String,
    country:String,
    bio: String,
    name_a :String,
    age_a : Number,
    type_a : String,
    breed_a :String,
    bio_a :String,
    liked : String

})
module.exports = mongoose.model("matches",  matchesSchema)

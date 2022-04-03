const mongoose = require("mongoose")


//creating a schema for the profiles
const profilesSchema = new mongoose.Schema({
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
//exports the data in the myprofile collection in de database to the profiiesschema
module.exports = mongoose.model( "myprofile" , profilesSchema)

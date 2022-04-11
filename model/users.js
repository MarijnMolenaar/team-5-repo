const mongoose = require("mongoose")


//creating a schema for the profiles
const userSchema = new mongoose.Schema({
    imgUrl : {
       type :String  
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },

    country: {
        type : Array , 
    },
    email :{
        type:String,
        required:true,
    },
     password:{
         type:String,
         required:true
    },
    bio: String,

    interests: {
        type : Array ,
    },
    url_a: String,

   // voor de  huisdier
    name_a: {
        type: String,
        required: true,
    },

    age_a: {
        type: Number,
        required: true,
    },


    type_a: {
        type: String,
        required: true,
    },
    age_a: {
        type: Number,
        required: true,
    },

    breed_a: {
        type: String,
        required: true,
    },

    bio_a: {
        type: String,
        required: true,
    },
},
{collection:"users"})


const User= mongoose.model ('User',  userSchema)
module.exports = User;
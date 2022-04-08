const mongoose = require("mongoose");

// Structuur van de database 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,

    },
});
// Model exporteren 
const User = mongoose.model("User", userSchema)
module.exports = User;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "Fullname not provided"]
    },
    email: {
        type: String,
        required: [true, "Email not provided"],
        lowercase: true,
        trim: true,
        unique: [true, "Email already exists"],
        validator: function(v) {
            return /^[a-zA-Z0-9._+]+(?<![0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v);
        },
        message: "Not a valid email"
    },
    role: {
        type: String,
        required: [true, "Role not provided"],
        enum: ["normal", "admin"]
    },
    preferences: {
        type: String,
        required: false,
        enum: ["business", "entertainment", "general", 
        "health", "science", "sports", "technology"]
    },
    password: {
        type: String,
        required: [true, "Password not provided"]
    },
    created: {
        type: Date,
        default: Date.now
    }

});


module.exports = mongoose.model("User", userSchema);
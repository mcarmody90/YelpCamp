var mongoose                = require("mongoose");
var passportLocalMongoose   = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    avatar: String, //add default later
    firstName: String,
    lastName: String,
    email: String,
    about: String
});

UserSchema.plugin(passportLocalMongoose); // takes the wheel and adds in methods to our user.

module.exports = mongoose.model("User", UserSchema);
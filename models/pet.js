var mongoose = require("mongoose");

// create schema, pets have text and author
var petSchema = mongoose.Schema({
    name: String,
    breed: String,
    dob: String,
    text: String,
    image: String,
});

module.exports = mongoose.model("Pet", petSchema);
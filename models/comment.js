var mongoose = require("mongoose");

// create schema, comments have text and author
var commentSchema = mongoose.Schema({
    text: String,
    dateMade: String,
    dateShow: String,
    date: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String,
        avatar: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);
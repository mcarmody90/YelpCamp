var mongoose = require("mongoose");

// create schema, comments have text and author
var commentSchema = mongoose.Schema({
    text: String,
    dateShow: String,
    date: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment", commentSchema);
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
    },
    comments: [ // comments should be an array of comment IDs
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
       }
    ]
});

module.exports = mongoose.model("Comment", commentSchema);
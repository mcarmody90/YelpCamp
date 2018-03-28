var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    dateMade: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [ // comment should be an array of comment IDs
       {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Comment"
       }
    ]
});

module.exports = mongoose.model("Campground", campgroundSchema);
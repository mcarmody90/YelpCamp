var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

// define array with 3 pieces of data, exactly what our model is expecting.
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas ipsum ut nisi interdum, a auctor neque scelerisque. Maecenas molestie urna aliquam suscipit faucibus. Praesent malesuada, enim et viverra fermentum, elit nunc venenatis leo, eget egestas metus libero a risus. Nunc neque magna, accumsan ac consectetur venenatis, posuere eget mauris. Duis id vulputate turpis. Nullam vitae vestibulum felis. Nullam eleifend massa vitae nunc placerat pharetra. Pellentesque sagittis orci vitae consectetur hendrerit. Fusce non risus sit amet nisl dapibus posuere. Vestibulum gravida faucibus augue vitae placerat."
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas ipsum ut nisi interdum, a auctor neque scelerisque. Maecenas molestie urna aliquam suscipit faucibus. Praesent malesuada, enim et viverra fermentum, elit nunc venenatis leo, eget egestas metus libero a risus. Nunc neque magna, accumsan ac consectetur venenatis, posuere eget mauris. Duis id vulputate turpis. Nullam vitae vestibulum felis. Nullam eleifend massa vitae nunc placerat pharetra. Pellentesque sagittis orci vitae consectetur hendrerit. Fusce non risus sit amet nisl dapibus posuere. Vestibulum gravida faucibus augue vitae placerat."
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin egestas ipsum ut nisi interdum, a auctor neque scelerisque. Maecenas molestie urna aliquam suscipit faucibus. Praesent malesuada, enim et viverra fermentum, elit nunc venenatis leo, eget egestas metus libero a risus. Nunc neque magna, accumsan ac consectetur venenatis, posuere eget mauris. Duis id vulputate turpis. Nullam vitae vestibulum felis. Nullam eleifend massa vitae nunc placerat pharetra. Pellentesque sagittis orci vitae consectetur hendrerit. Fusce non risus sit amet nisl dapibus posuere. Vestibulum gravida faucibus augue vitae placerat."
    }
];

function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds (loop through data)
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){ //creating campgrounds, 3 with seed data
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create( // create a comment for that one campground, gives us 3 different campgrounds with the one same post
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment._id); // associate comment with campground, push it into comments array
                                    campground.save(); // save campground
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
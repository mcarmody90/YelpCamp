var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var moment = require("moment");
var Filter = require("bad-words"),
    filter = new Filter();
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, page: "campgrounds"});
        }
    });
});

//NEW - display form to make new entry to DB
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//CREATE - add a new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
   // Get data from form and add to campgrounds array
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   moment.tz.setDefault("America/Matamoros");
   var dateMade = moment().format('MMMM Do YYYY, h:mm:ss a');
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, price: price, image: image, dateMade: dateMade, description: desc, author: author};
   // Create a new campground and save to DB *
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           req.flash("error", err.message);
           return res.redirect("back");
       } else {
           // Redirect back to campgrounds page
           res.redirect("/campgrounds");
       }
   });
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    // find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Campground not found.");
            res.redirect("back");
        } else {
            // console.log(foundCampground);
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground, moment: moment, filter: filter});
            //the above passes in our foundCampground under the name campground. Now inside of our show, campground will have the value of whatever we found with the ID.
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
   // redirect somewhere
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds");
       }
   });
});

module.exports = router;
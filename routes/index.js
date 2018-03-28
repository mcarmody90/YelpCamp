var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// root route
router.get("/", function(req, res){
    res.render("landing");
});

// show register form
router.get("/register", function(req, res){
    res.render("register", {page: "register"});
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User(
        {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            avatar: req.body.avatar
        });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp, " + user.username + "!");
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login", function(req, res){
    res.render("login", {page: "login"});
});

//handle login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have successfully logged out.");
    res.redirect("/campgrounds");
});

// user profile route
router.get("/users/:id", function(req, res){
   User.findById(req.params.id, function(err, foundUser){
       if(err){
           req.flash("error", "User not found.");
           return res.redirect("/");
       }
       Campground.find().where("author.id").equals(foundUser._id).exec(function(err, campgrounds){
            if(err){
                req.flash("error", "Something went wrong.");
                return res.redirect("/");
            }
            Comment.find().where("author.id").equals(foundUser._id).exec(function(err, comments){
                if(err){
                    req.flash("error", "Something went wrong.");
                    return res.redirect("/");
                }
                    res.render("users/show", {user: foundUser, campgrounds: campgrounds, comments: comments});
            });
       });
   });
});

// USER EDIT ROUTE
router.get("/users/:id/edit", middleware.checkProfileOwnership, function(req, res){
    User.findById(req.params.id, function(err, foundUser){
       if(err){
           req.flash("error", "User not found.");
           return res.redirect("/");
       } else {
           res.render("users/edit", {user: foundUser});
       }
    });
});

// USER UPDATE ROUTE
router.put("/users/:id", middleware.checkProfileOwnership, function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
       if(err){
           res.redirect("back");
       } else {
           res.redirect("/users/" + req.params.id);
       }
    });
});

// // COMMENT UPDATE ROUTE
// router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
//     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
//       if(err){
//           res.redirect("back");
//       } else {
//           res.redirect("/campgrounds/" + req.params.id);
//       }
//     });
// });

module.exports = router;
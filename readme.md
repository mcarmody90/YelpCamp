#YelpCamp

* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground Has:
    - Name
    - Image


#Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap


#Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form


#Style the Campgrounds Page
* Add a better header/title
    - Use Jumbotron
* Make campgrounds display in a grid
    - Responsive

#Style the Navbar and Form
* Add a navbar to all templates
* Style the new campground form

# Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

#Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

#Add the Comment Model
* Make our errors go away
* Display comments on campground show page

#Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

#Style Show Page
* Add sidebar to show page
* Display comments nicely

# Auth Part 2 - Add User Model
* Install all packages needed for auth
* Define User model

# Auth Part 2 - Register
* Configure Passport
* Add register routes
* Add register template

# Auth Part 3 - Login
* Add login routes
* Add login template

# Auth Part 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar
* Show/hide auth links correctly

# Auth Part 5 - Show/Hide Links
* Show/hide auth links in navbar correctly


# Refactor The Routes
* Use Express router to reorganize all routes

# Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

# Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username + id to newly created campground

# Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route
* Fix $set Problem

# Deleting Campgrounds
* Add Destroy Route
* Add Delete Button

# Authorization
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

# Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

Campground Edit Route:  <!-- /campgrounds/:id/edit -->
Comment Edit Route:     <!-- /campgrounds/:id/comments/:comment_id/edit -->

# Deleting Comments
* Add Destroy route
* Add Delete button

Campground Destroy Route:   <!-- /campgrounds/:id -->
Comment Destroy Route:      <!-- /campgrounds/:id/comments/:comment_id -->

# Authorization Part 2: Comments
* User can only edit their comments
* User can only delete their comments
* Hide/Show edit and delete buttons
* Refactor Middleware
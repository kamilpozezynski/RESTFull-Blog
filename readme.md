App listening on localhost:3000

database name is restfull_blog_app
# Restfull_Routes_Blog
The purpose of this blog is to learn how to use the 7 essencial RESTFull routes
NAME ->   VERB    -> PURPOSE            -> Mongoose Method
*Index  -> GET    -> List of all things -> Thing.find()
*New    -> GET    -> Show new thing form ->N/A
*Create -> POST   -> Create a new thing then redirect somewhere else -> Thing.create()
*Show   -> GET    -> Show info about one specific Thing -> Thing.findById();
*Edit   -> GET    -> Show the edit form to edit the thing -> Thing.findById();
*Update -> PUT    -> Update particular thing, then redirect somewhere -> Thing.findByIdAndUpdate();
*Delete -> DELETE -> Delete a particular thing, then redirect somewhere Thing.findByIdAndDelete();
/*
List of dependencies to install with NPM is:
    "body-parser": "^1.18.3",
    "express": "^4.16.4",
    "express-sanitizer": "^1.0.4",
    "method-override": "^3.0.0",
    "mongoose": "^5.4.4"
*

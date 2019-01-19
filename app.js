var express          = require("express"),
    app              = express(),
    bodyparser       = require("body-parser"),
    mongoose         = require("mongoose"),
    methodOverride   = require("method-override"),
    expressSanitizer = require("express-sanitizer");

//Setting Mongoose
//connection to db
//APP CONFIG
mongoose.connect("mongodb://localhost/restfull_blog_app",{ useNewUrlParser: true });
//creating a Schema
var blogSchema = new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type:Date, default:Date.now}
});

// MONGOSE/MODEL CONFIG
var Blog = mongoose.model("Blog",blogSchema);
/*SINGLE CREATION OF BLOG FOR TEST
Blog.create({
	title:"test blog",
	image:"https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperbrowse.com%2Fmedia%2Fimages%2F750795.jpg&f=1",
	body:"Fire is the rapid oxidation of a material in the exothermic chemical process of combustion, releasing heat, light, and various reaction products. Slower oxidative processes like rusting or digestion are not included by this definition."
});*/
//use sanitizer
app.use(expressSanitizer());
//tell the app to use method override
app.use(methodOverride("_method"))
//with this line we dont need to type ejs at the end of the files in our code.
app.set("view engine", "ejs");
//use other directories than the views one.
app.use(express.static("public"));
//use body parser
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
	res.redirect("/blogs");
})
//Index route
app.get("/blogs",function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log(err);
		}else{
			res.render("index",{blogs: blogs});
		}
	});
});
// New Route
app.get("/blogs/new",function(req, res){
	res.render("new");
});
// Create route
app.post("/blogs", function(req, res){
	//create blog
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog, function(err , newBlog){
		if(err){
			res.render("new");
		}else{
			res.redirect("/blogs");
		}
	});
});
//Show
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id,function(err, foundBlog){
		if(err){
			res.redirect("/index");
		}else{
			res.render("show",{blog: foundBlog});
		}
	})
});
//Edit
app.get("/blogs/:id/edit",function(req, res){
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findById(req.params.id, function(err, foundBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("edit", {blog: foundBlog});
		}
	});
});
//UPDATE

app.put("/blogs/:id",function(req, res){
	//Blog.findByIdAndUpdate(id, newData, callback)
	Blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err, updatedBlog){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs/" + req.params.id);
		}
	})
});
//Delete
app.delete("/blogs/:id/", function(req, res){
	//res.send("you have reached delete route");
	Blog.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs");
		}
	});
});
app.listen("3000",function(){
	console.log("server is listening on port 3000");
});
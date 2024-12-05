const express = require("express");
const path = require("path");
const { connectMongoDb } = require("./connect");
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const PORT = 8000;
const app = express();

// connection
connectMongoDb("mongodb://localhost:27017/wordRipple");

// middleware
app.use(express.urlencoded({ extended: false })); // for form data
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve("./public")))

// register Routes
const userRoute = require("./routes/user");
const addNewBlogRoute = require("./routes/blog");
const Blog = require("./models/blog");

// set view engine and its path
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// routes
app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({})
    res.render("home", {
        user: req.user,
        blogs: allBlogs
    })
})
app.use("/user", userRoute);
app.use("/blog", addNewBlogRoute);

app.listen(PORT, () => console.log('Server started'));

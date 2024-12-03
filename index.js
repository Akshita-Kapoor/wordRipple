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

// register Routes
const userRoute = require("./routes/user");

// set view engine and its path
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// routes
app.get("/", (req, res) => {
    res.render("home", {
        user: req.user
    })
})
app.use("/user", userRoute);

app.listen(PORT, () => console.log('Server started'));

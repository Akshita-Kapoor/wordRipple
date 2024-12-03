const User = require("../models/user");

async function showUserSignUpPage(req, res) {
  return res.render("signup");
}
async function showUserSignInPage(req, res) {
  return res.render("signin");
}
async function handleUserSignIn(req, res) {
    const {email, password} = req.body;

    const user = User.matchPassword(email, password);
    // if (!user) {
    //     return res.render("login", {
    //       error: "Incorrect email or password",
    //     });
    //   }
  return res.redirect("/");
}
async function handleUserSignUp(req, res) {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
}
module.exports = {
  showUserSignUpPage,
  showUserSignInPage,
  handleUserSignUp,
  handleUserSignIn,
};

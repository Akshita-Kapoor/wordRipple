const User = require("../models/user");

async function showUserSignUpPage(req, res) {
  return res.render("signup");
}
async function showUserSignInPage(req, res) {
  return res.render("signin");
}
async function handleUserSignIn(req, res) {
    const { email, password } = req.body;
 try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie('token', token).redirect('/');
 } catch (error) {
    return res.render('signin', {
        error: "Incorrect email or password"
    })
 }
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
async function handleLogOut(req, res) {
  return res.clearCookie('token').redirect('/');
}
module.exports = {
  showUserSignUpPage,
  showUserSignInPage,
  handleUserSignUp,
  handleUserSignIn,
  handleLogOut
};

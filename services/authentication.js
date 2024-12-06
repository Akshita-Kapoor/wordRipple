const JWT = require("jsonwebtoken");

const secretKey = "33ng!ne";

function createToken(user) {
  const payload = {
    _id: user.id,
    fullName: user.fullName,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(payload, secretKey);
  return token;
}
function validateToken(token) {
  const payload = JWT.verify(token, secretKey);
  return payload;
}

module.exports = { createToken, validateToken };

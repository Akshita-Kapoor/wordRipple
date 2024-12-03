const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    secret: {
      type: String,
      required: false,
    },
    profileImageURL: {
      type: String,
      required: false,
      default: "/images/avatar.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return;

  const secret = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", secret)
    .update(user.password)
    .digest("hex");

  this.secret = secret;
  this.password = hashedPassword;

  next();
});

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error('User not found!');

  const secret = user.secret;
  const hashedPassword = user.password;
  const userProvidedHash = createHmac("sha256", secret)
    .update(password)
    .digest("hex");

   if(hashedPassword != userProvidedHash) throw new Error('Incorrect password');
  return user;
});

const User = model("user", userSchema);

module.exports = User;

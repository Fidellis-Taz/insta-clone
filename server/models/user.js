const mongoose = require("mongoose");
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true /* turn the user value to lower case  */,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "minimal length should be 6"],
  },
});

mongoose.model("User", userSchema);

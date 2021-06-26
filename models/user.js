const mongoose = require("mongoose");
const { schema } = require("./secure/userValidation");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required "],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: 4,
    maxlength: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.statics.userValidation = function (body) {
  return schema.validate(body, { abortEarly: false });
};

const User = mongoose.model("user", userSchema);
module.exports = User;

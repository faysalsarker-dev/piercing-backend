const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  displayName: { type: String },
  role: { type: String,
    enum: ['admin', 'editor'],
    default: "editor" },
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);

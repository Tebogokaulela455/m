const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  videoUrl: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Course', CourseSchema);

const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A hotel must have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Hotel must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    rquired: [true, 'Hotel must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'Hotel must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Hotel must have a price'],
  },
  priceDiscount: {
    type: Number,
    summary: {
      type: String,
      trim: true,
    },
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A hotel must have a description'],
  },
  imageCover: {
    type: String,
    required: [true, 'Hotel must have a image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates:[Date]
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;

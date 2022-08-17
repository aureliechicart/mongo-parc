const mongoose = require('../database');

const Schema = mongoose.Schema;
const model = mongoose.model;

const rideSchema = new Schema({
  event: { type: String },
  visitor: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const Ride = model(
  'Ride', // model name
  rideSchema, // ride structure
  'rides' // name of the collection in mongodbb
);

module.exports = Ride;
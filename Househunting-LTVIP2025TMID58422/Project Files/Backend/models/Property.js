import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  rent: Number,
  bedrooms: Number,
  description: String,
  ownerEmail: String,
  available: { type: Boolean, default: true }
});

export default mongoose.model('Property', propertySchema);
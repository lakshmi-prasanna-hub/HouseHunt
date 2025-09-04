import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, enum: ['renter', 'owner', 'admin'], default: 'renter' }
});

export default mongoose.model('User', userSchema);
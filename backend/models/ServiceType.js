// server/models/ServiceType.js
import mongoose from 'mongoose';

const serviceTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
}, { timestamps: true });

export default mongoose.model('ServiceType', serviceTypeSchema);

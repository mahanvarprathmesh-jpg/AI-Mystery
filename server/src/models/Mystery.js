import mongoose from 'mongoose';

const suspectSchema = new mongoose.Schema({
  id: { type: String, required: true }, name: { type: String, required: true }, age: { type: Number, required: true },
  occupation: { type: String, required: true }, description: { type: String, required: true }, relationship: { type: String, required: true },
  motive: { type: String, required: true }, alibi: { type: String, required: true }, suspiciousDetails: { type: String, required: true },
}, { _id: false });

const evidenceSchema = new mongoose.Schema({
  id: { type: String, required: true }, type: { type: String, enum: ['message', 'image', 'cctv', 'witness', 'document'], required: true },
  title: { type: String, required: true }, description: { type: String, required: true }, content: { type: mongoose.Schema.Types.Mixed, default: {} },
  timestamp: { type: String, default: '' }, relatedSuspects: [{ type: String }],
}, { _id: false });

const mysterySchema = new mongoose.Schema({
  title: { type: String, required: true }, category: { type: String, required: true }, difficulty: { type: String, required: true },
  scenario: { type: String, required: true }, description: { type: String, required: true },
  incident: { type: { type: String, required: true }, date: { type: String, required: true }, location: { type: String, required: true } },
  suspects: { type: [suspectSchema], validate: (items) => items.length >= 3 && items.length <= 5 },
  evidence: { type: [evidenceSchema], validate: (items) => items.length >= 5 && items.length <= 10 },
  timeline: [{ time: String, event: String, relatedSuspects: [String] }],
  solution: {
    culpritId: { type: String, required: true, select: false }, motive: { type: String, required: true, select: false },
    explanation: { type: String, required: true, select: false }, evidenceReferences: { type: [String], required: true, select: false },
  },
  accessTokenHash: { type: String, required: true, select: false }, accusedSuspectId: { type: String, default: null },
  accusationReason: { type: String, default: '', select: false }, completedAt: { type: Date, default: null },
}, { timestamps: true, minimize: false });

export default mongoose.models.Mystery || mongoose.model('Mystery', mysterySchema);

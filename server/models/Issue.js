const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'], 
    default: 'Open' 
  },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High', 'Critical'], 
    default: 'Medium' 
  },
  severity: { 
    type: String, 
    enum: ['Minor', 'Major', 'Critical', 'Blocker'], 
    default: 'Minor' 
  },
  labels: [{ type: String }],
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  
  // AI Generated Content
  aiSummary: { type: String },
  aiSuggestion: { type: String },
  aiClassification: {
    category: String,
    confidence: Number
  },
  
  logs: { type: String }, // For deployment failure analysis
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

issueSchema.pre('save', function() {
  this.updatedAt = Date.now();
});

module.exports = mongoose.model('Issue', issueSchema);

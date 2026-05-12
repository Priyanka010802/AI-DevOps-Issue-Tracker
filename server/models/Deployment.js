const mongoose = require('mongoose');

const deploymentSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  environment: { 
    type: String, 
    enum: ['Production', 'Staging', 'Development'], 
    default: 'Development' 
  },
  status: { 
    type: String, 
    enum: ['Success', 'Failed', 'Pending', 'Running'], 
    default: 'Pending' 
  },
  logs: { type: String },
  deploymentTime: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Deployment', deploymentSchema);

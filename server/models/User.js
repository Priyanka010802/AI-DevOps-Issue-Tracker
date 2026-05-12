const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Admin', 'Developer', 'DevOps'], 
    default: 'Developer' 
  },
  avatar: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// Modern Mongoose async/await pre-save hook
userSchema.pre('save', async function() {
  try {
    if (!this.isModified('password')) return;
    
    console.log('🔐 Hashing password for:', this.email);
    this.password = await bcrypt.hash(this.password, 10);
    console.log('✅ Password hashed successfully');
  } catch (error) {
    console.error('❌ Password Hashing Error:', error);
    throw error; // Mongoose will catch this and pass it as an error
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('❌ Password Comparison Error:', error);
    return false;
  }
};

module.exports = mongoose.model('User', userSchema);

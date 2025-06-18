const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },

  createdHabits: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Habit' 
  }],
  completedHabits: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Habit' 
  }],
  deletedHabits: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Habit' 
  }]
});

// Password hash middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  frequency: { 
    type: String, 
    enum: ['daily', 'weekly'], 
    default: 'daily' 
  },
  category: { 
    type: String, 
    default: 'General' 
  },
  tags: { 
    type: [String], 
    default: [] 
  },
  completionHistory: [
    {
      date: { 
        type: Date, 
        required: true 
      },
      completed: { 
        type: Boolean, 
        default: true 
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);

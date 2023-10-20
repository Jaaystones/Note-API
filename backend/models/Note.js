import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  ticket: {
    type: Number,
    default: 1,
  },
}, {
  timestamps: true,
});

// Define a pre-save middleware to auto-increment the 'ticketNum' field
noteSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      // Find the highest 'ticketNum' value in existing documents
      const highestTicket = await this.constructor
        .findOne({}, 'ticket')
        .sort('-ticket')
        .exec();

      // Set the 'ticketNum' value to one greater than the highest found
      this.ticket = (highestTicket && highestTicket.ticket + 1) || 1;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.model('Note', noteSchema);
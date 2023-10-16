import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission',
  }],
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
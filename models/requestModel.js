import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  materialRequests: [
    {
      itemName: String,
      quantity: Number,
      assignedTo: String,
      status: {
        type: String,
        default: 'pending',
      },
    },
  ],

  maintenanceRequests: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      description: String,
      status: {
        type: String,
        default: 'pending',
      },
    },
  ],

  calendarEvents: [
    {
      title: String,
      description: String,
      dateTime: Date,
    },
  ],

  rentTracking: {
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    dueDate: Date,
    isPaid: {
      type: Boolean,
      default: false,
    },
  },

  documents: [
    {
      name: String,
      description: String,
      status: {
        type: String,
        default: 'pending',
      },
      owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  ],

  documentApprovals: [
    {
      document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document' },
      approver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: {
        type: String,
        default: 'pending',
      },
    },
  ],

  documentStatuses: [
    {
      orderDate: Date,
      items: [
        {
          product: String,
          quantity: Number,
        },
      ],
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: {
        type: String,
        default: 'pending',
      },
    },
  ],

  purchaseOrders: [
    {
      purchaseOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder' },
      approver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: {
        type: String,
        default: 'pending',
      },
    },
  ],

  maintenanceCosts: [
    {
      maintenanceType: String,
      cost: Number,
      date: Date,
      property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
    },
  ],

  kPIs: [
    {
      name: String,
      description: String,
      target: Number,
      currentValue: Number,
      owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  ],
});

export default mongoose.model('Request', requestSchema);

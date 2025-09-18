const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const transactionSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  customerName: { type: String, required: true },
  amount: { type: Number, required: true, min: 0.01 },
  currency: { type: String, default: 'ZAR' },
  swift: { type: String, required: true },
  beneficiaryAccount: { type: String, required: true },
  status: { type: String, enum: ['Pending','Approved','Submitted','Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
transactionSchema.pre('save', function(next){ this.updatedAt = Date.now(); next(); });
const Transaction = mongoose.model('Transaction', transactionSchema);
module.exports = Transaction;

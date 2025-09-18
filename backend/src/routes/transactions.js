const express = require('express');
const { body, validationResult } = require('express-validator');
const requireRole = require('../middleware/authMiddleware');
const Transaction = require('../models/Transaction');
const { User } = require('../models/User');
const router = express.Router();

// Create transaction (customer) - customerName inserted from user record
router.post('/', [
  body('amount').isFloat({ gt: 0 }),
  body('swift').isString().isLength({ min: 6, max: 11 }),
  body('beneficiaryAccount').isString().isLength({ min: 6, max: 34 })
], requireRole('customer'), async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try{
    const user = await User.findById(req.user.sub);
    const tx = new Transaction({
      customerId: user._id,
      customerName: user.fullName,
      amount: req.body.amount,
      currency: 'ZAR',
      swift: req.body.swift,
      beneficiaryAccount: req.body.beneficiaryAccount
    });
    await tx.save();
    res.status(201).json({ message: 'Transaction created', transaction: tx });
  }catch(e){ console.error(e); res.status(500).json({ error: 'Server error' }); }
});

// Customer: list own transactions
router.get('/mine', requireRole('customer'), async (req,res) => {
  const txs = await Transaction.find({ customerId: req.user.sub }).sort({ createdAt:-1 });
  res.json({ transactions: txs });
});

// Notifications for customer (status != Pending)
router.get('/notifications', requireRole('customer'), async (req,res) => {
  const txs = await Transaction.find({ customerId: req.user.sub, status: { $ne: 'Pending' } }).sort({ updatedAt:-1 }).limit(20);
  res.json({ notifications: txs });
});

// Employee: pending transactions (with customerName)
router.get('/pending', requireRole('employee'), async (req,res) => {
  const txs = await Transaction.find({ status: 'Pending' }).populate('customerId','fullName email').sort({ createdAt:-1 }).limit(200);
  res.json({ transactions: txs });
});

// Approve / Reject / Submit (employee)
router.put('/:id/approve', requireRole('employee'), async (req,res) => {
  const tx = await Transaction.findById(req.params.id);
  if(!tx) return res.status(404).json({ error: 'Not found' });
  tx.status = 'Approved'; await tx.save();
  res.json({ message: 'Approved', transaction: tx });
});

router.put('/:id/reject', requireRole('employee'), async (req,res) => {
  const tx = await Transaction.findById(req.params.id);
  if(!tx) return res.status(404).json({ error: 'Not found' });
  tx.status = 'Rejected'; await tx.save();
  res.json({ message: 'Rejected', transaction: tx });
});

router.put('/:id/submit', requireRole('employee'), async (req,res) => {
  const tx = await Transaction.findById(req.params.id);
  if(!tx) return res.status(404).json({ error: 'Not found' });
  tx.status = 'Submitted'; await tx.save();
  res.json({ message: 'Submitted', transaction: tx });
});

module.exports = router;

import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  budgetId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Transaction', TransactionSchema)
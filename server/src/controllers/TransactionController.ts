import { Request, Response } from "express";
import Transaction from '../model/Transaction'
import Budget from '../model/Budget'
import jwt from 'jsonwebtoken'


class TransactionController {
  async index(req: Request, res: Response) {
    try {
      const transaction = await Transaction.find()

      return res.json(transaction)
    } catch (err) {
      return res.status(400).json({ message: 'Could not find transactions', err })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { title, value, token, budgetId } = req.body

      const { id }: any = jwt.decode(token)

      if (value > 0) {
        const budget: any = await Budget.findById(budgetId)

        const newValue = Number(budget.value) + Number(value)

        const hilorena = await Budget.findByIdAndUpdate(budgetId, { value: newValue })
      }

      const newTransaction = await Transaction.create({ title, value, userId: id, budgetId })

      return res.json(newTransaction)
    } catch (err) {
      return res.status(400).json({ message: 'Could not create transaction', err })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { token } = req.params

      const { id }: any = jwt.decode(token)
      const transactions = await Transaction.find({ 'userId': id })

      return res.json(transactions)
    } catch (err) {
      return res.status(400).json({ message: 'Could not find user Transaction', err })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params

      const transactions = await Transaction.findByIdAndDelete(id)

      return res.json(transactions)
    } catch (err) {
      return res.status(400).json({ message: 'Could not find user Transaction', err })
    }
  }
}

export default TransactionController
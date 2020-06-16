import { Request, Response } from "express";
import Budget from '../model/Budget'
import jwt from 'jsonwebtoken'

class BudgetController {
  async index(req: Request, res: Response) {
    try {
      const budgets = await Budget.find()

      return res.json(budgets)
    } catch (err) {
      return res.status(400).json({ message: 'Could not find budgets', err })
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, value, token } = req.body
      const { id }: any = jwt.decode(token)

      const newBudget = await Budget.create({ name, value, userId: id })

      return res.json(newBudget)
    } catch (err) {
      return res.status(400).json({ message: 'Could not create budget', err })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { token } = req.params

      const { id }: any = jwt.decode(token)
      const budgets = await Budget.find({ 'userId': id })

      return res.json(budgets)
    } catch (err) {
      return res.status(400).json({ message: 'Could not find user budgets', err })
    }
  }
}

export default BudgetController
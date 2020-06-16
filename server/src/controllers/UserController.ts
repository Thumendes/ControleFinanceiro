import { Request, Response } from "express";
import { Document } from 'mongoose'
import User from '../model/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import authConfig from '../config'

interface BudgetProps extends Document {
  name: string;
  value: number;
  userId: string;
  createdAt: Date;
}

interface UserProps extends Document {
  email: string,
  password: string
}

const generateToken = (id: object) => {
  return jwt.sign(id, authConfig.secret, {
    expiresIn: 604800
  })
}

class UserController {
  async index(req: Request, res: Response) {
    try {
      const users = await User.find()


      return res.json(users)
    } catch (err) {
      return res.status(400).json({ message: 'Could not find users', err })
    }
  }

  async create(req: Request, res: Response) {
    const { name, email, cep, password, uf, city, road, numeral } = req.body

    try {
      const newUser = {
        name,
        email,
        password,
        address: {
          cep,
          uf,
          city,
          road,
          numeral
        }
      }

      const exist = await User.findOne({ 'email': email })

      if (exist !== null) {
        return res.json({ success: false, message: 'Email alredy Exists!' })
      }

      const user = await User.create(newUser)

      return res.json({ success: true, token: generateToken({ id: user._id }) })
    } catch (err) {
      return res.status(400).json({ message: 'Could not create user', err })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params
      const user = await User.findById(id)

      return res.json({ user })
    } catch (err) {
      return res.status(400).send('erro')
    }
  }

  async auth(req: Request, res: Response) {
    const { email, password } = req.body
    try {
      const user: any = await User.findOne({ 'email': email })

      if (!user) {
        return res.json({ success: false, message: "User doesnt exist" })
      }

      if (!await bcrypt.compare(password, user.password)) {
        return res.json({ success: false, message: "Wrong password" })
      }

      if (!user.active) {
        return res.json({ success: false, message: "User blocked!" })
      }

      return res.json({ success: true, token: generateToken({ id: user._id }) })
    } catch (err) {
      return res.status(400).json({ message: 'Could not find user', err })
    }
  }
}

export default UserController
import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser extends Document {
  password: string
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    cep: {
      type: String,
      required: true
    },
    uf: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    road: {
      type: String,
      required: true
    },
    numeral: {
      type: String,
      required: true
    }
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre<IUser>('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

  next()
})

export default mongoose.model('User', UserSchema)
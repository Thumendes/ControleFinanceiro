import express from 'express'
import morgan from 'morgan'
import routes from './routes'
import mongoose from 'mongoose'
import cors from 'cors'

mongoose.connect('mongodb://localhost:27017/financas', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
})

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(routes)

app.listen(3001, () => console.log('http://localhost:3001'))
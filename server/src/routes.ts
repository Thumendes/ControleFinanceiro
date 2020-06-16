import express from 'express'

import BudgetController from './controllers/BudgetController'
import UserController from './controllers/UserController'
import TransactionController from './controllers/TransactionController'

const routes = express.Router()

const budgetController = new BudgetController()
const userController = new UserController()
const transactionController = new TransactionController()

// Rotas para Usuários
routes.get('/user', userController.index)
routes.post('/user', userController.create)
routes.post('/auth', userController.auth)
routes.get('/user/:id', userController.show)

// Rotas para Carteiras
routes.get('/budget', budgetController.index)
routes.post('/budget', budgetController.create)
routes.get('/budget/:token', budgetController.show)


// Rotas para Transações
routes.get('/transaction', transactionController.index)
routes.post('/transaction', transactionController.create)
routes.get('/transaction/:token', transactionController.show)
routes.delete('/transaction/:id', transactionController.delete)

export default routes
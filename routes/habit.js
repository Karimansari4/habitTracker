const express = require('express')
const { home } = require('../controllers/Home_controller')
const { createHabit, favoriteHabit, deleteHabit, statusUpdate } = require('../controllers/Habite_controller')
// const habitRouter = require('../controllers/')
const habitRouter = express.Router()

habitRouter.get('/', home)

habitRouter.post('/create', createHabit)

habitRouter.get('/favorite-habit', favoriteHabit)

habitRouter.get('/remove', deleteHabit)

habitRouter.get('/status-update', statusUpdate)

module.exports = habitRouter
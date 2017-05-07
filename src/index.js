import {} from 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import api from './api'
import models from './helpers/models/index'
import authEndpoints from './auth/endpoints'
import authMiddleware from './auth/middleware'
import cookieParser from 'cookie-parser'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    res.send('OK')
  } else {
    next();
  }
});


// DATABASE
const knex = require('knex')({
  client: 'pg',
  version: '9.5',
  connection: process.env.DATABASEURL,
  pool: {
    min: 2,
    max: 10
  },
})
const bookshelf = models(knex)
app.use((req, res, next) => {
  req.db = bookshelf
  next()
})

// Authorization endpoints
app.use('/auth', authEndpoints)
// Authorization middleware
app.use(authMiddleware)

app.use('/', api)

app.listen( process.env.PORT || 5000, function () {
  console.log('Running!')
})

import {} from 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import api from './api'
import models from './helpers/models/index'

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

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


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/', api)

app.listen( process.env.PORT || 3000, function () {
  console.log('Running!')
})

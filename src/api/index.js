
import { Router } from 'express'
import facebook from './facebook'
import auth from './auth'
import medium from './medium'

let api = Router()

api.use('/auth', auth)

api.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' })
})

api.use('/facebook', facebook)

api.use('/medium', medium)

export default api

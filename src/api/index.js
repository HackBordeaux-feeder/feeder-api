
import { Router } from 'express'
import facebook from './facebook'
import medium from './medium'

let api = Router()

api.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!', user: req.auth.user })
})

api.use('/facebook', facebook)

api.use('/medium', medium)

export default api

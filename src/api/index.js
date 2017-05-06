import { Router } from 'express'
import facebook from './facebook'

let api = Router()

api.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' })
})

api.use('/facebook', facebook)

export default api

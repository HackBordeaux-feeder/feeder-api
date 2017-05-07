
import { Router } from 'express'
import facebook from './facebook'
import medium from './medium'
import twitter from './twitter'
import subscribe from './subscribe'
import user from './user'

let api = Router()

api.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!', user: req.auth.user })
})

api.use('/facebook', facebook)

api.use('/medium', medium)

api.use('/twitter', twitter)

api.use('/subscribe', subscribe)

api.use('/user', user)

export default api

import { Router } from 'express'

let subscribeRouter = Router()

subscribeRouter.get('/', (req, res) => {
  res.send(req.auth.user)
})

export default subscribeRouter

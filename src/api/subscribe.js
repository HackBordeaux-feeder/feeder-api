import { Router } from 'express'

let subscribeRouter = Router()

subscribeRouter.post('/', (req, res) => {
  const body = req.body
  
  new req.db.Option(body).save().then(() => {
    res.send('OK')
  })
  .catch((err) => {
    res.status(500).send(err)
  })
})

export default subscribeRouter

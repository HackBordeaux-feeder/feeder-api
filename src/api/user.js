import { Router } from 'express'

let subscribeRouter = Router()

subscribeRouter.post('/:token', (req, res) => {
  const token = req.params.token
  const body = req.body
  
  new req.db.Token({ token }).fecth({ withRelated: ['user', 'user.options'] }).then(() => {
    res.send('OK')
  })
  .catch((err) => {
    res.status(500).send(err)
  })
})

export default subscribeRouter

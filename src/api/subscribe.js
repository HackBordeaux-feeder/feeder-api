import { Router } from 'express'

let subscribeRouter = Router()

subscribeRouter.post('/', (req, res) => {
  const body = req.body
  const user = req.auth.user.id
  
  new req.db.Option(
  Object.assign({}, body, { user_id: user })
  )
  .save()
  .then((data) => {
    if (data) {
      res.send({ id: data.toJSON().id })
    } else {
      res.status(500).send('NO DATA')
    }
  }, (err) => {
    res.status(500).send(err)
  })
})

export default subscribeRouter

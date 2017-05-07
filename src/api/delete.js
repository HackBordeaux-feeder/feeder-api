import { Router } from 'express'

let deleteRouter = Router()

deleteRouter.post('/', (req, res) => {
  const id = req.body.id
  const user = req.auth.user.id
  console.log(id);
  new req.db.Option(
    {id:id}
  )
  .destroy()
  .then((data) => {
    res.send('OK')
  })
  .catch((err) => {
    res.status(500).send(err)
  })
})

export default deleteRouter

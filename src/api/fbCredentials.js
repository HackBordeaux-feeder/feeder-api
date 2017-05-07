import { Router } from 'express'

let fbCredentials = Router()

fbCredentials.put('/', (req, res) => {
  const body = req.body
  const user = req.auth.user.id
  
  new req.db.User(
  Object.assign({}, body, { id: user, fb_username: body.fb_username, fb_password: body.fb_password })
  )
  .save()
  .then((data) => {
    res.send('OK')
  })
  .catch((err) => {
    res.status(500).send(err)
  })
})

export default fbCredentials

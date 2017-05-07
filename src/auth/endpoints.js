
import { Router } from 'express'
import sha256 from 'sha256'

let authRoutes = Router()

authRoutes.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  const token = sha256(`${Math.random()}`)
  
  new req.db.User({ user_name: username }).fetch()
  .then((user) => {
    const userid = user && user.id || {}
    return Promise.all([user, new req.db.Token({
      token,
      user_id: userid,
    })
    .save(null, {method: 'insert'})])
  })
  .then(([user, data]) => {
    res.send({ token, user })
  })
  .catch((error) => {
    console.error('AUTH ERROR', error)
    res.status(400).send('ERROR')
  })
})

export default authRoutes

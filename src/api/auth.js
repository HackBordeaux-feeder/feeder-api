
import { Router } from 'express'

let authRoutes = Router()

authRoutes.post('/login', (req, res) => {
  const user = req.body.username
  const password = req.body.password

  
})

export default authRoutes

import { Router } from 'express'
import getTweets from '../helpers/twitter/getTweets'

let twitterRoutes = Router()

twitterRoutes.get('/', (req, res) => {
  const options = req.auth.user.options.filter((item) => (item.service === 'twitter')).map((option) => option.option)
  getTweets(options).then((tweets)=>{
    res.send(tweets)
  })
})

export default twitterRoutes

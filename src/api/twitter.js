import { Router } from 'express'
import getTweets from '../helpers/twitter/getTweets'

let twitterRoutes = Router()

twitterRoutes.get('/', (req, res) => {
  const options = req.auth.user.options.filter((item) => (item.service === 'Twitter'))
  .map((option) => (option.option))

  getTweets(options)
  .then((tweets)=>{
    console.log('resolve this tweets', tweets)
    console.log(tweets)
    res.send(tweets)
  }, (err) => {
    console.log('ERROR', err)
    res.status(500).send('FREAKING ERROR')
  })
})

export default twitterRoutes

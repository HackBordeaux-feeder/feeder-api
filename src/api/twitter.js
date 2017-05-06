import { Router } from 'express'
import getTweets from '../helpers/twitter/getTweets'

let twitterRoutes = Router()

twitterRoutes.get('/', (req, res) => {
  getTweets(['dan_abramov', 'nodejs']).then((tweets)=>{
    res.send(tweets)
  })
})

export default twitterRoutes

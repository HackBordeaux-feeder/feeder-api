import { Router } from 'express'
import Promise from 'bluebird'
import getMatches from '../helpers/regex/get-matches.js'
import xml2json from '../helpers/medium/xml2json.js'
import getXML from '../helpers/medium/getXML.js'

let mediumRoutes = Router()

mediumRoutes.get('/', (req, res) => {
  const url = 'https://medium.com/feed/the-mission'
  getXML(url)
    .then((xml) => {
      xml2json(xml)
        .then((articles) => {
          articles.forEach((article) => {
            const title = article.title
            const link = article.link
            const pubDate = article.pubDate
            const author = article['dc:creator']
            const content = article['content:encoded']
            const getImageRegex = /(<img alt="" src="[\:\w\d\.\/\-\*]*" \/>)/g
            var image = getMatches(content, getImageRegex, 1)[0]
            res.send(JSON.stringify({
              title,
              link,
              pubDate,
              author,
              image
            }))
          })
        })
        .catch((err)=>console.log("Can't set headers after they are sent ERROR 1"))
    })
    .catch((err)=>console.log(err))
})

export default mediumRoutes

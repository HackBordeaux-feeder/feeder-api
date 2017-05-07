import { Router } from 'express'
import Promise from 'bluebird'
import getMatches from '../helpers/regex/get-matches.js'
import xml2json from '../helpers/medium/xml2json.js'
import getXML from '../helpers/medium/getXML.js'

let mediumRoutes = Router()

mediumRoutes.get('/', (req, res) => {
  const options = req.auth.user.options.filter((item) => (item.service === 'Medium')).map((option) => option.option)
  let articlesToSend = []

  Promise.map(options, (option) => {
    return new Promise((resolve)=> {
      const url = 'https://medium.com/feed/'+option
      getXML(url)
        .then((xml) => {
          xml2json(xml)
            .then((articles) => {
              console.log(articles.length);
              Promise.map(articles, (article)=> {
                return new Promise((resolve) => {
                  const title = article.title
                  const link = article.link
                  const pubDate = article.pubDate
                  const author = article['dc:creator']
                  const content = article['content:encoded']
                  const getImageRegex = /(<img alt="" src="[\:\w\d\.\/\-\*]*" \/>)/g
                  var image = getMatches(content, getImageRegex, 1)[0]
                  // console.log(title);
                  articlesToSend.push({
                    title,
                    link,
                    pubDate,
                    author,
                    image
                  })
                  resolve(true)
                }).then(()=>{
                  // console.log('We have the following articles: ');
                  // console.log(articlesToSend);
                })
              }).then(()=>{
                // console.log('Pushed articles for a user');
                // console.log(articlesToSend);
                resolve(true)
              })
            })
            .catch((err)=>console.log("Can't set headers after they are sent ERROR 1"))
        })
        .catch((err)=>console.log(err))
    })
  }).then(()=> res.send(JSON.stringify(articlesToSend)))
})

export default mediumRoutes

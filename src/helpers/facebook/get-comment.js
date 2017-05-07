const Nightmare = require("nightmare");
import getMatches from '../get-matches'
const fs = require('fs');

const commentFacebook = (user, target, index, url) => {
  const nightmare = Nightmare({show: false,
    webPreferences: {
      partition: `persist:${user}`
    }
  })
   return new Promise((resolve, reject) => {
    nightmare
    .goto(target)
    .html(`${url}/${user}/${index}.html`, 'HTMLOnly')
    .end()
      .then(function () {
        console.log("be brave");
        // resolve(true)
      })
      .catch(function (error) {
        console.error('Error:', error);
        reject(true)
      })
    .then(() => {
      console.log("time to regex");
      fs.readFile(`${url}/${user}/${index}.html`, "utf-8", (err, data) => {
        if(err) throw err;
        let regex = /<div class="fbUserContent[\s\S]*?>(<div class[\s\S]*?data-utime=[\s\S]*?)<div><form/g
        // console.log(data);
        let regex_profile = /class="profileLink" href="(.*?)"/
        let regex_text = /userContent[\s\S]*?<p>(.*?)<\/p>/
        let regex_name = /https:\/\/scontent[\s\S]*?alt="" aria-label="(.*?)"/
        let regex_image = /(https:\/\/scontent-.*?)"/
        let regex_date = /data-utime="(.*?)"/
        let text = []
        let time = []
        let name = []
        let image = []

        const articles = data.match(regex)

        articles.map((art) => {
          let b = art.match(regex_text)
          text.push(b[1])
        })

        articles.map((a) => {
          let b = a.match(regex_date)
          time.push(b[1])
        })

        articles.map((a) => {
          let b = a.match(regex_name)
          name.push(b[1])
        })

        articles.map((a) => {
          let b = a.match(regex_image)
          let c = b[1].split('amp;').join('')
          image.push(c)
        })
        let response = []
        articles.map((a,i) => {
          response[i]={name: name[i], image: image[i], text: text[i], time: time[i]}
        })
        // let text_final = text.map((tex) => {
        //   return tex.split('amp;').join('')
        // })
        // const name = articles[0].match(regex_name)
        // let image = articles[0].match(regex_image)
        // let image_final = image[1].split('amp;').join('')
        // let response = [{name: name[1], image:image_final, text:text, time:time }]
        // console.log(response);
        // getMatces(data, regex, articles.length )
        // console.log(articles);
        // console.log(response)
        resolve(response)
        // console.log('longitud:',articles.length);
      })
    })
  })
}
export default commentFacebook

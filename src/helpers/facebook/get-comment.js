const Nightmare = require("nightmare");
import getMatches from '../get-matches'
const fs = require('fs');

const commentFacebook = (user, target, index, url) => {
  const nightmare = Nightmare({show: true,
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
        resolve(true)
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
        const articles = data.match(regex)
        // getMatces(data, regex, articles.length )
        console.log(articles);
        console.log('longitud:',articles.length);
      })
    })
  })
}

export default commentFacebook

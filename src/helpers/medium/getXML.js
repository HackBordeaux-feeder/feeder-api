import Promise from 'bluebird'
import https from 'https'

const getXML = function(url){
  return new Promise(function(resolve){
    https.get(url, (response) => {
      var data = []
      response.on('data', (d) => {
        data.push(d)
      }).on('end', function() {
          const feed = Buffer.concat(data).toString()
          resolve(feed)
        })
      .on('error', (e) => {
        console.error("There's been an error getting the rss feed for ", url);
        console.error(e)
      })
    })
  })
}

export default getXML;

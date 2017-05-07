import Promise from 'bluebird'
const parseString = require('xml2js').parseString;

const xml2json = function(feed) {
  return new Promise(function(resolve){
    parseString(feed, function (err, result) {
      // console.log(result.rss.channel[0].item);
      resolve(result.rss.channel[0].item)
    })
  })
}

export default xml2json

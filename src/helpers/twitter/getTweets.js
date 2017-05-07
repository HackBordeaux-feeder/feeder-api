import Twitter from 'twitter'
import Promise from 'bluebird'

const getTweets = function(subscriptions) {
  return new Promise(function(resolve){
    const client = new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_TOKEN_KEY,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });
    var tweetsList = []
    const tweetCount = 10
    subscriptions.forEach((subscription) => {
      client.get('search/tweets', {q: 'from:'+subscription, count: tweetCount}, function(error, tweets, response) {
        if (error) {
          console.log(error);
        } else {
          tweets.statuses.forEach((status)=> {
            // console.log(status);
            const text = status.text
            const createdAt = status.created_at
            const retweets = status.retweet_count
            const favourites = status.favorite_count
            const profileImage = status.user.profile_image_url
            const verified = status.user.verified
            const username = status.user.screen_name
            const name = status.user.name
            tweetsList.push({createdAt, name, username, verified, text, retweets, favourites, profileImage})
            if (tweetsList.length === subscriptions.length*tweetCount) {
              resolve(tweetsList)
            }
          })
          // console.log(response);
        }
      });
    })
  })
}

export default getTweets

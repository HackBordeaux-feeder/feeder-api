
export default function auth (req, res, next) {
  const token = req.cookies.token

  function sendError () {
    req.auth = { isLoggedIn: false }
    res.send('NOT LOGGED IN')
  }

  if (token) {
    new req.db.Token({ token }).fetch({ withRelated: ['user'] })
    .then((data) => {
      const user = data.relations.user.attributes

      if (data) {
        req.auth = {
          token,
          user,
          isLoggedIn: false,
        }
        next()
      } else {
        sendError()
      }
    })
    
  } else {
    sendError()
  }
}

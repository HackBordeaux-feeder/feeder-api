
export default function auth (req, res, next) {
  const token = req.cookies.token

  function sendError () {
    req.auth = { isLoggedIn: false }
    res.send('NOT LOGGED IN')
  }

  if (token) {
    new req.db.Token({ token }).fetch({ withRelated: ['user', 'user.options'] })
    .then((data) => {
      const user = data.toJSON().user

      delete user.password

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

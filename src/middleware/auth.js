
export default function auth (req, res, next) {
  const token = req.cookies.token
  
  console.log('cookies', req.cookies)
  console.log('token', token)

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
      } else {
        req.auth = { isLoggedIn: false }
      }
      next()
    })
    
  } else {
    req.auth = { isLoggedIn: false }
    next()
  }
}

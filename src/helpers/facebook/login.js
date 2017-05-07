const Nightmare = require("nightmare");

const email = process.env.EMAIL
const password = process.env.PASSWORD

const loginFacebook = (user) => {
  return new Promise((resolve) => {
   console.log("crash");
   const nightmare = Nightmare({show: true,
     webPreferences: {
       partition: `persist:${user}`
     }
   })
   nightmare
   .goto('https://www.facebook.com/')
   .type('#email', email)
   .type('#pass', password + '\u000d')
   .wait(2000)
   .end()
     .then(function (result) {
       resolve(true)
     })
     .catch(function (error) {
        resolve(error)
       console.error('Error:', error);
     })
 })
}

export default loginFacebook

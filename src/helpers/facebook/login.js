const Nightmare = require("nightmare");
const nightmare = Nightmare({show: true})

const email = process.env.EMAIL
const password = process.env.PASSWORD
nightmare
.goto('https://www.facebook.com/')
.type('#email', email)
.type('#pass', password)

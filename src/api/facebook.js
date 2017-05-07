import { Router } from 'express'
import Promise from 'bluebird'
import fs from 'fs'

import loginFacebook from '../helpers/facebook/login'
import getComments from '../helpers/facebook/get-comment'
import deleteFolderRecursive from '../helpers/delete-folders-recursive'

let facebookRoutes = Router()

let user = 3
let targets = ['https://www.facebook.com/groups/hackathonhackers/?fref=ts', 'https://www.facebook.com/danicarmona?fref=ts']

facebookRoutes.get('/', (req, res) => {

  loginFacebook(user)
  .then(() => {
    console.log("creatin folder");
    fs.mkdirSync(__dirname+'/'+user)
  })
  .then(() => {
    console.log("getting content");
    return new Promise((resolve, reject) => {
      Promise.map(targets, (target, index) => {
        console.log("map");
        return getComments(user, target, index, __dirname)
      },{concurrency: 3})
      .then(() => {
        console.log("resolve");
        resolve(true)
      }).catch(() => {
        console.log("reject");
        reject(true)
      })
    })
  })
  .then((data) => {
    console.log(data);
    console.log("envant");
    deleteFolderRecursive(__dirname + `/${user}`)
    res.sendStatus(200)
  })
  .catch((err) => {
    console.log(err);
    deleteFolderRecursive(__dirname + `/${user}`)
    res.sendStatus(400)
  })
})

export default facebookRoutes

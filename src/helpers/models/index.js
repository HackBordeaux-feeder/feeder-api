
import bookshelf from 'bookshelf'

export default function models (knex) {
  const bkshlf = bookshelf(knex)
  
  const User = require('./users')

  return {
    User,
    bookshelf: bkshlf,
  }
}



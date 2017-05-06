
import bookshelf from 'bookshelf'

export default function models (knex) {
  const bkshlf = bookshelf(knex)
  
  const User = bkshlf.Model.extend({
    tableName: 'users',
    tokens () {
      return this.hasMany(Token)
    }
  })
  
  const Token = bkshlf.Model.extend({
    tableName: 'tokens',
    user () {
      return this.belongsTo(User)
    }
  })

  return {
    User,
    Token,
    bookshelf: bkshlf,
  }
}



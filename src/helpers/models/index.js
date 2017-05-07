
import bookshelf from 'bookshelf'

export default function models (knex) {
  const bkshlf = bookshelf(knex)
  
  const User = bkshlf.Model.extend({
    idAttribute: 'id',
    tableName: 'users',
    tokens () {
      return this.hasMany(Token)
    },
    options () {
      return this.hasMany(Option)
    },
  })

  const Token = bkshlf.Model.extend({
    idAttribute: 'token',
    tableName: 'tokens',
    user () {
      return this.belongsTo(User)
    }
  })

  const Option = bkshlf.Model.extend({
    idAttribute: 'id',
    tableName: 'options',
    user () {
      return this.belongsTo(User)
    }
  })

  return {
    User,
    Token,
    Option,
    bookshelf: bkshlf,
  }
}



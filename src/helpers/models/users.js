
export default function createUserModel (bookshelf) {
  return bkshlf.Model.extend({
    tableName: 'users'
  })
}
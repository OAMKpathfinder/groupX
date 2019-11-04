var db = require('../database');
var book = {
  get: function(callback) {
    return db.query('select * from book order by book_id desc', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from book where book_id=$1', [id], callback);
  },
  add: function(book, callback) {
    return db.query(
      'insert into book values($1,$2,$3,$4)',
      [book.book_id, book.name, book.author, book.isbn],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from book where book_id=$1', [id], callback);
  },
  update: function(id, book, callback) {
    return db.query(
      'update book set name=$1,author=$2, isbn=$3 where book_id=$4',
      [book.name, book.author, book.isbn, id],
      callback
    );
  },
  searchByName:function(value,callback) {
    var nameLike="%"+value+"%";
    return db.query('select * from book where name LIKE $1 order by book_id desc',[nameLike], callback);
  },
  searchByAuthor:function(value,callback) {
    var authorLike="%"+value+"%";
    return db.query('select * from book where author LIKE $1 order by book_id desc',[authorLike], callback);
  }
};
module.exports = book;
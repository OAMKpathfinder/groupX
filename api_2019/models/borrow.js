var db = require('../database');
var borrow = {
  get: function(callback) {
    return db.query("SELECT borrow.book_id, firstname, lastname, name, TO_CHAR(return_date, 'DD.MM.YYYY')  as ret_date FROM book INNER JOIN borrow ON book.book_id=borrow.book_id INNER JOIN borrower ON borrow.borrower_id=borrower.borrower_id", callback);
  },
  getById: function(id, callback) {
    return db.query('SELECT borrow.book_id, firstname, lastname, name, return_date as ret_date FROM book INNER JOIN borrow ON book.book_id=borrow.book_id INNER JOIN borrower ON borrow.borrower_id=borrower.borrower_id where borrow.book_id=$1', [id], callback);
  },
  add: function(borrow, callback) {
    return db.query(
      'insert into borrow values($1,$2,$3,$4)',
      [borrow.book_id, borrow.borrower_id, borrow.borrow_date, borrow.return_date],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from borrow where book_id=$1', [id], callback);
  },
  update: function(id, borrow, callback) {
    return db.query(
      'update borrow set return_date=$1 where book_id=$2',
      [borrow.ret_date, id],
      callback
    );
  }
};
module.exports = borrow;
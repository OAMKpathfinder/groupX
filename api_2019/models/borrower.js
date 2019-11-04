var db = require('../database');
var borrower = {
  get: function(callback) {
    return db.query('select * from borrower order by borrower_id desc', callback);
  },
  getById: function(id, callback) {
    return db.query('select * from borrower where borrower_id=$1', [id], callback);
  },
  add: function(borrower, callback) {
    return db.query(
      'insert into borrower values($1,$2,$3,$4,$5,$6)',
      [borrower.borrower_id, borrower.firstname, borrower.lastname, borrower.phone, borrower.streetaddress,borrower.postalcode],
      callback
    );
  },
  delete: function(id, callback) {
    return db.query('delete from borrower where borrower_id=$1', [id], callback);
  },
  update: function(id, borrower, callback) {
    return db.query(
      'update borrower set firstname=$1,lastname=$2, phone=$3, streetaddress=$4, postalcode=$5 where borrower_id=$6',
      [borrower.firstname, borrower.lastname, borrower.phone, borrower.streetaddress,borrower.postalcode, id],
      callback
    );
  }
};
module.exports = borrower;
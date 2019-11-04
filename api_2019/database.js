const Pool = require('pg').Pool

const connection = new Pool({
  user: 'netuser',
  host: 'localhost',
  database: 'library',
  password: 'libPass',
  port: 5432,
})
module.exports = connection;
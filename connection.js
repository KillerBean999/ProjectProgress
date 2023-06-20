const mysql2 = require('mysql2')

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '5534348Erik!',
    database: 'flightsdb'
})
//KNEX is query builder for node.js
const knex = require('knex').knex({
  client: 'mysql2',
  connection: {
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '5534348Erik!',
    database : 'flightsdb'
  }
});

module.exports={
    connection,
    knex
}
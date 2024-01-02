const mysql = require('mysql')
 
const pool = mysql.createPool({
 host: process.env.DB_HOST,
 user: process.env.DB_USERNAME,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_DBNAME,
 waitForConnections:true,
 connectionLimit:1000,
 queueLimit:0
})

pool.connect((err) => {
    if (err) throw err
    console.log("Connect to PostgreSQL successfully!")
})

module.exports = pool
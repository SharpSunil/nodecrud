import mysql from "mysql2/promise.js"  //import mysql

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'Worker_db'
})


export default db;
 
import mysql from "mysql2/promise.js"  //import mysql

const db = mysql.createPool({
    host:'localhost',
    user:'quqdaabl_worker',
    password:'mydatabaseworker30_30',
    database:'quqdaabl_worker'
})


export default db;
 
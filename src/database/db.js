import mysql from "mysql2/promise.js"  //import mysql

const db = mysql.createPool({
    host:'103.191.209.63',
    user:'quqdaabl_worker',
    password:'mydatabaseworker30_30',
    database:'quqdaabl_worker'
})


export default db;
 
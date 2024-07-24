import mysql from 'mysql2';

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

con.connect(function(err){
    if(err){
        console.log("Connection error")
    } else {
        console.log("Connected")
    }
})

export default con;
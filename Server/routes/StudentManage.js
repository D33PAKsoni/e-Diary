import express from "express";
import con from "../utils/db.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const app = express()
const router = express.Router();
app.use(cookieParser())

router.post("/addStudent", (req, res) => {
    const { username, fullname, password, class_id } = req.body;

    const classroom = class_id;
    const teacher= 0;
 
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ success: false, error: "Password hashing failed" });
      }
      
      const checkUsernameQuery = "SELECT * FROM users WHERE username = ?";
      con.query(checkUsernameQuery, [username], (err, result) => {
        if (err) {
          return res.json({ success: false, error: "Query error" });
        }
        if (result.length > 0) {
          return res.json({ success: false, error: "Username already exists" });
        } else {
          const insertUserQuery = "INSERT INTO users (username, fullname, password, class_id, isTeacher) VALUES (?, ?, ?, ?, 0)";
          con.query(insertUserQuery, [username, fullname, hashedPassword, classroom, teacher], (err, result) => {
            if (err) {
              return res.status(500).json({ success: false, error: "Registration failed" });
            }
            return res.status(201).json({ success: true, message: "Student added successfully"  });
          });
        }
      });
    });

  });


  router.post('/studentlist', (req,res)=>{
    const sql= "SELECT * FROM users WHERE  class_id= ? AND isTeacher= 0";
    con.query(sql, [req.body.class_id] , (err, result)=> {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
    })
  })

  router.post('/removeStudent', (req,res)=>{

    const checkedStudentIds = req.body.checkedStudentIds;

    const sql= 'DELETE FROM users WHERE id IN (?)';
    con.query(sql, [checkedStudentIds] , (err, result)=> {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Message: result.affectedRows+" Student(s) removed successfully"})
    })
  })


  
  export { router as studentManage };
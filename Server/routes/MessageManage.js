import express from "express";
import con from "../utils/db.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const app = express()
const router = express.Router();
app.use(cookieParser())

router.post("/addMessage", (req, res) => {
    const { title, notif, class_id } = req.body;

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
      var yyyy = today.getFullYear();

    const classroom = class_id;
    const date= yyyy + '-' + mm + '-' + dd;

      const insertNotifQuery = "INSERT INTO messages (title, message, date, class_id) VALUES (?, ?, ?, ?)";
      con.query(insertNotifQuery, [title, notif, date, classroom], (err, result) => {
        if (err) {
          return res.status(500).json({ success: false, error: "Posting failed" });
        }
        return res.status(201).json({ success: true, message: "Notification added successfully"  });
      });

  });


  

  router.post('/message', (req,res)=>{
    const sql= "SELECT * FROM messages WHERE class_id= ?";
    con.query(sql, [req.body.class_id] , (err, result)=> {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
    })
  })

  router.post('/notifmessage', (req, res) => {
    const sql = "SELECT * FROM messages WHERE class_id = ? ORDER BY date DESC LIMIT 3";
    con.query(sql, [req.body.class_id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
    });
  });

  router.post('/removeMessage', (req,res)=>{

    const checkedMessageIds = req.body.checkedMessageIds;

    const sql= 'DELETE FROM messages WHERE id IN (?)';
    con.query(sql, [checkedMessageIds] , (err, result)=> {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Message: result.affectedRows+" Notifications(s) removed successfully"})
    })
  })


  
  export { router as messageManage };
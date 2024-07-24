import express from "express";
import con from "../utils/db.js";
import cookieParser from "cookie-parser";

const app = express()
const router = express.Router();
app.use(cookieParser())

router.post("/addAssign", (req, res) => {
  const { subject, assignment, due, link, class_id } = req.body;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    var yyyy = today.getFullYear();

  const classroom = class_id;
  const date= yyyy + '-' + mm + '-' + dd;

    const insertNotifQuery = "INSERT INTO assignments (subject, assignment, addDate , dueDate, link, class_id) VALUES (?, ?, ?, ?, ?, ?)";
    con.query(insertNotifQuery, [subject, assignment, date, due, link, classroom], (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, error: "Posting failed" });
      }
      return res.status(201).json({ success: true, message: "Assignment added successfully"  });
    });

});

  

  router.post('/listassign', (req,res)=>{
    const sql= "SELECT * FROM assignments WHERE class_id= ?";
    con.query(sql, [req.body.class_id] , (err, result)=> {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
    })
  })

  router.post('/listassign2', (req,res)=>{
    const sql= "SELECT * FROM assignments WHERE class_id= ? ORDER BY addDate DESC LIMIT 3";
    con.query(sql, [req.body.class_id] , (err, result)=> {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
    })
  })

  router.post('/removeAssign', (req,res)=>{

    const checkedAssignIds = req.body.checkedAssignIds;

    const sql= 'DELETE FROM assignments WHERE id IN (?)';
    con.query(sql, [checkedAssignIds] , (err, result)=> {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Message: result.affectedRows+" Assignments(s) removed successfully"})
    })
  })

  
  export { router as assignManage };
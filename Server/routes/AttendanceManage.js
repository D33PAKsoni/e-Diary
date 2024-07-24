import express from "express";
import con from "../utils/db.js";
import cookieParser from "cookie-parser";
import jwt from 'jsonwebtoken';

const app = express();
const router = express.Router();
app.use(cookieParser());

router.post("/addAttendance", (req, res) => {
  const { user_id, date, attendance } = req.body;

  const insertNotifQuery =
    "INSERT INTO attendance (user_id, attendance_date, attendance) VALUES (?, ?, ?)";
  con.query(insertNotifQuery, [user_id, date, attendance], (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: "Posting failed" });
    }
    return res
      .status(201)
      .json({ success: true, message: "Assignment added successfully" });
  });
});



router.post('/listattend', (req, res) => {
  // Query to retrieve data from users and attendance tables
  const query = `
    SELECT users.fullname, attendance.attendance_date, attendance.attendance
    FROM users
    INNER JOIN attendance ON users.id = attendance.user_id
    WHERE users.class_id = ?;
  `;

  // Execute the query
  con.query(query,[req.body.class_id], (error, results) => {
    if (error) {
      // Handle query error
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }

    // Send the response with the retrieved data
    res.json({ Status: true, Result: results});
  });
});


router.post('/liststudentattend', (req, res) => {


  const payload = jwt.verify(req.body.token, 'e-diary-ignou');

  let a, p;

  const query = `
    SELECT users.fullname
    FROM users
    INNER JOIN attendance ON users.id = attendance.user_id
    WHERE users.username = ? AND attendance= ?;
  `;

  con.query(query,[payload.username, "PRESENT"], (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    
    con.query(query,[payload.username, "ABSENT"], (error2, results2) => {
      if (error2) {
        console.error('Error fetching data:', error2);
        res.status(500).json({ error: 'Error fetching data' });
        return;
      }
      res.json({ Status: true, Present: results.length, Absent: results2.length});
    });
  
  });

    
   
});

export { router as attendanceManage };

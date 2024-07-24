import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import Cookies from 'js-cookie';


const app = express()
const router = express.Router();
app.use(cookieParser())


router.post("/login", (req, res) => {
  if (req.body.signup === "true") {
    signupHandler(req, res);
  }
  else {
    loginHandler(req, res);
  }
});

function loginHandler(req, res) {
  const sql = "SELECT * FROM users WHERE username = ?";
  con.query(sql, [req.body.username], (err, result) => {
    if (err) return res.json({ loginStatus: false, error: "Query error" });
    if (result.length > 0) {
      const user = result[0];
      bcrypt.compare(req.body.password, user.password, (err, isValid) => {
        if (err) {
          return res.json({ loginStatus: false, error: "Password comparison error" });
        }
        if (isValid) {
          const token = jwt.sign(
            { role: user.isTeacher , username: user.username, class_id: user.class_id},
            "e-diary-ignou",
            { expiresIn: "1d" }
          );
          res.cookie('token', token);
          res.cookie('role', user.isTeacher);
          res.cookie('class', user.class_id, {
            maxAge: 360000000
          });
          return res.json({ loginStatus: true });
        } else {
          return res.json({ loginStatus: false, error: "Wrong Credentials" });
        }
      });
    } else {
      return res.json({ loginStatus: false, error: "User not found" });
    }
  });
}

function signupHandler(req, res) {
  const { username, fullname, password } = req.body;
  
  const classroom = Math.floor(Math.random() * 1000000) + 1;
  const teacher= 1;
  
  // Hash password with bcrypt
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ success: false, error: "Password hashing failed" });
    }
    
    const checkUsernameQuery = "SELECT * FROM users WHERE username = ?";
    con.query(checkUsernameQuery, [username], (err, result) => {
      if (err) {
        return res.json({ success: false,signupStatus: false, error: "Query error" });
      }
      if (result.length > 0) {
        return res.json({ success: false,signupStatus: false, error: "Username already exists" });
      } else {
        const insertUserQuery = "INSERT INTO users (username, fullname, password, class_id, isTeacher) VALUES (?, ?, ?, ?, ?)";
        con.query(insertUserQuery, [username, fullname, hashedPassword, classroom, teacher], (err, result) => {
          if (err) {
            return res.status(500).json({ success: false, signupStatus: false, error: "Registration failed" });
          } else{
            const token = jwt.sign(
              { role: teacher , username: username, class_id: classroom},
              "e-diary-ignou",
              { expiresIn: "1d" }
            );
            res.cookie('token', token);
            res.cookie('role', teacher);
            res.cookie('class', classroom, {
              maxAge: 360000000
            });
          return res.status(201).json({ success: true, signupStatus: true , message: "User registered successfully " });}
        });
      }
    });
  });
}



export { router as authRouter };


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";


const MainDash = () => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3000/messenger/notifmessage", {
        class_id: Cookies.get("class"),
      })
      .then((result) => {
        if (result.data.Status) {
          setMessages(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

    const [assign, setAssign] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3000/assign/listassign2", {
        class_id: Cookies.get("class"),
      })
      .then((result) => {
        if (result.data.Status) {
          setAssign(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const [attend, setAttend] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3000/attend/liststudentattend", {
        token: Cookies.get("token"),
      })
      .then((result) => {
        if (result.data.Status) {
          console.log(result);
          setAttend(result.data);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const linkbtn = "hide"+Cookies.get("role");
  const role = Cookies.get("role");


  return (
    <div className="maindash">
      <div class="assign">
        <div>
        <h2 className="title">Assignments</h2>
        <table className="assigntable">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Assignment</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
          {assign.map((list) => (
 
            <tr>
              <td>{list.subject}</td>
              <td>{list.assignment}</td>
              <td>{list.dueDate.slice(0, 10)}</td>
            </tr>  
          ))}
          </tbody>
        </table>
        </div>
        <div className="assignlinks" >
          <div className="button" >
            <Link to="/dashboard/assignments">
              <div className="button-link">
                <h4>View All Assignments</h4>
              </div>
            </Link>
          </div>
          <div className={"button "+linkbtn}>
            <Link to="/dashboard/addassign">
              <div className="button-link">
                <h4>Add Assignments</h4>
              </div>
            </Link>
          </div>
          <div className={"button "+linkbtn}>
            <Link to="/dashboard/removeassign">
              <div className="button-link">
                <h4>Remove Assignments</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div class="notification">
          <h2 className="title">Notications</h2>
          <div>
            <table className="notiftable">
              <thead>
                <tr>
                  <th>Notification</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((list) => (
                  <tr>
                    <td>{list.title}</td>
                    <td>{list.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="assignlinks">
              <div className="button">
                <Link to="/dashboard/message">
                  <div className="button-link">
                    <h4>View All Message</h4>
                  </div>
                </Link>
              </div>
              <div className={"button "+linkbtn}>
                <Link to="/dashboard/addmessage">
                  <div className="button-link">
                    <h4>Add Message</h4>
                  </div>
                </Link>
              </div>
              <div className={"button "+linkbtn}>
                <Link to="/dashboard/removemessage">
                  <div className="button-link">
                    <h4>Remove Message</h4>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div class="attendance">
          <h2 className="title">Attendance</h2>
          <div className="assignlinks">
            <div className={"button "+linkbtn}>
              <Link to="/dashboard/attendance">
                <div className="button-link">
                  <h4>View All Attendance</h4>
                </div>
              </Link>
            </div>
            <div className={"button "+linkbtn}>
              <Link to="/dashboard/addattendance">
                <div className="button-link">
                  <h4>Add Attendance</h4>
                </div>
              </Link>
            </div>
            <div className={"studentss"+role}>
              <h2>Presents: </h2><p>{attend.Present}</p>
              <h2>Absents: </h2><p>{attend.Absent}</p>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDash;

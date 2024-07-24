import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
const Attendance = () => {
 const [assign, setAssign] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3000/attend/listattend", {
        class_id: Cookies.get("class"),
      })
      .then((result) => {
        if (result.data.Status) {
          console.log(result);
          setAssign(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const linkbtn = "hide"+Cookies.get("role");

  return (
   
    <div className="messages1">

      <div className="notif2">
        <h2 className="title">Attendance</h2>
        <div>
          <table className="notiftable2">
            <thead>
              <tr>
              <th>Name</th>
                <th>Attendance</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {assign.map((list) => (
                <tr>
                  <td>{list.fullname}</td>
                  <td>{list.attendance}</td>
                  <td>{list.attendance_date.slice(0,10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance
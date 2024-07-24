import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Assign = () => {
  const [assign, setAssign] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3000/assign/listassign", {
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

  const linkbtn = "hide"+Cookies.get("role");

  return (
   
    <div className="messages1">
      <div className="links1">
        <div className={"button "+linkbtn}>
          <Link to="/dashboard/addassign">
            <div className="button-link">
              <h4>Add Assignment</h4>
            </div>
          </Link>
        </div>
        <div className={"button "+linkbtn}>
          <Link to="/dashboard/removeassign">
            <div className="button-link">
              <h4>Remove Assignment</h4>
            </div>
          </Link>
        </div>
      </div>

      <div class="notif2">
        <h2 className="title">Notications</h2>
        <div>
          <table className="notiftable2">
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
                  <td>{list.dueDate.slice(0,10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Assign;

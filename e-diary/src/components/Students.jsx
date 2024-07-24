import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3000/manage/studentlist", {
        class_id: Cookies.get("class"),
      })
      .then((result) => {
        if (result.data.Status) {
          setStudents(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="students1">
      <div className="links1">
        <div className="button">
          <Link to="/dashboard/addstudent">
            <div className="button-link">
              <h4>Add Student</h4>
            </div>
          </Link>
        </div>
        <div className="button">
          <Link to="/dashboard/removestudent">
            <div className="button-link">
              <h4>Remove Student</h4>
            </div>
          </Link>
        </div>
      </div>

      <div>
        <h3 className="title">Student List</h3>
        <div className="list-group">
          <ol class="studentlist">
            {students.map((list) => (
              <li key={list.id} >
                {list.fullname}
              </li>
            ))}{" "}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Students;

import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useForm } from "react-hook-form";

const AddAttendance = () => {
  const [students, setStudents] = useState([]);
  const [refreshToggle, setRefreshToggle] = useState(false);

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
  }, [refreshToggle]);

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
  } = useForm();

  const [error, setError] = useState(null);
  const onSubmitSignUp = async (data, e) => {
    e.preventDefault();


    const checkedStudentIds = Object.entries(data.students)
      .filter(([_, value]) => value)
      .map(([key]) => parseInt(key));

      const uncheckedStudentIds = Object.entries(data.students)
      .filter(([_, value]) => !value)
      .map(([key]) => parseInt(key));

      console.log(uncheckedStudentIds);

    const a = { ...checkedStudentIds, date: data.todate };
    console.log(a);

    for (const key in checkedStudentIds) {
      const senddata = { user_id: checkedStudentIds[key], date: data.todate , attendance:"PRESENT"};
      console.log(senddata);
      try {
        const response = await axios.post(
          "http://localhost:3000/attend/addAttendance",
          senddata
        );
        response.data.Status
          ? setError(response.data.Message)
          : setError(response.data.Error);
        setRefreshToggle(!refreshToggle);
      } catch (error) {}
    }
    for (const key in uncheckedStudentIds) {
        const senddata = { user_id: uncheckedStudentIds[key], date: data.todate, attendance:"ABSENT" };
        console.log(senddata);
        try {
          const response = await axios.post(
            "http://localhost:3000/attend/addAttendance",
            senddata
          );
          response.data.Status
            ? setError(response.data.Message)
            : setError(response.data.Error);
          setRefreshToggle(!refreshToggle);
        } catch (error) {}
      }
  };

  return (
    <div>
      <div className="check-container">
        <h2 className="title">Students</h2>
        <form onSubmit={handleSubmitSignUp(onSubmitSignUp)}>
          <label htmlFor="due">Attendance Date:</label>
          <div className="input-field">
            <i className="fa-solid fa-calendar"></i>
            <input
              type="date"
              placeholder="Attendance Date"
              {...registerSignUp("todate", {
                required: {
                  value: false,
                  message: "Attendance Date is required",
                },
              })}
            />
          </div>
          {errorsSignUp.date && <div>{errorsSignUp.date.message}</div>}
          <div className="entries">
            {students.map((list) => (
              <div className="input-field" key={list.id}>
                <input
                  {...registerSignUp(`students.${list.id}`)}
                  type="checkbox"
                  value={list.id}
                  id={`firstCheckbox-${list.id}`}
                />
                <label htmlFor={`firstCheckbox-${list.id}`}>
                  {list.fullname}
                </label>
              </div>
            ))}
          </div>
          <input type="submit" className="btn" value="Mark" />
        </form>
        <div>{error && error}</div>
      </div>
    </div>
  );
};

export default AddAttendance;

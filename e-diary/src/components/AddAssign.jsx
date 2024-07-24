import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';


const AddAssign = () => {
  const {
    register: registerAssign,
    handleSubmit: handleSubmitAssign,
    formState: { errors: errorAssign },
  } = useForm();

  const [error, setError] = useState(null);
  const onSubmitAssign = async (data, e) => {
    e.preventDefault();

    const AssignData = { ...data , class_id: Cookies.get('class') };

    try {
      const response = await axios.post(
        "http://localhost:3000/assign/addAssign",
    AssignData
      );
      console.log("Posting Response:", response.data);

      response.data.success
        ? setError(response.data.message)
        : setError(response.data.error);
    } catch (error) {}
  };


  return (
    <div className="addform-container">
      <div className="addform">
        <form onSubmit={handleSubmitAssign(onSubmitAssign)}>
          <h2 className="title">Add Assignment</h2>
          <div className="input-field">
          <i className="fa-solid fa-book"></i>
            <input
              type="text"
              placeholder="Subject"
              {...registerAssign("subject", {
                required: { value: true, message: "Subject is required" },
              })}
            />
          </div>
          {errorAssign.subject && <div>{errorAssign.subject.message}</div>}

          <div className="input-field">
          <i className="fa-solid fa-comment"></i>
            <input
              type="text"
              placeholder="Assignment"
              {...registerAssign("assignment", {
                required: { value: true, message: "Assignment Body is required" },
              })}
            />
          </div>
          {errorAssign.assignment && <div>{errorAssign.assignment.message}</div>}
          <label htmlFor="due">Due Date:</label>
          <div className="input-field">
          <i className="fa-solid fa-calendar"></i>
            <input
              type="date"
              placeholder="Due Date"
              {...registerAssign("due", {
                required: { value: false, message: "Due Date is required" },
              })}
            />
          </div>
          {errorAssign.due && <div>{errorAssign.due.message}</div>}
          <div className="input-field">
          <i className="fa-solid fa-link"></i>
            <input
              type="text"
              placeholder="Assignment Link (Optional)"
              {...registerAssign("link", {
                required: { value: false, message: "Link is required" },
              })}
            />
          </div>
          {errorAssign.link && <div>{errorAssign.link.message}</div>}

          <input type="submit" className="btn" value="Post" />

          <div>{error && error}</div>
        </form>
      </div>
    </div>
  );
};

export default AddAssign;

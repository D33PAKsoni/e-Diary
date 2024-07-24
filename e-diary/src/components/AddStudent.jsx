import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AddStudent = () => {
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
  } = useForm();

  const [error, setError] = useState(null);
  const onSubmitSignUp = async (data, e) => {
    e.preventDefault();

    const signUpData = {
      ...data,
      class_id: Cookies.get("class"),
      addstudent: "true",
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/manage/addStudent",
        signUpData
      );
      console.log("Sign Up Response:", response.data);

      response.data.success
        ? setError(response.data.message)
        : setError(response.data.error);
    } catch (error) {}
  };

  return (
    <div className="addform-container">
      <div className="addform">
        <form onSubmit={handleSubmitSignUp(onSubmitSignUp)}>
          <h2 className="title">Add Student</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Username"
              {...registerSignUp("username", {
                required: { value: true, message: "Username is required" },
              })}
            />
          </div>
          {errorsSignUp.username && <div>{errorsSignUp.username.message}</div>}

          <div className="input-field">
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Full Name"
              {...registerSignUp("fullname", {
                required: { value: true, message: "Full Name is required" },
              })}
            />
          </div>
          {errorsSignUp.fullname && <div>{errorsSignUp.fullname.message}</div>}

          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              {...registerSignUp("password", {
                required: { value: true, message: "Password is required" },
                minLength: {
                  value: 4,
                  message: "Password must have minimum 4 character",
                },
              })}
            />
          </div>
          {errorsSignUp.password && <div>{errorsSignUp.password.message}</div>}

          <input type="submit" className="btn" value="Add" />

          <div>{error && error}</div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;

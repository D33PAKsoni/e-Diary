import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useForm } from "react-hook-form";

const RemoveAssign = () => {
  const [assign, setAssign] = useState([]);
  const [refreshToggle, setRefreshToggle] = useState(false);

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
  }, [refreshToggle]);

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
  } = useForm();

  const [error, setError] = useState(null);
  const onSubmitSignUp = async (data, e) => {
    e.preventDefault();

    const checkedAssignIds = Object.entries(data.assign)
      .filter(([_, value]) => value)
      .map(([key]) => key);
    try {
      const response = await axios.post(
        "http://localhost:3000/assign/removeAssign",
        { checkedAssignIds }
      );
      response.data.Status
        ? setError(response.data.Message)
        : setError(response.data.Error);
      setRefreshToggle(!refreshToggle);
    } catch (error) {}
  };

  return (
    <div>
      <div className="check-container">
        <h2 className="title">Assignment</h2>
        <form onSubmit={handleSubmitSignUp(onSubmitSignUp)}>
          <div className="entries">
            {assign.map((list) => (
              <div className="input-field" key={list.id}>
                <input
                  {...registerSignUp(`assign.${list.id}`)}
                  type="checkbox"
                  value={list.id}
                  id={`firstCheckbox-${list.id}`}
                />
                <label htmlFor={`firstCheckbox-${list.id}`}>
                {list.subject + " " + "(" + list.assignment + ")"}
                </label>
              </div>
            ))}
          </div>
          <input type="submit" className="btn" value="Remove" />
        </form>{" "}
        <div>{error && error}</div>
      </div>
    </div>
  );
};

export default RemoveAssign;

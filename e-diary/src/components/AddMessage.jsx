import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';


const AddMessage = () => {
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitNotif,
    formState: { errors: errorsNotif },
  } = useForm();

  const [error, setError] = useState(null);
  const onSubmitNotif = async (data, e) => {
    e.preventDefault();

    const NotifData = { ...data , class_id: Cookies.get('class') };

    try {
      const response = await axios.post(
        "http://localhost:3000/messenger/addMessage",
        NotifData
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
        <form onSubmit={handleSubmitNotif(onSubmitNotif)}>
          <h2 className="title">Add Message</h2>
          <div className="input-field">
          <i class="fa-solid fa-quote-left"></i>
            <input
              type="text"
              placeholder="Title"
              {...registerSignUp("title", {
                required: { value: true, message: "Notification Title is required" },
              })}
            />
          </div>
          {errorsNotif.title && <div>{errorsNotif.title.message}</div>}

          <div className="input-field">
          <i class="fa-solid fa-comment"></i>
            <input
              type="text"
              placeholder="Notification"
              {...registerSignUp("notif", {
                required: { value: true, message: "Notification Body is required" },
              })}
            />
          </div>
          {errorsNotif.notif && <div>{errorsNotif.notif.message}</div>}

          <input type="submit" className="btn" value="Post" />

          <div>{error && error}</div>
        </form>
      </div>
    </div>
  );
};

export default AddMessage;

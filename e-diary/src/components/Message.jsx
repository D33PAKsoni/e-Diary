import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Message = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:3000/messenger/message", {
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

  const linkbtn = "hide"+Cookies.get("role");

 const role = Cookies.get("role");

  return (
    <div className="messages1">
      <div className="links1">
        <div className={"button "+linkbtn}>
          <Link to="/dashboard/addmessage">
            <div className="button-link">
              <h4>Add Notification</h4>
            </div>
          </Link>
        </div>
        <div className={"button "+linkbtn}>
          <Link to="/dashboard/removemessage">
            <div className="button-link">
              <h4>Remove Notification</h4>
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
              <th>Title</th>
                <th>Notification</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((list) => (
                <tr>
                  <td>{list.title}</td>
                  <td>{list.message}</td>
                  <td>{list.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Message;

import "./App.css";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
import Dashboard from "./components/Dashboard.jsx";
import MainDash from "./components/MainDash.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Students from "./components/Students.jsx";
import Attendance from "./components/Attendance.jsx";
import Assign from "./components/Assign.jsx";
import Message from "./components/Message.jsx";
import AddStudent from "./components/AddStudent.jsx";
import RemoveStudent from "./components/RemoveStudent.jsx";
import AddMessage from "./components/AddMessage.jsx";
import RemoveMessage from "./components/RemoveMessage.jsx";
import AddAssign from "./components/AddAssign.jsx";
import RemoveAssign from "./components/RemoveAssign.jsx";
import AddAttendance from "./components/AddAttendance.jsx";

function App() {
  return (
    <>
      <div className="app-container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="" element={<MainDash />}></Route>
              <Route path="/dashboard/students" element={<Students />}></Route>
              <Route
                path="/dashboard/attendance"
                element={<Attendance />}
              ></Route>
              <Route path="/dashboard/assignments" element={<Assign />}></Route>
              <Route path="/dashboard/message" element={<Message />}></Route>
              <Route
                path="/dashboard/addstudent"
                element={<AddStudent />}
              ></Route>
              <Route
                path="/dashboard/removestudent"
                element={<RemoveStudent />}
              ></Route>
              <Route
                path="/dashboard/addmessage"
                element={<AddMessage />}
              ></Route>
              <Route
                path="/dashboard/removemessage"
                element={<RemoveMessage />}
              ></Route>
              <Route
                path="/dashboard/addassign"
                element={<AddAssign />}
              ></Route>
              <Route
                path="/dashboard/removeassign"
                element={<RemoveAssign />}
              ></Route>
              <Route
                path="/dashboard/addattendance"
                element={<AddAttendance />}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>

        {/* <RouterProvider router={router}/> */}
      </div>
    </>
  );
}

export default App;

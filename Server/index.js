import express from "express";
import cors from "cors";
import { authRouter } from "./routes/AuthRoute.js";
import { messageManage } from "./routes/MessageManage.js";
import { studentManage } from "./routes/StudentManage.js";
import { assignManage } from "./routes/AssignmentManage.js";
import { attendanceManage } from "./routes/AttendanceManage.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/auth", authRouter);

app.use("/manage", studentManage);

app.use("/messenger", messageManage);

app.use("/assign", assignManage);

app.use("/attend", attendanceManage);


app.listen(3000, () => {
  console.log("Server Online");
});

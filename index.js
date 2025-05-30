const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

const todosRoute = require("./routes/todos");
const authRoute = require("./routes/auth");
const internalRoute = require("./routes/internal");
const authenticate = require("./middlewares/authenticate");
// app.get("/private", (req, res) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
//   if (!token) {
//     return res.status(401).json({ message: "Please log in" });
//   }

//   try {
//     verifyToken(token);
//     res.status(200).json({ message: "This is the private information" });
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     res.status(401).json({ message: "Invalid token" });
//   }
// });

// app.get("/admin-only", (req, res) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>
//   if (!token) {
//     return res.status(401).json({ message: "Please log in" });
//   }

//   try {
//     const payload = verifyToken(token);
//     if (payload.role !== "admin") {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     res.status(200).json({ message: "This is the private information" });
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     res.status(401).json({ message: "Invalid token" });
//   }
// });

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Public routes
app.use("/auth", authRoute);

app.use(authenticate);

// private routes
app.use("/todos", todosRoute);

app.use("/internal", internalRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
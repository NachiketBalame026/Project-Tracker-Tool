require("dotenv").config({ path: "../.env" });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const projectRoutes = require("./routes/projectRoute");
const app = express();
const authMiddleware = require("./Middleware/protectRoute.js");
const candidateRoutes = require("./routes/candidateRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(mongoUri);

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB");
});
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);
app.use("/api/candidates", authMiddleware.authenticate, candidateRoutes);
app.use(
  "/api/admin",
  authMiddleware.authenticate,
  authMiddleware.authorize(["admin"]),
  adminRoutes
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

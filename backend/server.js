require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
app.use(express.json());
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/income", require("./routes/incomeRoutes"));
// Middleware to serve static files from the React app

//middleware to handle cors
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
// Serve static files from the React app

connectDB();
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const fs = require("fs");
const path = require("path");



const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
//require("dotenv").config({ path: __dirname + "/.env" });

const app = express();
const expenseRoutes = require("./routes/expenseRoutes");

// Middleware
app.use(cors());
app.use(express.json());



// MongoDB connection (THIS WAS MISSING)
mongoose
  .connect(
    "mongodb+srv://Expense_user:Murivalan%402005@m0.lv4pnz1.mongodb.net/expense-tracker?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Routes
app.use("/api/expenses", expenseRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

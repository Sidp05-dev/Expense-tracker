const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

// GET all expenses
router.get("/", async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

// POST new expense
router.post("/", async (req, res) => {
  const expense = new Expense(req.body);
  const savedExpense = await expense.save();
  res.json(savedExpense);
});

// ✅ DELETE expense by ID
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// UPDATE expense by ID
router.put("/:id", async (req, res) => {
    try {
      const updatedExpense = await Expense.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedExpense);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
module.exports = router;

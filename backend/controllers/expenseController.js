const mongoose = require("mongoose");
const User = require("../models/User");
const Expense = require("../models/expense");
const protect = require("../middleware/authMiddleware");
const XLSX = require("xlsx");

// add expense source
exports.addExpense = async (req, res) => {
    const userId = req.user._id;
    try {
        const { icon, category, amount, date } = req.body;
        if (!date || !category || !amount) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newExpense = new Expense({
            userId: userId,
            icon,
            category,
            amount,
            date: date ? new Date(date) : new Date()
        });
        await newExpense.save();
        res.status(201).json({ message: "Expense source added successfully", expense: newExpense });
    } catch (error) {
        console.error("Error adding expense", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// get all expense sources
exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;
    console.log("req.user._id:", userId);
    try {
        const expenses = await Expense.find({ userId: userId }).sort({ date: -1 });
        console.log("Fetched expenses:", expenses);
        res.status(200).json(expenses);
    } catch (error) {
        console.error("Error fetching expense sources:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// delete expense
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// download expenses as excel file
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;
    try {
        const expenses = await Expense.find({ userId: userId }).sort({ date: -1 });
        // Convert expenses to a format suitable for Excel
        const data = expenses.map(expense => ({
            Category: expense.category,
            Amount: expense.amount,
            Date: expense.date,
        }));
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Expenses");
        XLSX.writeFile(wb, "expenses.xlsx");
        res.download("expenses.xlsx");
    } catch (error) {
        console.error("Error downloading expenses as Excel:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
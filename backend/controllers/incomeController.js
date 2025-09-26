const User = require("../models/User");
const Income = require("../models/Income"); // <-- UPPERCASE
const protect = require("../middleware/authMiddleware");
const XLSX = require("xlsx");
// add income source
exports.addIncome = async (req, res) => {
    const userId = req.user._id; // Assuming req.user is populated by the auth middleware
    try {
        const { icon, source, amount, date } = req.body;
        if (!date || !source || !amount) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newIncome = new Income({
            user: userId,
            icon,
            source,
            amount,
            date: date ? new Date(date) : new Date()
        });
        await newIncome.save();
        res.status(201).json({ message: "Income source added successfully", income: newIncome });
    } catch (error) {
        console.error("Error adding income source:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// get all income source
exports.getAllIncome = async (req, res) => {
    const userId = req.user._id;
    console.log("req.user._id:", userId); // Add this line to debug
    try {
        const incomes = await Income.find({ user: userId }).sort({ date: -1 });
        console.log("Fetched incomes:", incomes); // Add this line to debug
        res.status(200).json(incomes);
    } catch (error) {
        console.error("Error fetching income sources:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// delete income source
exports.deleteIncome = async (req, res) => {
    
    try{
        await Income.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Income source deleted successfully" });
    } catch (error) {
        console.error("Error deleting income source:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// download income source as excel file
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id;
    try {
    const incomes = await Income.find({ user: userId }).sort({ date: -1 });
  // Convert incomes to a format suitable for Excel
  const data =  incomes.map(income => ({
        Source: income.source,
        Amount: income.amount,
        Date: income.date,
  }));
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Incomes");
 // Generate a buffer
        const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

        // Set headers so the browser/client knows this is an Excel file
        res.setHeader("Content-Disposition", "attachment; filename=incomes.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(buffer);
} catch (error) {
        console.error("Error downloading income sources as Excel:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
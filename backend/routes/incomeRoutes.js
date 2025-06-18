const express = require("express");
const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addIncome);
router.get("/get",protect, getAllIncome);  
router.delete("/:id",protect, deleteIncome);
router.get("/downloadexcel",protect, downloadIncomeExcel);

module.exports = router;
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

// add dashboard data
const getdashboardData = async (req, res) => {
  try {
    const userId = req.user._id;
    const userObjectId = isValidObjectId(userId) ? new Types.ObjectId(userId) : null;

    // Fetch total income
    const totalIncomeAgg = await Income.aggregate([
      { $match: { user: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalIncome = totalIncomeAgg[0]?.total || 0;

    // Fetch total expense
    const totalExpenseAgg = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const totalExpense = totalExpenseAgg[0]?.total || 0;

    // Get income transactions in the last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      user: userObjectId,
      date: {
        $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
      }
    }).sort({ date: -1 });

    // Total income in the last 60 days
    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount, 0
    );

    // Get expense transactions in the last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      date: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      }
    }).sort({ date: -1 });

    // Total expense in the last 30 days
    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount, 0
    );

    // Fetch the last 5 income and expenses transactions
    const last5Income = (await Income.find({ user: userObjectId }).sort({ date: -1 }).limit(5))
      .map(txn => ({
        ...txn.toObject(),
        type: "Income"
      }));
    const last5Expense = (await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5))
      .map(txn => ({
        ...txn.toObject(),
        type: "Expense"
      }));
    // Merge and sort the last 5 transactions by date desc
    const last5Transactions = [...last5Income, ...last5Expense]
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);

    // Final response
    res.json({
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,
      last30DaysExpenseTransactions: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: last5Transactions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message || error,
    });
  }
};

module.exports = { getdashboardData };
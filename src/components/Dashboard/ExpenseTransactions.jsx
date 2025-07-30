import React from 'react'
import { LuArrowRight } from "react-icons/lu";
import TransactionsCardInfo from "../cards/TransactionsInfoCard";
import moment from 'moment';

const ExpenseTransactions = ({transactions, onSeeMore}) => {
  const hasTransactions = transactions && transactions.length > 0;

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expenses</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {hasTransactions ? (
          transactions.slice(0, 5).map((expense) => (
            <TransactionsCardInfo
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format("Do MM YYYY")}
              amount={expense.amount}
              type="expense"
              hideDeleteBtn
            />
          ))
        ) : (
          <div className="text-center text-gray-400 py-4">
            No expenses found in the last 30 days.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
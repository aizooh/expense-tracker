import React from "react";
import { LuArrowRight } from "react-icons/lu";
// import { LuArrowRight } from "react-icon/lu";
import TransactionsInfoCard  from "../../components/cards/TransactionsInfoCard";
import moment from "moment"

const RecentIncome = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="fex items-center justify-between">
        <h5 className="text=lg">Income</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />{" "}
        </button>
      </div>

      <div className="mt-6">
        {transactions?.slice(0.5)?.map((item, index) => (
          <TransactionsInfoCard
            key={item.id || index}
            title={item.source}
            icon={item.icon}
            date={moment(item.date).format("Do MM YYYY")}
            amount={item.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentIncome;

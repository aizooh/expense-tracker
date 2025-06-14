import React from "react";
import card_2 from "../../assets/images/card_2.png";
import { LuTrendingUpDown } from "react-icons/lu"; // <-- Add this line

const StatsInfoCard = ({ icon, label, value, color }) => (
  <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md border border-gray-200">
    <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
      {icon}
    </div>
    <div>
      <h6>{label}</h6>
      <span>{value}</span>
    </div>
  </div>
);

const AuthLayout = ({ children }) => (
  <div className="flex w-screen h-screen overflow-hidden">
    <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 bg-white">
      <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
      {children}
    </div>
    <div className="hidden md:block w-[40vw] h-screen bg-violet-50 bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
      <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute top-7 -left-5">
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10">
          <div className="w-48 h-56 rounded-[40px] border-[20px] border-violet-500 absolute bottom-7 -left-5">
            <div className="grid grid-cols-1 z-20">
              <StatsInfoCard
                icon={<LuTrendingUpDown />}
                label="Track your Income & Expenses"
                value="430,000"
                color="bg-primary"
              />
            </div>
            <img
              src={card_2}
              alt="card"
              className="w-64 lg:w-[90%] absolute bottom-10 z-50 shadow-lg shadow-blue-400/15"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AuthLayout;
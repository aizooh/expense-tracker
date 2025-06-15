import React from "react";
import card_2 from "../../assets/images/card_2.png";
import { LuTrendingUpDown } from "react-icons/lu";

const StatsInfoCard = ({ icon, label, value, color }) => (
  <div className="flex gap-6 top-1 bg-white p-4 rounded-xl shadow-md border border-gray-200">
    <div className={`w-12 h-12  flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
      {icon}
    </div>
    <div>
      <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
      <span className="text-[20px]">{value}</span>
    </div>
  </div>
);

const AuthLayout = ({ children }) => (
  <div className="flex w-screen h-screen overflow-hidden">
    
    {/* Left section */}
    <div className="w-full md:w-[60vw] h-full px-12 pt-8 pb-12 bg-white">
      <h2 className="text-xl font-medium text-black">Expense Tracker</h2>
      {children}
    </div>
    {/* Right section */}
    <div className="hidden md:flex w-[40vw] h-screen bg-violet-50 p-8 relative items-center justify-center">
      {/* Outermost border layer */}
      <div className="absolute left-9 top-16 w-56 h-64 rounded-[40px] border-8 border-fuchsia-600 pointer-events-none"></div>
      {/* Middle border layer */}
      <div className="absolute left-8 bottom-24 w-48 h-56 rounded-[32px] border-8 border-violet-500 pointer-events-none"></div>
      {/* Inner card/content */}
      <div className="relative w-400 h-48 rounded-[30px] bg-white shadow-lg z-10 flex flex-col justify-between ">
        <div className="grid grid-cols-1 z-20 p-4">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track your Income & Expenses"
            value="430,000"
            color="bg-purple-500"
          /> 
        </div>
        
        {/* Place image at bottom right */}
       
      </div>
      
    </div> <img
          src={card_2}
          alt="card"
          className="absolute right-0 bottom-0 w-100 z-20"
        />
  </div>
);

export default AuthLayout;
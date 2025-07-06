import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from "../../hooks/useUserAuth"
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utils/apiPaths"
import axiosInstance from "../../utils/axiosInstance"
import InfoCard from "../../components/cards/InfoCard";
// import { IoMyCard } from "react-icons/io5";
import { LuHandCoins, LuWalletMinimal} from "react-icons/lu";
import { addThousandsSeparator } from "../../utils/helper";
import { IoCard } from 'react-icons/io5';
const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}`
      );
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("something went wrong. Please try again.", error)
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    // No cleanup needed
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-5 md:grid-cols-3 gap-6">
          <InfoCard
          icon={<IoCard/>}
          label="Total Balance"
          value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
          color='bg-primary'
          />
           <InfoCard
          icon={<LuWalletMinimal/>}
          label="Total Income"
          value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
          color='bg-orange-500'
          />
           <InfoCard
          icon={<LuHandCoins/>}
          label="Total Expense"
          value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
          color='bg-red-500'
          />


        </div>
        homes skjkj
      </div>
    </DashboardLayout>
  )
}

export default Home
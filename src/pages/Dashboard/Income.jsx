import React, { useState, useEffect } from 'react'
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import IncomeOverview from "../../components/Income/IncomeOverview";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false); // Capitalized "State"
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Getting all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // Added = sign and removed quotes around API path
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setIncomeData(response.data);
      }
    }
    catch (error) {
      console.log("Something went wrong. Please try again", error)
    }
    finally {
      setLoading(false); // Fixed capitalization
    }
  };

  // Handle add income
  const handleAddIncome = async (income) => {}; // Fixed arrow function syntax

  // Delete income 
  const deleteIncome = async (id) => {}; // Fixed spelling of "async"

  // Handle download income details 
  const handleDownloadIncomeDetails = async () => {}; // Fixed function name

  useEffect(() => {
    fetchIncomeDetails();
    return () => {
      // Cleanup func tion
    };
  }, []); // Added dependency array

  return (
    <DashboardLayout activeMenu="income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6 ">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Income;
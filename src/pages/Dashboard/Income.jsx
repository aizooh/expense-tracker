import React, { useState, useEffect } from 'react'
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import IncomeOverview from "../../components/Income/IncomeOverview";
import Modal from "../../components/Modal"; 
import { toast } from "react-hot-toast";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";

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
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
    //validation checks 

    // if (!source || !amount || !date) {
    //   alert("Please fill all fields");
    //   return;
    // }
    if (!source.trim ()){
      taost.error("Please enter a valid income source");
      return;
    }
    if (!amount|| isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be greater than 0");
      return;

    }
    if (!date) {
      toast.error("Please select a date");
      return;}
      try {
        await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
          source,
          amount,
          date,
          icon,
        });
        setOpenAddIncomeModal(false);
        toast.success("Income added successfully");
        fetchIncomeDetails(); // Refresh income details
      }
      catch (error) {
        console.error("Error adding income:", error);
        toast.error("Failed to add income. Please try again."),
        error.response?.data?.message||eror.mesa
      }
  }; // Fixed arrow function syntax

  // Delete income 
  const deleteIncome = async (id) => {
  try {
    await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
    setOpenDeleteAlert({ show: false, data: null });   // Close alert/modal
    toast.success("Income deleted successfully");       // Show success toast
    fetchIncomeDetails();                              // Refresh data
  } catch (error) {
    console.error(
      "Error deleting income:",
      error.response?.data?.message || error.message
    );
    toast.error("Failed to delete income. Please try again."); // Show error toast
  }
}; // Fixed spelling of "async"

  // Handle download income details 
  const handleDownloadIncomeDetails = async () => {}; // Fixed function name

  useEffect(() => {
    fetchIncomeDetails();
    return () => {
      // Cleanup func tion
    };
  }, []); // Added dependency array

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6 ">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>

        <IncomeList
        transactions={incomeData}
        onDelete={(id)=> {setOpenDeleteAlert({show:true , data:id});}}
        onDownload={handleDownloadIncomeDetails}
        />
        <Modal 
  isOpen={openAddIncomeModal}
  onClose={() => setOpenAddIncomeModal(false)}
  title="Add Income"
>
  <AddIncomeForm onAddIncome={handleAddIncome} />
</Modal>

<Modal
  isOpen={openDeleteAlert.show}
  onClose={() => setOpenDeleteAlert({ show: false, data: null })}
  title="Delete Income">
    <DeleteAlert
    content="Are you sure you want to delete this income?"
    onDelete={() => deleteIncome(openDeleteAlert.data)}
    />
</Modal>
      </div>
    </DashboardLayout>
  );
}

export default Income;
import React from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useState } from 'react';
import { useEffect } from 'react';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
// import toast from 'react-hot-toast';
import { ExpenseOverview } from '../../components/Expense/ExpenseOverview';
import { toast } from 'react-hot-toast'; // Fixed import statement
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';

const Expense = () => {
    useUserAuth();
     const [expenseData, setExpenseData] = useState([]);
      const [loading, setLoading] = useState(false); // Capitalized "State"
      const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
      const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
      });
      
  // Getting all expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // Added = sign and removed quotes around API path
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setExpenseData(response.data);
      }
    }
    catch (error) {
      console.log("Something went wrong. Please try again", error)
    }
    finally {
      setLoading(false); // Fixed capitalization
    }
  };

  // Handle add expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;
    //validation checks 

    // if (!source || !amount || !date) {
    //   alert("Please fill all fields");
    //   return;
    // }
    if (!category.trim ()){
      taost.error("Category is required");
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
        await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
          category,
          amount,
          date,
          icon,
        });
        setOpenAddExpenseModal(false);
        toast.success("Expense added successfully");
        fetchExpenseDetails(); // Refresh Expense details
      }
      catch (error) {
        console.error("Error adding Expense:", error);
        toast.error("Failed to add Expense. Please try again."),
        error.response?.data?.message||eror.mesa
      }
  }; // Fixed arrow function syntax
  useEffect(() => {
    fetchExpenseDetails();
    return () => {}
  },[]
  );
  //delete expense
    const deleteExpense = async (id) => {
  try {
    await axiosInstance.delete(API_PATHs.EXPENSE.DELETE_EXPENSE(id));
    setOpenDeleteAlert({ show: false, data: null });   // Close alert/modal
    toast.success("Income deleted successfully");       // Show success toast
    fetchIncomeDetails();                              // Refresh data
  } catch (error) {
    console.error(
      "Error deleting income:",
      error.response?.data?.message || error.message
    );
    
  }
}; 

  // Handle download income details 
  const handleDownloadIncomeDetails = async () => {}; // Fixed function name
  return (
     <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div className="">        
          <ExpenseOverview 
        transaction={expenseData}
        onExpenseIncome={()=>setOpenAddExpenseModal(true)}/>
</div>   
<ExpenseList 
transactions= {expenseData}
ondelete={(id)=> {
  setOpenDeleteAlert({
    show: true,
    data: id,
  });}}
  onDownload={handleDownloadExpenseDetails}/>

</div>
<Modal
isOpen={openAddExpenseModal}
onClose={() => setOpenAddExpenseModal(false)}
title="Add Expense"
>
<AddExpenseForm onAddExpense={handleAddExpense} />
</Modal>

    </div>
    </DashboardLayout>
  );
};

export default Expense;

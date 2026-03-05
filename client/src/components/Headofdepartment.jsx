import React, { useState } from "react";
import "../styles/HeadOfDepartment.css";
import axios from "axios";
const HeadOfDepartment = () => {
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showRevenueModal, setShowRevenueModal] = useState(false);
  
  const [expenseData, setExpenseData] = useState({
    category: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split('T')[0]
  });

  const [revenueData, setRevenueData] = useState({
    source: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split('T')[0]
  });

  const handleAddExpense = () => {
    setShowExpenseModal(true);
  };

  const handleAddRevenue = () => {
    setShowRevenueModal(true);
  };

  const handleExpenseSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      //api,
      expenseData,
      { withCredentials: true }
    );

    console.log(res.data);

    setShowExpenseModal(false);

    setExpenseData({
      category: "",
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0]
    });

  } catch (error) {
    console.error(error);
  }
};

 const handleRevenueSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      //api,
      revenueData,
      { withCredentials: true }
    );

    console.log(res.data);

    setShowRevenueModal(false);

    setRevenueData({
      source: "",
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0]
    });

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="hod-container">
      {/* Header */}
      <div className="hod-header">
        <h1>Head Of <span>Department</span></h1>
        <p>Financial management dashboard</p>
      </div>

      {/* Centered Action Buttons */}
      <div className="hod-actions-center">
        <button className="hod-btn hod-btn-outline" onClick={handleAddExpense}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3.5V12.5M3.5 8H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Add Expense
        </button>
        <button className="hod-btn hod-btn-primary" onClick={handleAddRevenue}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3.5V12.5M3.5 8H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Add Revenue
        </button>
      </div>

      {/* Expense Modal */}
      {showExpenseModal && (
        <div className="hod-modal-overlay" onClick={() => setShowExpenseModal(false)}>
          <div className="hod-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Expense</h2>
              <button className="modal-close" onClick={() => setShowExpenseModal(false)}>×</button>
            </div>
            
            <form className="modal-form" onSubmit={handleExpenseSubmit}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={expenseData.category}
                  onChange={(e) => setExpenseData({...expenseData, category: e.target.value})}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Operations">Operations</option>
                  <option value="Marketing">Marketing</option>
                  <option value="IT Infrastructure">IT Infrastructure</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Office Supplies">Office Supplies</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={expenseData.amount}
                  onChange={(e) => setExpenseData({...expenseData, amount: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  value={expenseData.date}
                  onChange={(e) => setExpenseData({...expenseData, date: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  placeholder="Enter description"
                  rows="3"
                  value={expenseData.description}
                  onChange={(e) => setExpenseData({...expenseData, description: e.target.value})}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="hod-btn hod-btn-outline" onClick={() => setShowExpenseModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="hod-btn hod-btn-primary">
                  Submit Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Revenue Modal */}
      {showRevenueModal && (
        <div className="hod-modal-overlay" onClick={() => setShowRevenueModal(false)}>
          <div className="hod-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Revenue</h2>
              <button className="modal-close" onClick={() => setShowRevenueModal(false)}>×</button>
            </div>
            
            <form className="modal-form" onSubmit={handleRevenueSubmit}>
              <div className="form-group">
                <label className="form-label">Revenue Source</label>
                <select
                  value={revenueData.source}
                  onChange={(e) => setRevenueData({...revenueData, source: e.target.value})}
                  required
                >
                  <option value="">Select source</option>
                  <option value="Sales">Sales</option>
                  <option value="Services">Services</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Subscriptions">Subscriptions</option>
                  <option value="Licensing">Licensing</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={revenueData.amount}
                  onChange={(e) => setRevenueData({...revenueData, amount: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  value={revenueData.date}
                  onChange={(e) => setRevenueData({...revenueData, date: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  placeholder="Enter description"
                  rows="3"
                  value={revenueData.description}
                  onChange={(e) => setRevenueData({...revenueData, description: e.target.value})}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="hod-btn hod-btn-outline" onClick={() => setShowRevenueModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="hod-btn hod-btn-primary">
                  Submit Revenue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadOfDepartment;
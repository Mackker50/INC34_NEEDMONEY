// src/components/ExpenseReport.tsx
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Expense } from '../types';

const ExpenseReport: React.FC = () => {
  const { expenses } = useAppContext();

  const renderExpenses = () => {
    return expenses.map((expense: Expense, index: number) => (
      <tr key={index}>
        <td>{expense.date}</td>
        <td>{expense.amount}</td>
        <td>{expense.category ?? '-'}</td>
      </tr>
    ));
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Expense Report</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>{renderExpenses()}</tbody>
      </table>
    </div>
  );
};

export default ExpenseReport;

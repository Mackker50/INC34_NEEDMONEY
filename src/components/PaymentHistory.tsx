// src/components/PaymentHistory.tsx
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Payment } from '../types';

const PaymentHistory: React.FC = () => {
    const { paymentHistory } = useAppContext();

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold">Payment History</h2>
            <table className="w-full">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Amount</th>
                    <th className="py-2 px-4 border-b">Category</th>
                </tr>
                </thead>
                <tbody>
                {paymentHistory.map((payment: Payment, index: number) => (
                    <tr key={index}>
                    <td className="py-2 px-4 border-b">{payment.date}</td>
                    <td className="py-2 px-4 border-b">{payment.amount}</td>
                    <td className="py-2 px-4 border-b">{payment.category ?? '-'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;

import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import UploadSlip from './UploadSlip';
import { TopUp } from '../types';

const Dashboard: React.FC = () => {
    const { totalBalance, topUpHistory, userName } = useAppContext();

    return (
        <div className="min-h-screen bg-blue-600 p-16 flex flex-col items-center justify-center px-4">
            <h1 className="text-white text-4xl font-extrabold mb-8 text-center select-none">
                Bonjour, {userName || 'User'}!
            </h1>

            <div className="bg-white rounded-xl shadow-xl p-8 mb-6 w-full max-w-md"> {/* Balance Card */}
                <div className="text-center">
                    <h2 className="text-xl font-semibold">Your balance is</h2>
                    <h1 className="text-4xl font-semibold">{totalBalance}฿</h1>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-8 mb-6 w-full max-w-md"> {/* Slip Uploading Card */}
                <UploadSlip />
            </div>

            <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md"> {/* Payment History Card */}
                <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Payment History</h3>
                <ul className="list-disc pl-5 max-h-48 overflow-y-auto">
                    {topUpHistory.map((topUp: TopUp, index: number) => (
                    <li key={index}>
                        {topUp.date} - {topUp.amount}฿
                    </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

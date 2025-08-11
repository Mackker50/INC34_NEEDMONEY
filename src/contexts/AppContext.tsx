// src/contexts/AppContext.tsx
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { TopUp, Payment, Expense, Activity, User } from '../types';

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  paymentHistory: Payment[];
  setPaymentHistory: React.Dispatch<React.SetStateAction<Payment[]>>;
  topUpHistory: TopUp[];
  setTopUpHistory: React.Dispatch<React.SetStateAction<TopUp[]>>;
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  totalBalance: number;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;  // add setter here
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<Payment[]>([]);
  const [topUpHistory, setTopUpHistory] = useState<TopUp[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [userName, setUserName] = useState<string>('');

  const totalBalance = useMemo(() => {
    const totalTopUp = topUpHistory.reduce((s, t) => s + (t.amount || 0), 0);
    const totalPayments = paymentHistory.reduce((s, p) => s + (p.amount || 0), 0);
    return totalTopUp - totalPayments;
  }, [topUpHistory, paymentHistory]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        paymentHistory,
        setPaymentHistory,
        topUpHistory,
        setTopUpHistory,
        expenses,
        setExpenses,
        activities,
        setActivities,
        totalBalance,
        userName,
        setUserName, // <-- pass setter here
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
};

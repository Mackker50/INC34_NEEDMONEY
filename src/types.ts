// src/types.ts
export interface TopUp {
  date: string;
  amount: number;
}

export interface Payment {
  date: string;
  amount: number;
  category?: string;
}

export interface Expense {
  date: string;
  amount: number;
  category?: string;
}

export interface Activity {
  id: string;
  name: string;
}

export interface User {
  username: string;
  balance: number;
}

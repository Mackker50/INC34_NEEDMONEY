// src/components/ActivityPayment.tsx
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Activity } from '../types';

const ActivityPayment: React.FC = () => {
  const { activities, setActivities } = useAppContext();
  const [amount, setAmount] = useState<number | ''>('');
  const [activityType, setActivityType] = useState<string>('');

  const addActivity = () => {
    if (!activityType || !amount) return;
    const newAct: Activity = { id: Date.now().toString(), name: activityType };
    setActivities([...activities, newAct]);
    setAmount('');
    setActivityType('');
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Activity Payment</h2>
      <input value={activityType} onChange={(e) => setActivityType(e.target.value)} placeholder="Activity" />
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
        placeholder="Amount"
      />
      <button onClick={addActivity}>Add</button>

      <ul>
        {activities.map((a) => (
          <li key={a.id}>{a.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityPayment;

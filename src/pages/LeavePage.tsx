import React from 'react';
import LeaveForm from '../components/LeaveForm';

export default function LeavePage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Leave Management</h1>
      <div className="max-w-2xl mx-auto">
        <LeaveForm />
      </div>
    </div>
  );
}
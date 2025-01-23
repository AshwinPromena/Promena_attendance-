import React from 'react';
import ProfileForm from '../components/ProfileForm';
import { Employee } from '../types';

export default function ProfilePage() {
  // Mock data - replace with actual API call
  const employee: Employee = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    department: 'Engineering',
    position: 'Senior Developer',
    joinDate: '2023-01-15',
    phoneNumber: '+1234567890',
    address: '123 Main St, City, Country',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  };

  const handleUpdateProfile = (data: Partial<Employee>) => {
    console.log('Profile update:', data);
    // Add API call to update profile
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      <div className="max-w-2xl mx-auto">
        <ProfileForm employee={employee} onUpdate={handleUpdateProfile} />
      </div>
    </div>
  );
}
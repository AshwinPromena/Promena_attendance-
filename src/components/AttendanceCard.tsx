import React from "react";
import { Clock } from "lucide-react";
import CalendarPage from "../pages/CalendarPage";

interface AttendanceCardProps {
  onCheckIn: () => void;
  onCheckOut: () => void;
  checkedIn: boolean;
  checkedOut: boolean;
  currentTime: string;
}

export default function AttendanceCard({
  onCheckIn,
  onCheckOut,
  checkedIn,
  checkedOut,
  currentTime,
}: AttendanceCardProps) {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Today's Attendance</h2>
          <Clock className="w-6 h-6 text-gray-600" />
        </div>

        <div className="text-center mb-6">
          <p className="text-3xl font-bold text-gray-800">{currentTime}</p>
          <p className="text-gray-600">Current Time</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onCheckIn}
            disabled={checkedIn}
            className={`p-3 rounded-lg ${
              checkedIn
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Check In
          </button>
          <button
            onClick={onCheckOut}
            disabled={!checkedIn || checkedOut}
            className={`p-3 rounded-lg ${
              !checkedIn || checkedOut
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            Check Out
          </button>
        </div>
      </div>
      {/* <CalendarPage></CalendarPage> */}
    </div>
  );
}

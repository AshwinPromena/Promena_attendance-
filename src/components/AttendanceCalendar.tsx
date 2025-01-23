import React, { useState } from "react";
import { AttendanceRecord } from "../types";

interface CalendarProps {
  month: Date;
  attendanceRecords: AttendanceRecord[];
}

export default function AttendanceCalendar({
  month,
  attendanceRecords,
}: CalendarProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    month.getFullYear(),
    month.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const getAttendanceRecord = (day: number) => {
    const date = new Date(
      month.getFullYear(),
      month.getMonth(),
      day
    ).toLocaleDateString("en-CA"); // Format as YYYY-MM-DD
    return attendanceRecords.find((r) => r.date === date);
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      case "half-day":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      {/* Calendar Header */}
      <h2 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left">
        {month.toLocaleString("default", { month: "long", year: "numeric" })}
      </h2>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-sm md:text-base">
        {/* Weekday Headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center font-medium text-gray-600 py-2"
          >
            {day}
          </div>
        ))}

        {/* Empty Cells for Offset */}
        {blanks.map((blank) => (
          <div key={`blank-${blank}`} className="h-12 md:h-16" />
        ))}

        {/* Day Cells */}
        {days.map((day) => {
          const record = getAttendanceRecord(day);
          const isSelected = selectedDay === day;
          return (
            <div
              key={day}
              onClick={() => setSelectedDay(isSelected ? null : day)}
              className={`h-12 md:h-16 p-2 border rounded-lg cursor-pointer transition-colors
                ${getStatusColor(record?.status)}
                ${isSelected ? "ring-2 ring-blue-500" : ""}
                hover:bg-gray-100`}
            >
              <div className="text-right mb-1">{day}</div>
              {/* Show only status on mobile */}
              <div className="block md:hidden text-center text-xs font-bold">
                {/* {record?.status || ""} */}
              </div>
              {/* Detailed view for larger screens */}
              {record && (
                <div className="hidden md:block text-xs md:justify-center">
                  {/* {record.checkIn && (
                    <div className="truncate">In: {record.checkIn}</div>
                  )}
                  {record.checkOut && (
                    <div className="truncate">Out: {record.checkOut}</div>
                  )} */}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Day Details */}
      {selectedDay && (
        <div className="mt-4 p-4 border-t text-sm md:text-base">
          <h3 className="font-medium mb-2">
            {month.toLocaleString("default", { month: "long" })} {selectedDay}
          </h3>
          {(() => {
            const record = getAttendanceRecord(selectedDay);
            if (!record)
              return <p className="text-gray-500">No attendance record</p>;
            return (
              <div className="space-y-1">
                <p>
                  Status: <span className="capitalize">{record.status}</span>
                </p>
                <p>Check-in: {record.checkIn || "Not recorded"}</p>
                <p>Check-out: {record.checkOut || "Not recorded"}</p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

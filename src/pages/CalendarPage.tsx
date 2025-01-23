import React, { useState, useEffect } from "react";
import AttendanceCalendar from "../components/AttendanceCalendar";
import { AttendanceRecord } from "../types";

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    fetchAttendanceHistory();
  }, [currentMonth]);

  const fetchAttendanceHistory = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token is missing. Please log in again.");
      return;
    }

    const payload = {
      month: currentMonth.getMonth() + 1, // JavaScript months are 0-based
      year: currentMonth.getFullYear(),
    };

    try {
      const response = await fetch(
        "https://development2.promena.in/api/Attendance/GetAttendanceHistory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "text/plain",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Attendance History:", responseData);

        const formattedRecords = responseData.data.attendance.map((record: any) => ({
          date: record.attendanceDate.split("T")[0],
          checkIn: record.checkInTime,
          checkOut: record.checkOutTime,
          status: record.status ? "present" : "absent",
        }));

        setAttendanceRecords(formattedRecords);
      } else {
        console.error("Failed to fetch attendance history.");
      }
    } catch (error) {
      console.error("Error fetching attendance history:", error);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Attendance Calendar</h1>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="px-4 py-2 bg-blue-600 text-white rounded-md transform transition duration-300 ease-in-out hover:bg-blue-700 hover:scale-105 hover:shadow-lg hover:text-white"
          >
            Previous
          </button>
          <button
  onClick={handleNextMonth}
  className="px-4 py-2 bg-blue-600 text-white rounded-md transform transition duration-300 ease-in-out hover:bg-blue-700 hover:scale-105 hover:shadow-lg hover:text-white"
>
  Next
</button>

        </div>
      </div>
      <AttendanceCalendar
        month={currentMonth}
        attendanceRecords={attendanceRecords}
      />
    </div>
  );
}

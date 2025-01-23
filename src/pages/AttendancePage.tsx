import React, { useState, useEffect } from "react";
import AttendanceCard from "../components/AttendanceCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function AttendancePage() {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = () => {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve token from local storage
  
    if (!accessToken) {
      toast.info("Access token is missing. Please log in again.");
      return;
    }
  
    if (!navigator.geolocation) {
      toast.info("Geolocation is not supported by your browser.");
      return;
    }
  
    const today = new Date().toISOString().split("T")[0]; // Current date (YYYY-MM-DD)
    const lastCheckInDate = localStorage.getItem("checkInDate");
  
    if (lastCheckInDate === today) {
      toast.warning("You have already checked in today.");
      return;
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const attendanceDate = new Date().toISOString(); // Current date in ISO format
  
        const now = new Date();
        const checkInTime = now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        const payload = {
          attendanceDate: attendanceDate,
          checkInTime: checkInTime,
          status: true,
          latitude,
          longitude,
        };
  
        fetch("https://development2.promena.in/api/Attendance/MarkAttendance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "text/plain",
            Authorization: `Bearer ${accessToken}`, // Include token in Authorization header
          },
          body: JSON.stringify(payload),
        })
          .then((response) => {
            if (response.ok) {
              localStorage.setItem("checkInDate", today); // Store today's date
              setCheckedIn(true);
              toast.success("Check-in successful!");
            } else {
              toast.error("Failed to record attendance. Please try again.");
            }
          })
          .catch((error) => {
            console.error("Error recording attendance:", error);
            toast.error("An error occurred while recording attendance.");
          });
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Failed to get your location. Please enable location services.");
      }
    );
  };
  
  const handleCheckOut = () => {
    const accessToken = localStorage.getItem("accessToken"); // Retrieve token from local storage
  
    if (!accessToken) {
      toast.error("Access token is missing. Please log in again.");
      return;
    }
  
    const today = new Date().toISOString().split("T")[0]; // Current date (YYYY-MM-DD)
    const lastCheckOutDate = localStorage.getItem("checkOutDate");
  
    if (lastCheckOutDate === today) {
      toast.warning("You have already checked out today.");
      return;
    }
  
    const attendanceDate = new Date().toISOString(); // Current date in ISO format
    const now = new Date();
    const checkOutTime = now.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  
    const payload = {
      attendanceDate: attendanceDate,
      checkOutTime: checkOutTime,
    };
  
    fetch("https://development2.promena.in/api/Attendance/CheckOut", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "text/plain",
        Authorization: `Bearer ${accessToken}`, // Include token in Authorization header
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          localStorage.setItem("checkOutDate", today); // Store today's date
          setCheckedOut(true);
          toast.success("Check-out successful!");
        } else {
          toast.error("Failed to record check-out. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error recording check-out:", error);
        toast.info("An error occurred while recording check-out.");
      });
  };

//   const today = new Date().toISOString().split("T")[0];
// const checkInDisabled = localStorage.getItem("checkInDate") === today;
// const checkOutDisabled = localStorage.getItem("checkOutDate") === today;
  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Attendance Dashboard</h1>
      <div className="max-w-md mx-auto">
        <AttendanceCard
          onCheckIn={handleCheckIn}
          onCheckOut={handleCheckOut}
          checkedIn={checkedIn}
          checkedOut={checkedOut}
          currentTime={currentTime}
        />
      </div>
    </div>
  );
}

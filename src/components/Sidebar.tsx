import React, { useState } from "react";
import { Calendar, Clock, User, FileText, X, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  const links = [
    { icon: Clock, label: "Attendance", path: "/" },
    { icon: Calendar, label: "Calendar", path: "/calendar" },
    { icon: FileText, label: "Leave", path: "/leave" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        className="fixed top-2 left-2 z-50 bg-blue-600 text-white p-2 rounded-full shadow-lg sm:hidden"
        onClick={() => setIsVisible(!isVisible)}
      >
         {isVisible ? <X className=" w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg border-r border-gray-100 transform transition-transform duration-300 sm:translate-x-0 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "16rem" }}
      >
        {/* Sidebar Header */}
        <div className="p-9 flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600">
          <h1 className="text-2xl font-bold text-white">Employee Portal</h1>
        </div>


        {/* Sidebar Links */}
        <nav className="mt-6">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200 ${
                  isActive ? "bg-blue-50 border-r-4 border-blue-600 text-blue-600" : ""
                }`}
              >
                <Icon
                  className={`w-5 h-5 mr-3 ${
                    isActive ? "text-blue-600" : "text-gray-400"
                  }`}
                />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}

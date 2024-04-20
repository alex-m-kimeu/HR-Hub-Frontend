import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const LeaveEmployee = () => {
    const [formData, setFormData] = useState({
      leaveType: "",
      startDate: "",
      endDate: "",
    });
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalLeaveDays, setTotalLeaveDays] = useState(30);
    const [remainingLeaveDays, setRemainingLeaveDays] = useState(30);
    const [leave, setLeave] = useState([]); // Added state for leave data
    const [leaveType, setLeaveType] = useState("");
    const [employeeId, setEmployeeId] = useState(null);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const id = decodedToken.employee_id; 
        setEmployeeId(id);
      }
    }, []);

useEffect(() => {
  if (employeeId) {
    const token = localStorage.getItem("token");

    fetch(`https://hr-hub-backend.onrender.com/leave/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }
      return resp.json();
    })
    .then((data) => {
      console.log("GET request successful:", data);
      setLeave(data);
    })
    .catch((error) => {
      console.error("There has been a problem with the GET request:", error);
    });
  }
}, [employeeId]);


function handleChange(event) {
  setFormData({
    ...formData,
    [event.target.id]: event.target.value,
  });
}
  
function handleSubmit(event) {
  event.preventDefault();
 
  const token = localStorage.getItem("token");

  fetch('https://hr-hub-backend.onrender.com/leaves', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("POST request successful");
      // Handle success, if needed
    })
    .catch((error) => {
      console.error("There has been a problem with your POST request:", error);
      // Handle error, if needed
    });
}


    useEffect(() => {
      if (startDate && endDate) {
        const diffTime = Math.abs(new Date(endDate) - new Date(startDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setTotalLeaveDays(30 - diffDays);
      }
    }, [startDate, endDate]);


  return (
    <div className="container mx-auto">
      <div className="mt-10">
        <h1 className="text-Heading text-[30px] font-bold">
          My Leave Applications
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="text-[18px] font-normal bg-secondary text-white">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Employee</th>
                <th className="py-2 px-4">Start Date</th>
                <th className="py-2 px-4">End Date</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {leave.map((item, index) => (
                <tr key={index} className="bg-gray-100">
                  <td className="py-2 px-4">{item.id}</td>
                  <td className="py-2 px-4">{item.employee}</td>
                  <td className="py-2 px-4">{item.startDate}</td>
                  <td className="py-2 px-4">{item.endDate}</td>
                  <td className="py-2 px-4">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
        <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-96">
          <h2 className="text-2xl mb-2 font-bold text-Heading">
            Leave Application
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="leaveType" className="block font-semibold">
                Leave Type
              </label>
              <select
                id="leaveType"
                value={formData.leaveType} 
                onChange={handleChange}
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                required
              >
                <option value="">Select Leave Type</option>
                <option value="sickLeave">Sick Leave</option>
                <option value="vacationLeave">Vacation Leave</option>
                <option value="casualLeave">Casual Leave</option>
              </select>
            </div>
            <div>
              <label htmlFor="startDate" className="block font-semibold">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block font-semibold">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-secondary text-white px-6 py-3 rounded-md text-center"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-96">
          <h2 className="text-2xl mb-2 font-bold text-Heading text-center">
            Leave Balance
          </h2>
          <p className="text-lg font-semibold text-center">
            {totalLeaveDays} Days
          </p>
        </div>
      </div>
    </div>
  );
};

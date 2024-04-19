import React, { useState, useEffect } from "react";

import { jwtDecode } from "jwt-decode";

export const LeaveEmployee = () => {
  const [leave, setLeave] = useState([]);
  const [error, setError] = useState(null);
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalLeaveDays, setTotalLeaveDays] = useState(30);
  const [remainingLeaveDays, setRemainingLeaveDays] = useState(30);

 useEffect(() => {
   const token = localStorage.getItem("token");
   const decodedToken = jwtDecode(token);
   const userId = decodedToken.sub.id;

   fetch("http://127.0.0.1:5500/leave", {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   })
     .then((response) => response.json())
     .then((data) => {
       const user = leave.filter((leave) => leave.id === userId);
       setLeave(user);
     })
     .catch((error) => console.error("Error:", error));
 }, []);

 useEffect(() => {
   if (startDate && endDate) {
     const diffTime = Math.abs(endDate - startDate);
     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
     setRemainingLeaveDays(totalLeaveDays - diffDays);
   }
 }, [startDate, endDate, totalLeaveDays]);

 const handleSubmit = async (e) => {
   e.preventDefault();

   const token = localStorage.getItem("token");

   const formData = {
     leaveType: leaveType,
     startDate: startDate,
     endDate: endDate,
   };

   try {
     const response = await fetch("http://127.0.0.1:5500/leave", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify(formData),
     });

     if (!response.ok) {
       throw new Error("Network response was not ok");
     }

     const data = await response.json();
     console.log(data);
   } catch (error) {
     console.error(
       "There has been a problem with your fetch operation:",
       error
     );
   }

   setLeaveType("");
   setStartDate(null);
   setEndDate(null);
 };


  return (
    <div className="Main container">
      <div className="Tables container">
        <div className="table-heading">
          <h1 className="text-Heading text-[30px] font-bold">
            My Applications
          </h1>
        </div>
        <div className="table">
          <table>
            <thead className="text-[18px] font-normal bg-secondary text-white">
              <tr className="border-[6px] border-white">
                <th className="p-[10px]">ID</th>
                <th className="p-[10px]">Employee</th>
                <th className="p-[10px]">Start Date</th>
                <th className="p-[10px]">End Date</th>
                <th className="p-[10px]">Status</th>
              </tr>
            </thead>
            <tbody className="text-[16px] font-normal text-Heading">
              {leave.map((leave, index) => (
                <tr key={index} className="bg-white border-[6px] border-white">
                  <td>{item.id}</td>
                  <td>{item.employee}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-full max-w-3xl flex flex-row space-x-28">
          <div className="mb-8 rounded-lg bg-white shadow-md p-5">
            <h2 className="font-semibold text-center my-4">
              Leave Application
            </h2>
            <form
              onSubmit={handleSubmit}
              className="max-w-md w-full mx-auto px-4"
            >
              <div className="mb-4">
                <select
                  id="leaveType"
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 w-full "
                  required
                >
                  <option value="">Select Leave Type</option>
                  <option value="sickLeave">Sick Leave</option>
                  <option value="vacationLeave">Vacation Leave</option>
                  <option value="casualLeave">Casual Leave</option>
                </select>
              </div>
              <div className="mb-4">
                <input
                  id="startDate"
                  placeholder="Start Date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  type="date"
                  className="border border-gray-300 rounded-md px-3 py-2  w-full"
                  required
                />
                <input
                  id="endDate"
                  placeholder="End Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                  className="border border-gray-300 rounded-md px-3 py-2  w-full"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-secondary text-white px-4 py-2 rounded-md">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="rounded-lg bg-white shadow-md p-4">
            <h1 className="font-semibold text-center my-4">Leave Balance</h1>
            <p className="text-center">{remainingLeaveDays} Days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

//set the leave days to change upon aqproval not when dates are entered later on
// add calendar icon

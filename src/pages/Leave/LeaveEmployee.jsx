import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const LeaveEmployee = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [error, setError] = useState(null);
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalLeaveDays, setTotalLeaveDays] = useState(30);
  const [remainingLeaveDays, setRemainingLeaveDays] = useState(30);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5500/leave", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setLeaveData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLeaveData();
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
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit leave application");
      } else {
        alert("Leave application submitted successfully!");
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Failed to submit leave application. Please try again later.");
    }

    // Reset form fields after submission
    setLeaveType("");
    setStartDate(null);
    setEndDate(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Main container">
      <div className="Tables container">
        <div className="table-heading">
          <h1 className="text lg font-extrabold">My Applications</h1>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map((item) => (
                <tr key={item.id}>
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
                <DatePicker
                  id="startDate"
                  placeholderText="Start Date"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="border border-gray-300 rounded-md px-3 py-2  w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <DatePicker
                  id="endDate"
                  placeholderText="End Date"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="border border-gray-300 rounded-md px-3 py-2  w-full"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
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

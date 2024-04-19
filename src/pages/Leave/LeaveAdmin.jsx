import React, { useState, useEffect } from "react";

export const LeaveAdmin = () => {
  const [leave, setLeave] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:5500/", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLeave(data);
      })
      .catch((error) => console.error("Error fetching Leave Data:", error));
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mt-10">
        <h1 className="text-3xl font-bold mb-6">Leave</h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-secondary text-white">
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Employee</th>
                <th className="py-2 px-4">Start Date</th>
                <th className="py-2 px-4">End Date</th>
                <th className="py-2 px-4">Actions</th>{" "}
                {/* Changed from Status to Actions */}
              </tr>
            </thead>
            <tbody>
              {leave.map((item, index) => (
                <tr key={index} className="bg-white">
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
    </div>
  );
};


    /* <button
          type="button"
          className="my-3 bg-slate-200 rounded-xl p-2"
          onClick={() => setShowForm(!showForm)}
        >
          Create time off
        </button>*/
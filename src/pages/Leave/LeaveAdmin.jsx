import React, { useState, useEffect } from "react";

export const LeaveAdmin = () => {
    const [leave, setleave] = useState([]);
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
          setleave(data);
          
        })
        .catch((error) => console.error("Error fetching Leave Data:", error));
    }, []);

   


  return (
    <div>
      <div>
        <h1 className="text-Heading text-[30px] font-bold">Leave</h1>
        <button type="button" className="my-3 bg-slate-200 rounded-xl p-2">
          Create time off
        </button>
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
    </div>
  );
};


//change .status to actions in the table head
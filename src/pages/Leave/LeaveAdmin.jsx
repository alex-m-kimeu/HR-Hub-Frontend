import React, { useState, useEffect } from "react";

export const LeaveAdmin = () => {
    const [leave, setLeave] = useState([]);
    
  
   useEffect(() => {
       const token = localStorage.getItem("token");


     fetch("http://127.0.0.1:5500/leave", {
       headers: {
         Authorization: "Bearer " + token,
       },
     })
       .then((response) => response.json())
       .then((data) => {
         const user = data.find((leave) => leave.id === userId);
         setLeave(user);
       })
       .catch((error) => console.error("Error:", error));
   }, []);
    
  return (
    <div>
      <div>
        <h1 className="font-bold text-lg my-5">Leave</h1>
        <button type="button" className="my-3 bg-slate-200 rounded-xl p-2">
          Create time off
        </button>
        <div className="table">
          <table>
            <thead className="space-x-3">
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leave.map((item) => (
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
    </div>
  );
};


//change .status to actions in the table head
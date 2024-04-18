import React, { useState, useEffect } from "react";

export const LeaveAdmin = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5500/leave");
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


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div>
        <h1>Leave</h1>
        <button>Create time off</button>
        <div>
          <table>
            <thead>
              {leaveData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.employee}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};


//change .status to actions in the table head
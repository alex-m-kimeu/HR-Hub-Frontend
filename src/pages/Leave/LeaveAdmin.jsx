import { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";

export const LeaveAdmin = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('https://hr-hub-backend.onrender.com/leaves', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const filteredLeaves = data.filter(leave => leave.status !== 'accepted' && leave.status !== 'rejected');
        setLeaves(filteredLeaves);
      });
  }, []);

  const handleStatusChange = (id, status) => {
    const token = localStorage.getItem('token');

    fetch(`https://hr-hub-backend.onrender.com/leave/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    })
      .then(response => response.json())
      .then(() => {
        setLeaves(leaves.filter(leave => leave.id !== id));
      });
  };
  
  return (
    <div>
      <h1 className="text-Heading dark:text-primary-light font-bold text-2xl text-center lg:text-left py-5">
        Leave Requests
      </h1>
      <div className="md:hidden">
        {leaves.map((leave) => (
          <div
            key={leave.id}
            className="bg-white dark:bg-variant1-dark mb-4 p-4 border-6 border-white dark:border-primary-dark shadow-md"
          >
            <div className="text-[18px] font-body bg-white dark:bg-variant1-dark text-black dark:text-secondary p-2 mb-2">
              Employee: {leave.employee.name}
            </div>
            <div className="text-[18px] font-body bg-white dark:bg-variant1-dark text-black dark:text-secondary p-2 mb-2">
              Leave Type: {leave.leaveType}
            </div>
            <div className="text-[18px] font-body bg-white dark:bg-variant1-dark text-black dark:text-secondary p-2 mb-2">
              Start Date: {leave.startDate}
            </div>
            <div className="text-[18px] font-body bg-white dark:bg-variant1-dark text-black dark:text-secondary p-2 mb-2">
              End Date: {leave.endDate}
            </div>
            <div className="flex justify-center items-center">
              <button
                onClick={() => handleStatusChange(leave.id, "accepted")}
                className="mr-2"
              >
                <FaCheck className="fill-secondary" />
              </button>
              <button onClick={() => handleStatusChange(leave.id, "rejected")}>
                <TiDelete className="fill-Red" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden md:block">
        <table className="w-full mx-auto text-left text-Heading">
          <thead className="text-[18px] font-body bg-secondary dark:bg-variant1-dark text-white dark:text-secondary">
            <tr className="border-[6px] border-white dark:border-primary-dark">
              <th className="p-[10px]">Employee</th>
              <th className="p-[10px]">Leave Type</th>
              <th className="p-[10px]">Start Date</th>
              <th className="p-[10px]">End Date</th>
              <th className="p-[10px] flex justify-center items-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-[16px] font-normal text-Heading dark:text-white">
            {leaves.map((leave) => (
              <tr
                key={leave.id}
                className="bg-white dark:bg-variant1-dark border-[6px] border-white dark:border-primary-dark"
              >
                <td className="p-[10px]">{leave.employee.name}</td>
                <td className="p-[10px]">{leave.leaveType}</td>
                <td className="p-[10px]">{leave.startDate}</td>
                <td className="p-[10px]">{leave.endDate}</td>
                <td className="p-[10px] flex justify-center space-x-4">
                  <button
                    onClick={() => handleStatusChange(leave.id, "accepted")}
                  >
                    <FaCheck className="fill-secondary" />
                  </button>
                  <button
                    onClick={() => handleStatusChange(leave.id, "rejected")}
                  >
                    <TiDelete className="fill-Red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
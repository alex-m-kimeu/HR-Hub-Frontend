import { useState, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { FaCheck } from "react-icons/fa";

export const LeaveAdmin = () => {
  const [leaves, setLeave] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://hr-hub-backend.onrender.com/leaves", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((resp) => resp.json())
      .then((data) => { setLeave(data); console.log(data)})
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit() {
    //patch request
    fetch("https://hr-hub-backend.onrender.com/leave", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Feedback was successful");
        // Handle success, if needed
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your feedback:",
          error
        );
        // Handle error, if needed
      });

  }

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
                <th className="py-2 px-4">Leave Type</th>
                <th className="py-2 px-4">Start Date</th>
                <th className="py-2 px-4">End Date</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(leaves) &&
                leaves.map((item, index) => (
                  <tr key={index} className="bg-gray-100">
                    <td className="py-2 px-4">{item.id}</td>
                    <td className="py-2 px-4">{item.employee}</td>
                    <td className="py-2 px-4">{item.startDate}</td>
                    <td className="py-2 px-4">{item.endDate}</td>
                    <td className="py-2 px-4 space-x-1">
                      <button onClick={handleSubmit}>
                        <FaCheck />
                      </button>
                      <button onClick={handleSubmit}>
                        <TiDelete />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


/*  
 <td className="py-2 px-4 space-x-1">
                    <button onClick={handleSubmit}>
                      <FaCheck />
                    </button>
                    <button onClick={handleSubmit}>
                      <TiDelete />
                    </button>
                  </td>
*/
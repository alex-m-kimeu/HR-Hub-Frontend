import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";

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
                 value={leaveType}
                 onChange={(e) => setLeaveType(e.target.value)}
                 className="border border-gray-300 rounded-md px-4 py-2 w-full"
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
                 className="border border-gray-300 rounded-md px-4 py-2 w-full"
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
                 className="border border-gray-300 rounded-md px-4 py-2 w-full"
                 required
               />
             </div>
             <button
               type="submit"
               className="bg-secondary text-white px-6 py-3 rounded-md items-center"
             >
               Submit
             </button>
           </form>
         </div>

         <div className="bg-white rounded-lg shadow-md p-4 w-full md:w-96">
           <h2 className="text-2xl mb-2 font-bold text-Heading text-center">
             Leave Balance
           </h2>
           <p className="text-lg font-semibold text-center">{remainingLeaveDays} Days</p>
         </div>
       </div>
     </div>
   );

};

//set the leave days to change upon aqproval not when dates are entered later on
// add calendar icon

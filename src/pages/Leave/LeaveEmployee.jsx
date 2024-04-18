import React, { useState } from "react";

export const LeaveEmployee = () => {
    const [leaveData, setLeaveData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchLeaveData = async () => {
        try {
          const response = await fetch("#api");
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
         <h1 className="text lg font-extrabold">My Applications</h1>
         <button type="">Create time off</button>
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
         <div>
           <h1>leave Application</h1>
           <form>
             <input id="leave Type" type="text" placeholder="Leave Type" />
             <input id="Start Date" type="text" placeholder="Start date" />
             <input id="End Date" type="text" placeholder="End date" />
             <button type="submit">Submit</button>
           </form>

           <h1>Leave balance</h1>
         </div>
       </div>
     </div>
   );
};
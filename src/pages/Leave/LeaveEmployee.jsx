import React, { useState } from "react";

export const LeaveEmployee = () => {
   return (
     <div>
       <div>
         <h1 className="text lg font-extrabold">My Applications</h1>
         <button type="">Create time off</button>
         <div>
           <table>
             <thead>
               <tr className="">
                 <th>ID</th>
                 <th>Employee</th>
                 <th>Start date</th>
                 <th>End Date</th>
                 <th>Status</th>
               </tr>
             </thead>
           </table>
         </div>
         <div>
           <h1>leave Application</h1>
           <form>
             <input id="leave Type"type="text" placeholder="Leave Type" />
             <input id="Start Date" type="text" placeholder="Start date" />
             <input id ="End Date"type="text" placeholder="End date" />
             <button type="submit">Submit</button>
                   </form>
                   <h1>Leave balance</h1>

         </div>
       </div>
     </div>
   );
};
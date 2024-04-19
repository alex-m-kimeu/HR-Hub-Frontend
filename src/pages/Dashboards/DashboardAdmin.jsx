import { useEffect, useState } from "react";
import { IoIosPeople } from "react-icons/io";

export const DashboardAdmin = () => {
  const [employees, setEmployees] = useState([]);
  const [employeesOnLeave, setEmployeesOnLeave] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch("https://hr-hub-backend.onrender.com/employees", {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
      .then(response => response.json())
      .then(data => {
        setEmployees(data);
        const onLeave = data.filter(employee => employee.leaves.length > 0).length;
        setEmployeesOnLeave(onLeave);
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  return (
    <div className="font-body flex flex-col gap-[50px]">
      <div className=" flex flex-col gap-[50px]">
        <h1 className="text-Heading text-[30px] font-bold">Welcome to HR-Hub</h1>
        <div className="flex gap-[80px]">
          <div className="flex flex-col gap-[10px] p-[10px] bg-variant1-light rounded-[10px]">
            <h2 className="text-[20px] font-bold">EMPLOYEES</h2>
            <div className="flex justify-center">
              <span className="flex gap-[5px]">
                <IoIosPeople className="text-secondary w-[40px] h-[40px]" />
                <div className="flex justify-center items-center text-Heading text-[20px]">
                  {employees.length}
                </div>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[10px] p-[10px] bg-variant1-light rounded-[10px]">
            <h2 className="text-[20px] font-bold">ON LEAVE</h2>
            <div className="flex justify-center">
              <span className="flex gap-[5px]"><IoIosPeople className="text-secondary w-[40px] h-[40px]" />
                <div className="flex justify-center items-center text-Heading text-[20px]">
                  {employeesOnLeave}
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <table className="w-full mx-auto text-left text-Heading">
        <thead className="text-[18px] font-normal bg-secondary text-white">
          <tr className="border-[6px] border-white">
            <th className="p-[10px]">Employee</th>
            <th className="p-[10px]">Department</th>
            <th className="p-[10px]">Status</th>
          </tr>
        </thead>
        <tbody className="text-[16px] font-normal text-Heading">
          {employees.map((employee, index) => (
            <tr key={index} className="bg-white border-[6px] border-white">
              <td className="p-[10px]">{employee.name}</td>
              <td className="p-[10px]">{employee.department}</td>
              <td className="p-[10px]">{employee.leaves.length > 0 ? 'On Leave' : 'In Office'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
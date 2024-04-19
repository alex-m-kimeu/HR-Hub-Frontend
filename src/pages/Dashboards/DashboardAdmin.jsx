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
    <div className="font-body flex flex-col gap-[15px] lg:gap-[20px] text-center lg:text-left items-center lg:items-start mt-3 lg:mt-0">
      <div className=" flex flex-col gap-[10px] lg:gap-[20px]">
        <h1 className="text-Heading text-2xl font-bold dark:text-variant1-light">Welcome to HR-Hub</h1>
        <div className="flex gap-[80px]">
          <div className="flex flex-col gap-[10px] p-[10px] bg-variant1-light dark:bg-variant1-dark rounded-[10px]">
            <h2 className="text-xl font-bold text-Heading dark:text-variant1-light">Employees</h2>
            <div className="flex justify-center">
              <span className="flex gap-[5px]">
                <IoIosPeople className="text-secondary w-[40px] h-[40px]" />
                <div className="flex justify-center items-center text-Heading dark:text-variant1-light text-[20px]">
                  {employees.length}
                </div>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[10px] p-[10px] bg-variant1-light dark:bg-variant1-dark rounded-[10px]">
            <h2 className="text-xl font-bold text-Heading dark:text-variant1-light">On Leave</h2>
            <div className="flex justify-center">
              <span className="flex gap-[5px]"><IoIosPeople className="text-secondary w-[40px] h-[40px]" />
                <div className="flex justify-center items-center text-Heading dark:text-variant1-light text-[20px]">
                  {employeesOnLeave}
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <table className="w-full mx-auto text-left">
        <thead className="text-sm lg:text-md font-bold bg-secondary text-white">
          <tr className="dark:border-primary-dark">
            <th className="px-[10px] py-[5px] border-r border-gray-400">Employee</th>
            <th className="px-[10px] py-[5px] border-r border-gray-400">Department</th>
            <th className="px-[10px] py-[5px]">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm lg:text-md font-medium text-Heading">
          {employees.map((employee, index) => (
            <tr key={index}
              className="dark:border-primary-dark dark:bg-primary-dark dark:text-white">
              <td className="px-[10px] py-[5px] border-r border-gray-400">{employee.name}</td>
              <td className="px-[10px] py-[5px] border-r border-gray-400">{employee.department}</td>
              <td className={`px-[10px] py-[5px] ${employee.leaves.length > 0 ? 'text-Red' : 'text-secondary'}`}>
                {employee.leaves.length > 0 ? 'Leave' : 'Office'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
import { useEffect } from "react";
import { useState } from "react";

export const DashboardAdmin = () => {
    const [employees, setEmployees] = useState([]);
    const [totalEmployees, setTotalEmployees] = useState(0);
  
    useEffect(() => {
      // Fetch employees data
      fetch("http://127.0.0.1:5500/employees")
        .then(response => response.json())
        .then(data => {
          setEmployees(data);
          setTotalEmployees(data.length);
        })
        .catch(error => console.error('Error fetching employees:', error));
    }, []);
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to HR Hub</h1>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow-md rounded p-4">
            <h2 className="text-xl font-semibold mb-2">Employees</h2>
            <p className="text-2xl font-bold">{totalEmployees}</p>
          </div>
        </div>
  
        <div className="bg-white shadow-md rounded my-6">
          <ul className="divide-y divide-gray-200">
            {employees.map((employee) => (
              <li key={employee.id} className="py-4 flex">
                <div className="flex-1">
                  <p className="font-semibold">{employee.name}</p>
                  <p className="text-sm text-gray-500">{employee.department}</p>
                </div>
                <span className={`ml-2 px-3 py-1 text-xs font-bold rounded-full ${employee.status === 'In Office' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {employee.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
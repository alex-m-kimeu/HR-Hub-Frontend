/* eslint-disable react/prop-types */
import { EmployeeTable } from "./EmployeeTable";
import { EmployeeCard } from "./EmployeeCard";

export const EmployeesList = ({ employees, onDelete }) => {
  return (
    <div className="flex min-h-screen pb-12 ">
      <div className="relative overflow-x-auto w-full">
        <div className="sm:hidden flex flex-wrap justify-center gap-4">
          {employees.map((employee) => {
            return <EmployeeCard key={employee.id} employee={employee} onDelete={onDelete} />;
          })}
        </div>
        <table className="hidden sm:table w-full mx-auto text-left font-sans text-Heading">
          <thead className="text-[18px] font-body bg-secondary text-white">
            <tr className="border-[6px] border-white">
              <th className="p-[10px]" >ID</th>
              <th className="p-[10px]" >Employee</th>
              <th className="p-[10px]" >Email Address</th>
              <th className="p-[10px]" >Department</th>
              <th className="p-[10px]" >Role</th>
              <th className="p-[10px]" >Actions</th>
            </tr>
          </thead>
          <tbody className="text-[16px] font-normal text-[#2d2e2e]">
            {employees.map((employee) => {
              return <EmployeeTable key={employee.id} employee={employee} onDelete={onDelete} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
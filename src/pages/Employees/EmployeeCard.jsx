export const EmployeeCard = ({ employee, onDelete }) => {
    return (
      <div className="bg-white dark:bg-dark1 shadow-lg rounded-lg p-4 mb-4 flex flex-col items-center text-center w-64 h-92">
        <img src={employee.image} alt={employee.name} className="w-24 h-24 rounded-full object-cover mb-4" />
        <h2 className="text-dark dark:text-green font-sans font-medium text-lg mb-2">
          {employee.name}
        </h2>
        <p className="text-sm mb-2 text-dark dark:text-white">Email: {employee.email}</p>
        <p className="text-sm mb-2 text-dark dark:text-white">Department: {employee.department}</p>
        <p className="text-sm mb-2 text-dark dark:text-white">Role: {employee.role}</p>
        <button onClick={() => onDelete(employee.id)} className="mt-4 bg-red-500 text-white rounded px-2 py-1">Delete</button>
      </div>
    );
  };
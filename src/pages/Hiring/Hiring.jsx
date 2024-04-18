import React, { useState } from 'react';
import axios from 'axios';
import hiringImage from '../../assets/hiring.png'

export const Hiring = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5500/', employee)
      .then(response => {
        console.log('Response from server:', response.data);
        setEmployee({
          name: '',
          email: '',
          department: '',
          role: '',
          password: ''
        });
      })
      .catch(error => {
        console.error('Error submitting data:', error);
      });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md">
        <img src={hiringImage}alt="Logo" className="mx-auto mb-4" />
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-2xl text-center font-bold mb-4 text-Heading">Hiring</h2>
          <h3 className="text-lg text-center font-bold mb-4 text-Heading">Add new hire</h3>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Employee's Name"
              value={employee.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={employee.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={employee.department}
              onChange={handleChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={employee.role}
              onChange={handleChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={employee.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <button type="submit" className="bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

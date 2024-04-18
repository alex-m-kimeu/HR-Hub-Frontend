import { useState } from 'react';
import hiringImage from '../../assets/hiring.png';

export const Hiring = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    role: 'employee',
    password: '',
    image: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((formData) => ({ ...formData, [id]: value }));
  };

  function handleSubmit(e) {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
  
    fetch("http://127.0.0.1:5500/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }
      return resp.json();
    })
    .then((data) => {
      // Do something with the response data
      console.log(data);
    })
    .catch((error) => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  
    setFormData({
      name: "",
      email: "",
      department: "",
      role: "employee",
      password: '',
      image: ""
    })
  }

  return (
    <div className="flex justify-center items-center">
      <div className=" max-w-md">
        <div className="flex items-center justify-center mb-[20px]">
          <img src={hiringImage} alt="Hiring" className="w-[40px] h-[40px] mr-4" />
          <h1 className="text-4xl font-bold text-Heading">Hiring</h1>
        </div>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-10 pb-8">
          <h3 className="text-lg text-center font-bold mb-4 text-Heading">Add new hire</h3>
          <div className="flex flex-col space-y-4">
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Employee's Name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <input
              id="department"
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <select
              id="role"
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="employee">employee</option>
              <option value="admin">admin</option>
            </select>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <input
              id="image"
              type="text"
              name="image"
              placeholder="Image Url"
              value={formData.image}
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

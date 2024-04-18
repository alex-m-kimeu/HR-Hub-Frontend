import home from '/src/assets/home.png'
import leave from '/src/assets/leave.png'
import reviews from '/src/assets/reviews.png'
import logo from '/src/assets/logo.png'
import darkmode from '/src/assets/darkmode.png'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const SidebarEmployee = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.sub.id;

    fetch('http://127.0.0.1:5500/employees', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        const user = data.find(employee => employee.id === userId);
        setEmployee(user);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className='bg-variant1-light w-[245px] h-screen flex flex-col p-[20px] justify-between font-body'>
      <div className='gap-[50px] '>
        <div className='flex flex-col items-center gap-[20px]'>
          <img src={logo} alt="logo" className="w-[130px] h-[64px] max-w-full" />
          <hr className='border-[1px] border-secondary w-full' />
        </div>
        <div className='flex flex-col gap-[20px] py-[30px] '>
          <h1 className="text- font-bold font-body">
            EMPLOYEE
          </h1>
          <div>
            <ul className='flex flex-col gap-[25px]'>
              <li>
                <Link to="/employee/dashboard" className='flex gap-[10px]  hover:text-secondary active:text-secondary'>
                  <img src={home} alt="" className='w-7 h-7' />
                  <span className='pt-1 text-[15px]'>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/employee/leave" className='flex gap-[10px]  hover:text-secondary active:text-secondary'>
                  <img src={leave} alt="" className='w-7 h-7' />
                  <span className='pt-1 text-[15px]'>Leave</span>
                </Link>
              </li>
              <li>
                <Link to="/employee/reviews" className='flex gap-[10px]  hover:text-secondary active:text-secondary'>
                  <img src={reviews} alt="" className='w-7 h-7' />
                  <span className='pt-1 text-[15px]'>Reviews</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='p-[5px] flex flex-col gap-[20px]'>
        <div className='flex ml-2 -mb-4 '>
          {employee ? (
            <div className='flex gap-[15px] p-[10px]'>
              <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                <img src={employee.image} alt={employee.name} className="w-full h-full object-cover" />
              </div>
              <div className='flex flex-col gap-[8px]'>
                <h1 className='text-[16px] font-bold text-Heading '>{employee.name}</h1>
                <h1 className='text-[11px] font-bold text-Heading'>{employee.department}</h1>
              </div>

            </div>
          ) : (
            <div>
              <p className='text-secondary text-sm'>Loading...</p>
            </div>
          )}
        </div>
        <div className='flex gap-[30px]'>
          <span className='flex flex-row items-center justify-center gap-[5px] text-[15px]'>
            <img className='w-[30px] h-[30px]' src={darkmode} alt="darkmode" />
            Dark
          </span>
          <button className='bg-secondary text-black hover:cursor-pointer hover:text-white px-[10px] py-[5px] rounded-[5px] text-[15px]' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

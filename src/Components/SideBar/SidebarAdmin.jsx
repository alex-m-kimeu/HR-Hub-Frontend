import home from '/src/assets/home.png'
import hiring from '/src/assets/hiring.png'
import leave from '/src/assets/leave.png'
import reviews from '/src/assets/reviews.png'
import employees from '/src/assets/employees.png'
import logo from '/src/assets/logo.png'
import darkmode from '/src/assets/darkmode.png'
import { Link } from 'react-router-dom'

export const SidebarAdmin = () => {
  return (
    <div className='h-screen '>
      <div className="h-screen flex  item-end justify-end px-4 pb-6">

        <div>
          <div className="p-6">
            <div className='w-[102px] h-[64px] -mt-7 -ml-1'>
              {/* logo */}
              <img src={logo} alt="" />
            </div>

            <div className="border border-secondary -ml-5 mb-14 mt-5"></div>

            <div className="flex items-center gap-4 pg-4">
              <h2 className="text- font-bold font-body">
                ADMINISTRATOR
              </h2>
            </div>
            <div className="-mt-5 -mx-6 relative overflow-x-hidden h-[85v ">
              <ul className="space-y-4 mb-12 px-4 mt-8">
                <li>
                  <Link to="/admin/dashboard" className="flex -mt-1 text-sm gap-2  font-body hover:text-secondary active:text-secondary transition">
                    <img src={home} alt="" className='w-7 h-7' />
                    <span className='pt-1'>Dashboard</span>
                  </Link>
                </li>

                <li>
                  <Link to="/employees" className="flex -mt-1 text-sm gap-2 font-body hover:text-secondary active:text-secondary transition">
                    <img src={employees} alt="" className='w-7 h-7' />
                    <span className='pt-1'>Employees</span>
                  </Link>
                </li>
                <li>
                  <Link to="/hiring" className="flex -mt-1  text-sm gap-2 font-body hover:text-secondary active:text-secondary transition">
                    <img src={hiring} alt="" className='w-7 h-7' />
                    <span className='pt-1'>Hiring</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/leave" className="flex -mt-1  text-sm gap-2 font-body hover:text-secondary active:text-secondary transition">
                    <img src={leave} alt="" className='w-7 h-7' />
                    <span className='pt-1'>Leave</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/reviews" className="flex -mt-1  text-sm gap-2 font-body hover:text-secondary active:text-secondary transition">
                    <img src={reviews} alt="" className='w-7 h-7' />
                    <span className='pt-1'>Reviews</span>
                  </Link>
                </li>
              </ul>
            </div>


          </div>
          <div className='flex flex-col'>
            <div className='flex ml-2 -mb-4 '>
              <div className='bg-gray-500 rounded-full w-14 h-14 mx-2 my-4'></div>
              <div className='flex flex-col mt-5 ml-2'>
                <div className='font-bold  font-body'>Alice Brown</div>
                <div className='font-body'> HR</div>
              </div>
            </div>
            <div className='flex gap-7 justify-between '>
              <div className='flex '>
                <div className='flex'>
                  <img src={darkmode} alt="" className='w-10 h-10 mt-5 ml-6' />
                  <span className='my-7 font-body text-md'>dark</span>
                </div>
                <div>
                  <button className='bg-secondary  font-body  mt-6 ml-5 py-1 text-sm px-3 rounded-sm text-black hover:text-white cursor-pointer hover:shadow-2xl'>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

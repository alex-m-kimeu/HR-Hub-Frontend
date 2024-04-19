import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export const DashboardEmployee = () => {
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        const userId = decodedToken.sub.id;
        console.log(userId);

        fetch('https://hr-hub-backend.onrender.com/employees', {
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

    return (
        <div className="flex flex-col items-center justify-center space-y-10 h-screen overflow-auto">
            {employee ? (
                <>
                    <h1 className='text-Heading text-[20px] font-bold'>Welcome {employee.name}</h1>
                    <div className='w-[345px] h-[345px] rounded-[64px] overflow-hidden'>
                        <img className='w-full h-full object-cover' src={employee.image} alt={employee.name} />
                    </div>
                    <button
                        className='bg-secondary text-primary-light px-[10px] py-[10px] rounded-[8px]'
                    >
                        Edit Profile
                    </button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import reviewsImage from '../../assets/reviews.png';

export const ReviewsAdmin = () => {
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
    });
    const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch("http://127.0.0.1:5500/employees", {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then((resp) => resp.json())
            .then((data) => setEmployees(data))
            .catch((err) => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((formData) => ({ ...formData, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token')

        fetch("http://127.0.0.1:5500/reviews", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                employee_id: selectedEmployeeId,
                description: formData.description,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setShowModal(false);
                setFormData({ description: '' });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <div className="flex items-center justify-center mb-4">
                <img src={reviewsImage} alt="Reviews" className="w-10 h-10 mr-4" />
                <h1 className="text-4xl font-bold text-Heading">Reviews</h1>
            </div>
            <div className="flex flex-wrap justify-center gap-[20px]">
                {employees.map(employee => (
                    <div key={employee.id} className="bg-variant1-light rounded-[10px] p-4 flex flex-col items-center text-center w-64 h-92 ">
                        <img src={employee.image} alt={employee.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                        <h2 className="text-Heading font-bold text-lg mb-2">{employee.name}</h2>
                        <p className="text-sm mb-2 text-Heading">{employee.department}</p>
                        <button
                            className="bg-secondary text-white px-[10px] py-[5px] rounded-[10px]" onClick={() => { setShowModal(true); setSelectedEmployeeId(employee.id); }}>
                            Add Review
                        </button>
                    </div>
                ))}
            </div>
            {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-0">
                    <div className="bg-white p-4 rounded shadow-lg max-w-full sm:max-w-md w-full">
                        <h2 className="mb-2 text-2xl font-bold text-center text-Heading">Add Review</h2>
                        <form onSubmit={handleSubmit}>
                            <textarea id="description" value={formData.description} onChange={handleChange} className="w-full mb-2 p-2 border rounded focus:outline-none"></textarea>
                            <div className="flex justify-end gap-2">
                                <button type="submit" className="bg-secondary text-white px-4 py-2 rounded hover:cursor-pointer">Submit</button>
                                <button type="button" onClick={() => setShowModal(false)} className="bg-variant1-light px-4 py-2 rounded hover:cursor-pointer">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
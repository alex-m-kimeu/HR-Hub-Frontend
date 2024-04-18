import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import reviewsImage from '../../assets/reviews.png';

export const ReviewsAdmin = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    })
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newReview, setNewReview] = useState(""); // State to store the new review text
    const [error, setError] = useState(null); // State to store error messages

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("Token not found");
            setLoading(false);
            return;
        }

        fetch('http://127.0.0.1:5500/reviews', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setReviews(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch Error:', error);
                setLoading(false);
                setError('Failed to fetch reviews');
            });
    }, []);

    const handleAddReview = () => {
        setShowModal(true);
    };

    const handleSubmitReview = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("Token not found");
            return;
        }

        fetch("http://127.0.0.1:5500/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setReviews([...reviews, data]);
                setShowModal(false);
                setNewReview("");
            })
            .catch(error => {
                console.error('Submit Error:', error);
                setError('Failed to submit review');
            });
    };

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center space-y-10 h-screen o">
            <div className="flex items-center justify-center mb-[20px]">
                <img src={reviewsImage} alt="Reviews" className="w-[40px] h-[40px] mr-4" />
                <h1 className="text-4xl font-bold text-Heading">Reviews</h1>
            </div>
            {/* Review Form */}
            <form onSubmit={handleSubmitReview} className="bg-white shadow-md rounded px-8 pt-10 pb-8w-full max-w-md">
                <div className="flex flex-col space-y-4">
                    <input
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter employee's id..."
                        rows="2"
                        value={formData.id}
                        onChange={(e) => setNewReview(e.target.value)}
                    ></input>
                    <input
                        className="w-full p-2 border rounded-md"
                        placeholder="Enter your review..."
                        rows="2"
                        value={formData.reviews}
                        onChange={(e) => setNewReview(e.target.value)}
                    ></input>
                    <button
                        type="submit"
                        className="bg-secondary text-primary-light px-4 py-2 rounded-md"
                    >
                        Submit
                    </button>
                </div>
            </form>

            {/* Display reviews */}
            <div className="flex flex-col items-center justify-center space-y-5 mt-4">
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <div key={review.id} className="bg-gray-100 p-4 rounded-md shadow-md">
                            <p className="text-lg font-semibold">{review.text}</p>
                            {/* Add other review details here if needed */}
                        </div>
                    ))
                ) : (
                    <p>No reviews found.</p>
                )}
            </div>
        </div>
    );
};
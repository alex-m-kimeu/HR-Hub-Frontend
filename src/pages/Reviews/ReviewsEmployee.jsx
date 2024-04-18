import { useEffect, useState } from 'react';

export const ReviewsEmployee = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newReview, setNewReview] = useState(""); // State to store the new review text

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetchReviews(token); // Fetch reviews when the component mounts
    }, []);

    const fetchReviews = (token) => {
        fetch('http://127.0.0.1:5500/reviews', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setReviews(data);
            setLoading(false);
        })
        .catch(error => console.error('Error:', error));
    };

    const handleAddReview = () => {
        setShowModal(true);
    };

    const handleSubmitReview = () => {
        const token = localStorage.getItem('token');

        fetch('http://127.0.0.1:5500/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text: newReview }) // Send the new review text
        })
        .then(response => response.json())
        .then(data => {
            console.log("Data returned from backend:", data); // Log the data returned from backend
            
            // Update the reviews state with the new review
            setReviews([...reviews, { id: data.id, text: data.text }]);
            setShowModal(false); // Close the modal
            setNewReview(""); // Clear the new review text
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-10 h-screen overflow-auto">
            <h1 className='text-Heading text-[20px] font-bold'>Reviews</h1>
            
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="flex flex-col items-center justify-center space-y-5">
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <div key={review.id} className="bg-gray-100 p-4 rounded-md shadow-md">
                                <p className="text-lg font-semibold">{review.text}</p>
                                {/* Add other review details here */}
                            </div>
                        ))
                    ) : (
                        <p>No reviews found.</p>
                    )}
                </div>
            )}

            <button
                className='bg-secondary text-primary-light px-[10px] py-[10px] rounded-[8px]'
                onClick={handleAddReview}
            >
                Add New Review
            </button>

            {/* Modal for adding a review */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={() => setShowModal(false)}></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg z-10">
                        <h2 className="text-lg font-semibold mb-4">Add Review</h2>
                        <textarea
                            className="w-full p-2 border rounded-md mb-4"
                            placeholder="Enter your review..."
                            rows="4"
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                        ></textarea>
                        <button
                            className="bg-secondary text-primary-light px-4 py-2 rounded-md"
                            onClick={handleSubmitReview}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

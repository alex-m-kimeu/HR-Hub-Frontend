import { useEffect, useState } from 'react';

export const ReviewsEmployee = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetchReviews(token); 
    }, []);

    const fetchReviews = (token) => {
        fetch('https://hr-hub-backend.onrender.com/reviews', {
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

    return (
        <div className="flex flex-col items-center justify-center space-y-10 h-screen overflow-auto px-4 md:px-0 font-body">
            <h1 className='text-2xl md:text-4xl font-bold text-Heading dark:text-primary-light'>My Reviews</h1>
            {loading ? (
                <p className="text-lg md:text-xl text-Heading dark:text-primary-light">Loading...</p>
            ) : (
                <div className="flex flex-col items-center justify-center space-y-5 w-full md:w-1/2">
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <div key={review.id} className="bg-variant1-light dark:bg-variant1-dark p-4 rounded-md w-full">
                                <p className="text-md md:text-lg font-normal text-Heading dark:text-primary-light">{review.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-lg md:text-xl text-Heading dark:text-primary-light">No reviews currently.</p>
                    )}
                </div>
            )}
        </div>
    );
};
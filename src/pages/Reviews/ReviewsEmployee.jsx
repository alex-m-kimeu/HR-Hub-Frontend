import { useEffect, useState } from 'react';

export const ReviewsEmployee = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetchReviews(token); 
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

    return (
        <div className="flex flex-col items-center justify-center space-y-10 h-screen overflow-auto px-4 md:px-0 font-body">
            <h1 className='text-2xl md:text-4xl font-bold text-Heading'>My Reviews</h1>
            {loading ? (
                <p className="text-lg md:text-xl">Loading...</p>
            ) : (
                <div className="flex flex-col items-center justify-center space-y-5 w-full md:w-1/2">
                    {reviews.length > 0 ? (
                        reviews.map(review => (
                            <div key={review.id} className="bg-variant1-light p-4 rounded-md w-full">
                                <p className="text-md md:text-lg font-normal text-Heading">{review.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-lg md:text-xl">No reviews currently.</p>
                    )}
                </div>
            )}
        </div>
    );
};
import React from 'react';
import './ReviewSection.css';
import Review from "./Review/Review"
import reviews from "./Review/ReviewData"

function ReviewSection() {
  const userReviews = reviews.map(review => <Review key={review.user.id} text={review.text}
  user={review.user.name} timestamp={review.timestamp} />)

  return (
    <div className="ReviewSection">
      <h1>Reviews</h1>
      {userReviews}
    </div>
  );
};

export default ReviewSection;

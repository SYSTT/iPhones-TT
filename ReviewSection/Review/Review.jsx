import React from 'react';
import './Review.css';

function Review(props) {
  return (
    <div className="Review">
      <p>{props.text}</p>
      <h3>{props.user}</h3>
      <p>{props.timestamp}</p>
    </div>
  );
};

export default Review;

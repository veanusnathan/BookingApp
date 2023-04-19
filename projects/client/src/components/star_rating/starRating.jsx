import { useState } from "react";

const StarRating = (props) => {
  const [rating, setRating] = useState(0);

  const handleClick = (index) => {
    setRating(index + 1);
    props?.onRatingChange(index + 1)
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`h-6 w-6 fill-current ${
            index < rating ? "text-yellow-400" : "text-gray-400"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={() => handleClick(index)}
        >
          <path d="M10 14.78l-4.24 2.44 1-4.8-3.24-2.81 4.52-.39L10 5.3l1.96 3.92 4.52.39-3.24 2.81 1 4.8L10 14.78z" />
        </svg>
      ))}
      <p className="ml-2">{rating}/5</p>
    </div>
  );
};

export default StarRating;
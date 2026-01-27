import React from 'react'

function StarRating({ rating, onRatingChange, size = 'medium', interactive = false }) {
  const sizes = {
    small: 'text-sm',
    medium: 'text-xl',
    large: 'text-3xl'
  }

  const stars = [1, 2, 3, 4, 5]

  const handleClick = (value) => {
    if (interactive && onRatingChange) {
      // Click same star again to make it half star
      if (rating === value) {
        onRatingChange(value - 0.5)
      } else {
        onRatingChange(value)
      }
    }
  }

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          className={`${sizes[size]} ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-gray-600">
        {rating > 0 ? rating.toFixed(1) : ''}
      </span>
    </div>
  )
}

export default StarRating
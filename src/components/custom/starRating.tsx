"use client"

import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  onRatingChange: (rating: number) => void
}

export function StarRating({ rating, onRatingChange }: StarRatingProps) {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <Star
            key={index}
            className={`cursor-pointer ${
              ratingValue <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onRatingChange(ratingValue)}
          />
        )
      })}
    </div>
  )
}


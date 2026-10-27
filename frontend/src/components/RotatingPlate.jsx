import React, { useState } from 'react';

export default function RotatingPlate({
  src,
  alt = 'Culinary Dish',
  size = 'md', // 'sm' | 'md' | 'lg' | 'hero'
  className = '',
  onClick
}) {
  const [rotationDegrees, setRotationDegrees] = useState(0);
  const [isRotatingBurst, setIsRotatingBurst] = useState(false);

  const handleClick = (e) => {
    setIsRotatingBurst(true);
    setRotationDegrees((prev) => prev + 360);
    setTimeout(() => setIsRotatingBurst(false), 900);
    if (onClick) onClick(e);
  };

  return (
    <div 
      className={`rotating-plate-wrapper plate-size-${size} ${className}`}
      onClick={handleClick}
      title="Click to spin dish!"
    >
      <div className="plate-outer-rim">
        <div 
          className={`plate-inner-dish ${isRotatingBurst ? 'burst-spin' : 'ambient-spin'}`}
          style={{ transform: `rotate(${rotationDegrees}deg)` }}
        >
          <img 
            src={src} 
            alt={alt} 
            className="plate-food-image" 
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80';
            }}
          />
          <div className="plate-glaze-reflection"></div>
        </div>
      </div>
      <div className="plate-depth-shadow"></div>
    </div>
  );
}

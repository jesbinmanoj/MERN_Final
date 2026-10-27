import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, ChefHat, Eye, RotateCw, Sparkles } from 'lucide-react';
import RotatingPlate from './RotatingPlate';
import { getRecipeFoodImage } from '../utils/foodImages';

export default function FeaturedDishShowcase({ recipes = [], onViewDetails }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [spinKey, setSpinKey] = useState(0);

  if (!recipes || recipes.length === 0) return null;

  const currentRecipe = recipes[currentIndex % recipes.length];
  const foodImage = getRecipeFoodImage(currentRecipe.name, currentRecipe.category, currentRecipe.image);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % recipes.length);
    setSpinKey((prev) => prev + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + recipes.length) % recipes.length);
    setSpinKey((prev) => prev + 1);
  };

  const handleManualSpin = () => {
    setSpinKey((prev) => prev + 1);
  };

  return (
    <section className="featured-showcase-section">
      <div className="showcase-card-container">
        {/* Navigation arrows */}
        <button 
          className="showcase-nav-btn nav-prev" 
          onClick={handlePrev} 
          title="Previous Dish"
          aria-label="Previous Dish"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Center phone-like showcase card (inspired by reference design) */}
        <div className="showcase-phone-card">
          {/* Top action dots & indicator */}
          <div className="phone-card-header">
            <span className="live-dish-badge">
              <Sparkles size={13} />
              <span>Interactive 360° Plate</span>
            </span>
            <button 
              className="btn-spin-trigger"
              onClick={handleManualSpin}
              title="Spin Dish"
            >
              <RotateCw size={14} />
              <span>Rotate</span>
            </button>
          </div>

          {/* Large rotating circular plate */}
          <div className="showcase-plate-stage">
            <RotatingPlate
              key={`plate-${currentRecipe._id || currentRecipe.id}-${spinKey}`}
              src={foodImage}
              alt={currentRecipe.name}
              size="hero"
              className="showcase-hero-plate"
            />
          </div>

          {/* Dish details */}
          <div className="phone-card-body">
            <div className="showcase-meta-row">
              <span className="showcase-category">{currentRecipe.category}</span>
              <div className="showcase-time">
                <Clock size={15} />
                <span>{currentRecipe.cookingTime} mins</span>
              </div>
            </div>

            <h3 className="showcase-title">{currentRecipe.name}</h3>

            <p className="showcase-description">
              {currentRecipe.ingredients?.slice(0, 3).join(', ')}
              {currentRecipe.ingredients?.length > 3 ? ' and more...' : ''}
            </p>

            <button 
              className="btn-showcase-action"
              onClick={() => onViewDetails(currentRecipe)}
            >
              <Eye size={17} />
              <span>View Full Recipe</span>
            </button>
          </div>

          {/* Indicator dots */}
          <div className="showcase-dots">
            {recipes.slice(0, 6).map((_, idx) => (
              <span 
                key={idx}
                className={`showcase-dot ${idx === (currentIndex % recipes.length) ? 'dot-active' : ''}`}
                onClick={() => {
                  setCurrentIndex(idx);
                  setSpinKey((prev) => prev + 1);
                }}
              />
            ))}
          </div>
        </div>

        <button 
          className="showcase-nav-btn nav-next" 
          onClick={handleNext} 
          title="Next Dish"
          aria-label="Next Dish"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </section>
  );
}

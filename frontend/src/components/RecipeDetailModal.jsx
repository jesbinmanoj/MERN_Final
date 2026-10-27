import React, { useEffect, useState } from 'react';
import { X, Clock, ChefHat, Check, BookmarkCheck, Edit3, RotateCw } from 'lucide-react';
import RotatingPlate from './RotatingPlate';
import { getRecipeFoodImage } from '../utils/foodImages';

export default function RecipeDetailModal({ recipe, onClose, onEdit }) {
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [spinCount, setSpinCount] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!recipe) return null;

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const foodImage = getRecipeFoodImage(recipe.name, recipe.category, recipe.image);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container detail-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <div className="modal-title-group">
            <div className="detail-tags">
              <span className="category-badge badge-active">{recipe.category}</span>
              <span className="cooking-time-indicator">
                <Clock size={16} />
                <span>{recipe.cookingTime} minutes</span>
              </span>
            </div>
            <h2 className="detail-title">{recipe.name}</h2>
          </div>
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </header>

        {/* Top Dish Showcase with 360° Rotating Plate */}
        <div className="detail-plate-hero">
          <RotatingPlate
            key={`detail-plate-${spinCount}`}
            src={foodImage}
            alt={recipe.name}
            size="lg"
            className="detail-hero-plate"
          />
          <button 
            className="plate-spin-control-btn"
            onClick={() => setSpinCount((c) => c + 1)}
            title="Spin Dish"
          >
            <RotateCw size={14} />
            <span>Click Plate to Spin</span>
          </button>
        </div>

        <div className="modal-scrollable-content detail-content">
          {/* Ingredients Section */}
          <section className="detail-section">
            <div className="section-heading">
              <ChefHat size={18} className="section-icon" />
              <h3>Ingredients</h3>
              <span className="count-pill">{recipe.ingredients?.length || 0} items</span>
            </div>
            <p className="section-hint">Click an ingredient to cross it off as you prepare:</p>
            <ul className="ingredient-list">
              {recipe.ingredients?.map((item, index) => {
                const isChecked = !!checkedIngredients[index];
                return (
                  <li 
                    key={index} 
                    className={`ingredient-item ${isChecked ? 'item-checked' : ''}`}
                    onClick={() => toggleIngredient(index)}
                  >
                    <div className="checkbox-indicator">
                      {isChecked && <Check size={14} />}
                    </div>
                    <span className="ingredient-text">{item}</span>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Preparation Steps Section */}
          <section className="detail-section">
            <div className="section-heading">
              <BookmarkCheck size={18} className="section-icon" />
              <h3>Preparation Steps</h3>
              <span className="count-pill">{recipe.instructions?.length || 0} steps</span>
            </div>
            <ol className="step-list">
              {recipe.instructions?.map((step, index) => (
                <li key={index} className="step-item">
                  <span className="step-number">{index + 1}</span>
                  <div className="step-text-wrap">
                    <p className="step-text">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <footer className="modal-footer">
          <button 
            className="btn-outline" 
            onClick={() => {
              onClose();
              onEdit(recipe);
            }}
          >
            <Edit3 size={16} />
            <span>Edit Recipe</span>
          </button>
          <button className="btn-primary" onClick={onClose}>
            Done
          </button>
        </footer>
      </div>
    </div>
  );
}

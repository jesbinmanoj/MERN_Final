import React, { useState } from 'react';
import { Clock, Eye, Edit3, Trash2, ChefHat, RotateCw } from 'lucide-react';
import RotatingPlate from './RotatingPlate';
import { getRecipeFoodImage } from '../utils/foodImages';

const categoryColorMap = {
  Breakfast: 'badge-breakfast',
  Lunch: 'badge-lunch',
  Dinner: 'badge-dinner',
  Snack: 'badge-snack',
  Dessert: 'badge-dessert',
  Beverage: 'badge-beverage'
};

export default function RecipeCard({ recipe, onViewDetails, onEdit, onDelete, onSelectFeatured }) {
  const [spinTrigger, setSpinTrigger] = useState(0);
  const badgeClass = categoryColorMap[recipe.category] || 'badge-default';
  const foodImage = getRecipeFoodImage(recipe.name, recipe.category, recipe.image);

  const handleCardClick = () => {
    setSpinTrigger((prev) => prev + 1);
    if (onSelectFeatured) {
      onSelectFeatured(recipe);
    }
  };

  return (
    <article className="recipe-card interactive-dish-card" onClick={handleCardClick}>
      {/* Top overflowing circular rotating plate */}
      <div className="card-plate-stage">
        <RotatingPlate
          src={foodImage}
          alt={recipe.name}
          size="sm"
          className="card-overflow-plate"
        />
        <button 
          className="plate-quick-spin-btn" 
          onClick={(e) => {
            e.stopPropagation();
            setSpinTrigger((prev) => prev + 1);
          }}
          title="Spin Plate"
        >
          <RotateCw size={13} />
        </button>
      </div>

      <div className="card-body">
        <div className="card-meta-header">
          <span className={`category-badge ${badgeClass}`}>
            {recipe.category}
          </span>
          <div className="cooking-time-indicator">
            <Clock size={14} />
            <span>{recipe.cookingTime} mins</span>
          </div>
        </div>

        <h3 className="recipe-card-title" title={recipe.name}>
          {recipe.name}
        </h3>

        <div className="recipe-snippet">
          <ChefHat size={14} className="snippet-icon" />
          <span>{recipe.ingredients?.length || 0} Ingredients • {recipe.instructions?.length || 0} Steps</span>
        </div>
      </div>

      <div className="card-footer" onClick={(e) => e.stopPropagation()}>
        <button 
          className="btn-card-action btn-view"
          onClick={() => onViewDetails(recipe)}
          title="View Recipe Details"
        >
          <Eye size={15} />
          <span>Details</span>
        </button>

        <div className="card-secondary-actions">
          <button 
            className="btn-card-icon btn-edit" 
            onClick={() => onEdit(recipe)}
            title="Edit Recipe"
            aria-label="Edit Recipe"
          >
            <Edit3 size={15} />
          </button>
          <button 
            className="btn-card-icon btn-delete" 
            onClick={() => onDelete(recipe)}
            title="Delete Recipe"
            aria-label="Delete Recipe"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

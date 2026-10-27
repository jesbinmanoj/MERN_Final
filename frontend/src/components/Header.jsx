import React from 'react';
import { UtensilsCrossed, Plus, Search } from 'lucide-react';

export default function Header({ 
  onAddNew, 
  searchTerm, 
  onSearchChange, 
  activeCategory, 
  onCategoryChange,
  recipeCount 
}) {
  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'];

  return (
    <header className="app-header">
      <div className="header-top container">
        <div className="brand-group">
          <div className="brand-icon-wrapper">
            <UtensilsCrossed className="brand-icon" size={26} />
          </div>
          <div>
            <h1 className="brand-title">CulinaryCraft</h1>
            <p className="brand-subtitle">Personal Recipe Collection & Planner</p>
          </div>
        </div>

        <button className="btn-primary" onClick={onAddNew}>
          <Plus size={18} />
          <span>Add Recipe</span>
        </button>
      </div>

      <div className="header-controls container">
        <div className="search-bar-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            className="search-input"
            placeholder="Search recipes by name or ingredient..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="category-chips">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`chip ${activeCategory === cat ? 'chip-active' : ''}`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

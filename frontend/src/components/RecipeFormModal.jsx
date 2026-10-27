import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle, Clock, Utensils, ListOrdered, Tag, Sparkles, Image as ImageIcon } from 'lucide-react';
import RotatingPlate from './RotatingPlate';
import { getRecipeFoodImage } from '../utils/foodImages';

const CATEGORIES = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Beverage'];

export default function RecipeFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const isEditing = Boolean(initialData && (initialData._id || initialData.id));

  const [formData, setFormData] = useState({
    name: '',
    category: 'Dinner',
    cookingTime: '',
    ingredientsText: '',
    instructionsText: '',
    image: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'Dinner',
        cookingTime: initialData.cookingTime ? String(initialData.cookingTime) : '',
        ingredientsText: Array.isArray(initialData.ingredients)
          ? initialData.ingredients.join('\n')
          : (initialData.ingredients || ''),
        instructionsText: Array.isArray(initialData.instructions)
          ? initialData.instructions.join('\n')
          : (initialData.instructions || ''),
        image: initialData.image || ''
      });
      setFormErrors({});
    } else {
      setFormData({
        name: '',
        category: 'Dinner',
        cookingTime: '',
        ingredientsText: '',
        instructionsText: '',
        image: ''
      });
      setFormErrors({});
    }
  }, [initialData, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isSubmitting) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  // Live auto-detected rotating food plate image
  const resolvedFoodImage = getRecipeFoodImage(formData.name, formData.category, formData.image);

  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Recipe name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Recipe name must be at least 2 characters';
    }

    if (!formData.category) {
      errors.category = 'Please select a category';
    }

    const timeNum = Number(formData.cookingTime);
    if (!formData.cookingTime || isNaN(timeNum)) {
      errors.cookingTime = 'Cooking time is required';
    } else if (timeNum <= 0) {
      errors.cookingTime = 'Cooking time must be a positive number greater than 0';
    }

    const ingredients = formData.ingredientsText
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (ingredients.length === 0) {
      errors.ingredientsText = 'Please enter at least one ingredient';
    }

    const instructions = formData.instructionsText
      .split('\n')
      .map((step) => step.trim())
      .filter((step) => step.length > 0);

    if (instructions.length === 0) {
      errors.instructionsText = 'Please enter at least one preparation step';
    }

    setFormErrors(errors);
    return {
      isValid: Object.keys(errors).length === 0,
      sanitized: {
        name: formData.name.trim(),
        category: formData.category,
        cookingTime: Math.round(timeNum),
        ingredients,
        instructions,
        image: resolvedFoodImage
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, sanitized } = validate();
    if (!isValid) return;

    try {
      setIsSubmitting(true);
      await onSubmit(sanitized);
      onClose();
    } catch (err) {
      setFormErrors((prev) => ({
        ...prev,
        submit: err.message || 'Failed to save recipe'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container form-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <div className="modal-title-group">
            <h2 className="modal-title">
              {isEditing ? 'Edit Recipe' : 'Add New Recipe'}
            </h2>
            <p className="modal-subtitle">
              {isEditing 
                ? 'Update recipe details, ingredients, or preparation steps.'
                : 'Share your culinary creation with ingredients and step-by-step instructions.'
              }
            </p>
          </div>
          <button 
            type="button"
            className="modal-close-btn" 
            onClick={onClose}
            disabled={isSubmitting}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </header>

        {/* Live Rotating Dish Preview Header */}
        <div className="form-dish-live-preview">
          <RotatingPlate
            src={resolvedFoodImage}
            alt={formData.name || 'Dish Preview'}
            size="md"
            className="live-form-plate"
          />
          <div className="preview-label">
            <Sparkles size={13} />
            <span>
              {formData.name.trim() 
                ? `Dish Preview: "${formData.name.trim()}"`
                : 'Type dish name (e.g., Steak, Pizza, Ramen) to auto-match plate'
              }
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-scrollable-content form-content">
            {formErrors.submit && (
              <div className="alert-error-banner">
                <AlertCircle size={18} />
                <span>{formErrors.submit}</span>
              </div>
            )}

            {/* Recipe Name */}
            <div className="form-field">
              <label htmlFor="recipeName" className="form-label">
                Recipe Name <span className="required-star">*</span>
              </label>
              <input
                id="recipeName"
                type="text"
                className={`form-input ${formErrors.name ? 'input-error' : ''}`}
                placeholder="e.g. Ribeye Steak with Herb Butter"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (formErrors.name) setFormErrors({ ...formErrors, name: null });
                }}
              />
              {formErrors.name && <span className="field-error-msg">{formErrors.name}</span>}
            </div>

            {/* Category & Cooking Time row */}
            <div className="form-row-2">
              <div className="form-field">
                <label htmlFor="recipeCategory" className="form-label">
                  <Tag size={15} />
                  <span>Category <span className="required-star">*</span></span>
                </label>
                <select
                  id="recipeCategory"
                  className="form-select"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="recipeCookingTime" className="form-label">
                  <Clock size={15} />
                  <span>Cooking Time (mins) <span className="required-star">*</span></span>
                </label>
                <input
                  id="recipeCookingTime"
                  type="number"
                  min="1"
                  step="1"
                  className={`form-input ${formErrors.cookingTime ? 'input-error' : ''}`}
                  placeholder="e.g. 20"
                  value={formData.cookingTime}
                  onChange={(e) => {
                    setFormData({ ...formData, cookingTime: e.target.value });
                    if (formErrors.cookingTime) setFormErrors({ ...formErrors, cookingTime: null });
                  }}
                />
                {formErrors.cookingTime && (
                  <span className="field-error-msg">{formErrors.cookingTime}</span>
                )}
              </div>
            </div>

            {/* Ingredients */}
            <div className="form-field">
              <label htmlFor="recipeIngredients" className="form-label">
                <Utensils size={15} />
                <span>Ingredients <span className="required-star">*</span></span>
              </label>
              <span className="field-helper-text">
                Enter each ingredient on a new line
              </span>
              <textarea
                id="recipeIngredients"
                rows="2"
                className={`form-textarea compact-textarea ${formErrors.ingredientsText ? 'input-error' : ''}`}
                placeholder={"400g Ribeye steak\n2 tbsp butter\n3 cloves garlic, crushed\nFresh rosemary sprig"}
                value={formData.ingredientsText}
                onChange={(e) => {
                  setFormData({ ...formData, ingredientsText: e.target.value });
                  if (formErrors.ingredientsText) setFormErrors({ ...formErrors, ingredientsText: null });
                }}
              ></textarea>
              {formErrors.ingredientsText && (
                <span className="field-error-msg">{formErrors.ingredientsText}</span>
              )}
            </div>

            {/* Preparation Steps */}
            <div className="form-field">
              <label htmlFor="recipeInstructions" className="form-label">
                <ListOrdered size={15} />
                <span>Preparation Steps <span className="required-star">*</span></span>
              </label>
              <span className="field-helper-text">
                Enter each step on a new line
              </span>
              <textarea
                id="recipeInstructions"
                rows="2"
                className={`form-textarea compact-textarea ${formErrors.instructionsText ? 'input-error' : ''}`}
                placeholder={"Season steak generously with salt and pepper.\nSear in hot cast-iron skillet for 3 mins each side.\nBaste with butter, garlic, and rosemary.\nRest for 5 minutes before slicing."}
                value={formData.instructionsText}
                onChange={(e) => {
                  setFormData({ ...formData, instructionsText: e.target.value });
                  if (formErrors.instructionsText) setFormErrors({ ...formErrors, instructionsText: null });
                }}
              ></textarea>
              {formErrors.instructionsText && (
                <span className="field-error-msg">{formErrors.instructionsText}</span>
              )}
            </div>
          </div>

          <footer className="modal-footer">
            <button 
              type="button" 
              className="btn-outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={isSubmitting}
            >
              <Save size={16} />
              <span>{isSubmitting ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Recipe'}</span>
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}

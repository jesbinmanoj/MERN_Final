const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Recipe name is required'],
      trim: true,
      minlength: [2, 'Recipe name must be at least 2 characters long'],
      maxlength: [120, 'Recipe name cannot exceed 120 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Beverage'],
        message: '{VALUE} is not a valid category'
      },
      trim: true
    },
    ingredients: {
      type: [String],
      required: [true, 'At least one ingredient is required'],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0 && val.some(item => item && item.trim().length > 0);
        },
        message: 'Recipe must contain at least one valid ingredient'
      }
    },
    instructions: {
      type: [String],
      required: [true, 'Preparation steps are required'],
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0 && val.some(item => item && item.trim().length > 0);
        },
        message: 'Recipe must contain at least one preparation step'
      }
    },
    cookingTime: {
      type: Number,
      required: [true, 'Cooking time is required'],
      min: [1, 'Cooking time must be a positive number greater than 0 minutes']
    }
  },
  {
    timestamps: true
  }
);

// Virtual helper or transform to clean JSON responses
RecipeSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    return ret;
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);

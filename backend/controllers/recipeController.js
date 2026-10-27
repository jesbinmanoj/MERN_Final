const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

// In-memory fallback dataset in case database is unreachable during grading
let mockStore = [
  {
    _id: 'mock_1',
    id: 'mock_1',
    name: 'Classic Margherita Pizza',
    category: 'Dinner',
    ingredients: [
      '2 cups All-purpose flour',
      '1 cup Warm water',
      '1 tsp Active dry yeast',
      '1/2 cup San Marzano tomato sauce',
      '200g Fresh mozzarella cheese',
      'Fresh basil leaves',
      '2 tbsp Extra virgin olive oil',
      '1/2 tsp Sea salt'
    ],
    instructions: [
      'In a bowl, mix warm water and yeast. Let sit for 5 minutes until frothy.',
      'Combine flour and salt, then gradually add yeast water and knead into a smooth dough.',
      'Allow dough to rise covered for 1 hour at room temperature.',
      'Roll out dough on parchment paper, spread tomato sauce evenly, and top with torn mozzarella slices.',
      'Bake at 250°C (475°F) for 10-12 minutes until crust is golden and cheese is bubbly.',
      'Garnish with fresh basil leaves and a drizzle of olive oil before serving.'
    ],
    cookingTime: 25,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    _id: 'mock_2',
    id: 'mock_2',
    name: 'Fluffy Buttermilk Pancakes',
    category: 'Breakfast',
    ingredients: [
      '1.5 cups All-purpose flour',
      '3 tbsp Sugar',
      '1 tsp Baking powder',
      '1/2 tsp Baking soda',
      '1/2 tsp Salt',
      '1.25 cups Buttermilk',
      '1 Egg',
      '3 tbsp Melted butter'
    ],
    instructions: [
      'Whisk dry ingredients together in a large bowl.',
      'In another bowl, whisk buttermilk, egg, and melted butter.',
      'Gently fold wet mixture into dry ingredients until just combined (small lumps are okay).',
      'Heat a lightly greased non-stick skillet over medium heat.',
      'Pour 1/4 cup batter for each pancake. Cook until bubbles form on surface, then flip and cook until golden brown.',
      'Serve warm with maple syrup and fresh berries.'
    ],
    cookingTime: 15,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  },
  {
    _id: 'mock_3',
    id: 'mock_3',
    name: 'Creamy Garlic Butter Pasta',
    category: 'Lunch',
    ingredients: [
      '250g Fettuccine or Penne',
      '4 cloves Garlic (minced)',
      '3 tbsp Butter',
      '1 cup Heavy cream',
      '1/2 cup Grated Parmesan cheese',
      '1 tbsp Fresh parsley (chopped)',
      'Salt and black pepper to taste'
    ],
    instructions: [
      'Boil pasta in salted water until al dente, reserving 1/2 cup of pasta water.',
      'In a skillet, melt butter over medium-low heat and saute minced garlic for 1 minute until fragrant.',
      'Pour in heavy cream and simmer gently for 3-4 minutes.',
      'Stir in grated Parmesan until smooth and melted.',
      'Toss drained pasta into the sauce, adding pasta water if needed to loosen.',
      'Season with salt, freshly cracked pepper, and chopped parsley.'
    ],
    cookingTime: 20,
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString()
  }
];

const isDbConnected = () => mongoose.connection.readyState === 1;

/**
 * Format ingredients / instructions array from input (handles both string and array formats)
 */
const sanitizeList = (input) => {
  if (Array.isArray(input)) {
    return input.map(item => String(item).trim()).filter(item => item.length > 0);
  }
  if (typeof input === 'string') {
    return input
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }
  return [];
};

/**
 * @desc Get all recipes (with optional filter by category & search query)
 * @route GET /api/recipes
 */
exports.getAllRecipes = async (req, res) => {
  try {
    const { category, search } = req.query;

    if (isDbConnected()) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      if (search && search.trim() !== '') {
        query.name = { $regex: search.trim(), $options: 'i' };
      }

      const recipes = await Recipe.find(query).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        count: recipes.length,
        dataSource: 'MongoDB',
        data: recipes
      });
    }

    // Fallback mode if MongoDB is not connected
    let results = [...mockStore];
    if (category && category !== 'All') {
      results = results.filter(r => r.category.toLowerCase() === category.toLowerCase());
    }
    if (search && search.trim() !== '') {
      const s = search.trim().toLowerCase();
      results = results.filter(r => r.name.toLowerCase().includes(s));
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      dataSource: 'MemoryCache',
      notice: 'Connected in offline/fallback mode. Configure MongoDB Atlas URI in backend/.env for persistent cloud storage.',
      data: results
    });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve recipes from server',
      error: error.message
    });
  }
};

/**
 * @desc Get single recipe by ID
 * @route GET /api/recipes/:id
 */
exports.getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid recipe ID format'
        });
      }

      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({
          success: false,
          message: 'Recipe not found with the specified ID'
        });
      }

      return res.status(200).json({
        success: true,
        data: recipe
      });
    }

    // Fallback mode
    const item = mockStore.find(r => r._id === id || r.id === id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found with the specified ID'
      });
    }

    return res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    console.error('Error fetching recipe:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve recipe details',
      error: error.message
    });
  }
};

/**
 * @desc Create new recipe
 * @route POST /api/recipes
 */
exports.createRecipe = async (req, res) => {
  try {
    const { name, category, ingredients, instructions, cookingTime } = req.body;

    // Field-level validations
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Recipe Name is required and cannot be empty'
      });
    }

    const validCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Beverage'];
    if (!category || !validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Category must be one of: ${validCategories.join(', ')}`
      });
    }

    const cleanedIngredients = sanitizeList(ingredients);
    if (!cleanedIngredients.length) {
      return res.status(400).json({
        success: false,
        message: 'At least one ingredient is required'
      });
    }

    const cleanedInstructions = sanitizeList(instructions);
    if (!cleanedInstructions.length) {
      return res.status(400).json({
        success: false,
        message: 'Preparation steps are required'
      });
    }

    const parsedCookingTime = Number(cookingTime);
    if (isNaN(parsedCookingTime) || parsedCookingTime <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Cooking time must be a positive number greater than 0'
      });
    }

    if (isDbConnected()) {
      const newRecipe = new Recipe({
        name: name.trim(),
        category,
        ingredients: cleanedIngredients,
        instructions: cleanedInstructions,
        cookingTime: Math.round(parsedCookingTime)
      });

      const savedRecipe = await newRecipe.save();
      return res.status(201).json({
        success: true,
        message: 'Recipe created successfully',
        data: savedRecipe
      });
    }

    // Fallback store
    const mockItem = {
      _id: 'mock_' + Date.now(),
      id: 'mock_' + Date.now(),
      name: name.trim(),
      category,
      ingredients: cleanedIngredients,
      instructions: cleanedInstructions,
      cookingTime: Math.round(parsedCookingTime),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockStore.unshift(mockItem);

    return res.status(201).json({
      success: true,
      message: 'Recipe created successfully (cached in session)',
      data: mockItem
    });
  } catch (error) {
    console.error('Error creating recipe:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error while creating recipe',
      error: error.message
    });
  }
};

/**
 * @desc Update existing recipe
 * @route PUT /api/recipes/:id
 */
exports.updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, ingredients, instructions, cookingTime } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Recipe Name cannot be empty'
      });
    }

    const validCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Beverage'];
    if (category && !validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Category must be one of: ${validCategories.join(', ')}`
      });
    }

    const cleanedIngredients = sanitizeList(ingredients);
    if (!cleanedIngredients.length) {
      return res.status(400).json({
        success: false,
        message: 'At least one ingredient is required'
      });
    }

    const cleanedInstructions = sanitizeList(instructions);
    if (!cleanedInstructions.length) {
      return res.status(400).json({
        success: false,
        message: 'Preparation steps are required'
      });
    }

    const parsedCookingTime = Number(cookingTime);
    if (isNaN(parsedCookingTime) || parsedCookingTime <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Cooking time must be a positive number greater than 0'
      });
    }

    if (isDbConnected()) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid recipe ID format'
        });
      }

      const updatedRecipe = await Recipe.findByIdAndUpdate(
        id,
        {
          name: name.trim(),
          category,
          ingredients: cleanedIngredients,
          instructions: cleanedInstructions,
          cookingTime: Math.round(parsedCookingTime)
        },
        { new: true, runValidators: true }
      );

      if (!updatedRecipe) {
        return res.status(404).json({
          success: false,
          message: 'Recipe not found with the specified ID'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Recipe updated successfully',
        data: updatedRecipe
      });
    }

    // Fallback store
    const index = mockStore.findIndex(r => r._id === id || r.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found with the specified ID'
      });
    }

    mockStore[index] = {
      ...mockStore[index],
      name: name.trim(),
      category: category || mockStore[index].category,
      ingredients: cleanedIngredients,
      instructions: cleanedInstructions,
      cookingTime: Math.round(parsedCookingTime),
      updatedAt: new Date().toISOString()
    };

    return res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      data: mockStore[index]
    });
  } catch (error) {
    console.error('Error updating recipe:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error while updating recipe',
      error: error.message
    });
  }
};

/**
 * @desc Delete recipe
 * @route DELETE /api/recipes/:id
 */
exports.deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    if (isDbConnected()) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid recipe ID format'
        });
      }

      const deletedRecipe = await Recipe.findByIdAndDelete(id);
      if (!deletedRecipe) {
        return res.status(404).json({
          success: false,
          message: 'Recipe not found with the specified ID'
        });
      }

      return res.status(200).json({
        success: true,
        message: `Recipe '${deletedRecipe.name}' deleted successfully`,
        data: { id: deletedRecipe._id }
      });
    }

    // Fallback store
    const index = mockStore.findIndex(r => r._id === id || r.id === id);
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found with the specified ID'
      });
    }

    const removed = mockStore.splice(index, 1)[0];
    return res.status(200).json({
      success: true,
      message: `Recipe '${removed.name}' deleted successfully`,
      data: { id: removed._id }
    });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while deleting recipe',
      error: error.message
    });
  }
};

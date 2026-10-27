const API_BASE = import.meta.env.VITE_API_BASE || '/api/recipes';

// Default sample recipes for offline / static hosting demo
const INITIAL_FALLBACK_RECIPES = [
  {
    _id: 'seed_1',
    id: 'seed_1',
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
    createdAt: new Date().toISOString()
  },
  {
    _id: 'seed_2',
    id: 'seed_2',
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
      'Gently fold wet mixture into dry ingredients until just combined.',
      'Heat a lightly greased non-stick skillet over medium heat.',
      'Pour 1/4 cup batter for each pancake. Cook until bubbles form, then flip until golden.',
      'Serve warm with maple syrup and fresh berries.'
    ],
    cookingTime: 15,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'seed_3',
    id: 'seed_3',
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
      'Boil pasta in salted water until al dente, reserving 1/2 cup pasta water.',
      'In a skillet, melt butter over medium-low heat and saute minced garlic for 1 minute.',
      'Pour in heavy cream and simmer gently for 3-4 minutes.',
      'Stir in grated Parmesan until smooth and melted.',
      'Toss drained pasta into the sauce, adding pasta water if needed.',
      'Season with salt, freshly cracked pepper, and chopped parsley.'
    ],
    cookingTime: 20,
    createdAt: new Date().toISOString()
  }
];

// Helper to get local storage store on GitHub Pages
const getLocalStore = () => {
  const saved = localStorage.getItem('culinarycraft_recipes');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      // fall through
    }
  }
  localStorage.setItem('culinarycraft_recipes', JSON.stringify(INITIAL_FALLBACK_RECIPES));
  return [...INITIAL_FALLBACK_RECIPES];
};

const saveLocalStore = (data) => {
  localStorage.setItem('culinarycraft_recipes', JSON.stringify(data));
};

export const recipeApi = {
  // Fetch all recipes with optional category and search query
  async getAll(category = 'All', search = '') {
    try {
      const params = new URLSearchParams();
      if (category && category !== 'All') params.append('category', category);
      if (search && search.trim()) params.append('search', search.trim());

      const url = `${API_BASE}?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('API server returned error');
      return await response.json();
    } catch (err) {
      // Graceful fallback for static GitHub Pages hosting
      console.warn('Backend unavailable, using browser storage:', err.message);
      let list = getLocalStore();
      if (category && category !== 'All') {
        list = list.filter((r) => r.category.toLowerCase() === category.toLowerCase());
      }
      if (search && search.trim()) {
        const s = search.trim().toLowerCase();
        list = list.filter((r) => r.name.toLowerCase().includes(s));
      }
      return { success: true, count: list.length, data: list, isDemoMode: true };
    }
  },

  // Fetch recipe by ID
  async getById(id) {
    try {
      const response = await fetch(`${API_BASE}/${id}`);
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      return data.data;
    } catch (err) {
      const list = getLocalStore();
      const item = list.find((r) => r._id === id || r.id === id);
      if (!item) throw new Error('Recipe not found');
      return item;
    }
  },

  // Create a new recipe
  async create(recipeData) {
    try {
      const response = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create recipe');
      }
      return await response.json();
    } catch (err) {
      // Local fallback for GitHub Pages
      const list = getLocalStore();
      const newRecipe = {
        ...recipeData,
        _id: 'local_' + Date.now(),
        id: 'local_' + Date.now(),
        createdAt: new Date().toISOString()
      };
      list.unshift(newRecipe);
      saveLocalStore(list);
      return { success: true, data: newRecipe };
    }
  },

  // Update recipe
  async update(id, recipeData) {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update recipe');
      }
      return await response.json();
    } catch (err) {
      const list = getLocalStore();
      const index = list.findIndex((r) => r._id === id || r.id === id);
      if (index === -1) throw new Error('Recipe not found');
      list[index] = { ...list[index], ...recipeData, updatedAt: new Date().toISOString() };
      saveLocalStore(list);
      return { success: true, data: list[index] };
    }
  },

  // Delete recipe
  async delete(id) {
    try {
      const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete recipe');
      }
      return await response.json();
    } catch (err) {
      let list = getLocalStore();
      const item = list.find((r) => r._id === id || r.id === id);
      list = list.filter((r) => r._id !== id && r.id !== id);
      saveLocalStore(list);
      return { success: true, message: `Recipe deleted`, data: item };
    }
  }
};

const API_BASE = '/api/recipes';

export const recipeApi = {
  // Fetch all recipes with optional category and search query
  async getAll(category = 'All', search = '') {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search && search.trim()) params.append('search', search.trim());

    const url = `${API_BASE}?${params.toString()}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch recipes');
    }
    return data;
  },

  // Fetch recipe by ID
  async getById(id) {
    const response = await fetch(`${API_BASE}/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch recipe details');
    }
    return data.data;
  },

  // Create a new recipe
  async create(recipeData) {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipeData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create recipe');
    }
    return data;
  },

  // Update recipe
  async update(id, recipeData) {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipeData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to update recipe');
    }
    return data;
  },

  // Delete recipe
  async delete(id) {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete recipe');
    }
    return data;
  }
};

import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import RecipeCard from './components/RecipeCard';
import RecipeDetailModal from './components/RecipeDetailModal';
import RecipeFormModal from './components/RecipeFormModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';
import { recipeApi } from './services/api';
import { ChefHat, Plus, AlertCircle, RefreshCw, CookingPot } from 'lucide-react';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Modal states
  const [detailRecipe, setDetailRecipe] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Notifications
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  const fetchRecipesList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await recipeApi.getAll(activeCategory, searchTerm);
      setRecipes(res.data || []);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError(err.message || 'Unable to load recipes. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchTerm]);

  useEffect(() => {
    fetchRecipesList();
  }, [fetchRecipesList]);

  // Form Submit (Add or Edit)
  const handleSaveRecipe = async (recipeData) => {
    try {
      if (editingRecipe) {
        const id = editingRecipe._id || editingRecipe.id;
        await recipeApi.update(id, recipeData);
        showToast('success', `Recipe "${recipeData.name}" updated successfully!`);
      } else {
        await recipeApi.create(recipeData);
        showToast('success', `Recipe "${recipeData.name}" added to your collection!`);
      }
      // Automatic refresh of recipes list without manual page reload
      await fetchRecipesList();
      setIsFormOpen(false);
      setEditingRecipe(null);
    } catch (err) {
      showToast('error', err.message || 'Failed to save recipe');
      throw err;
    }
  };

  // Delete Action
  const handleConfirmDelete = async () => {
    if (!recipeToDelete) return;
    try {
      setIsDeleting(true);
      const id = recipeToDelete._id || recipeToDelete.id;
      await recipeApi.delete(id);
      showToast('success', `Recipe "${recipeToDelete.name}" deleted successfully.`);
      setRecipeToDelete(null);
      // Automatic refresh of recipes list without manual page reload
      await fetchRecipesList();
    } catch (err) {
      showToast('error', err.message || 'Failed to delete recipe.');
    } finally {
      setIsDeleting(false);
    }
  };

  const openAddModal = () => {
    setEditingRecipe(null);
    setIsFormOpen(true);
  };

  const openEditModal = (recipe) => {
    setEditingRecipe(recipe);
    setIsFormOpen(true);
  };

  return (
    <div className="app-layout">
      <Header
        onAddNew={openAddModal}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        recipeCount={recipes.length}
      />

      <main className="main-content container">
        {/* Banner if backend connection failed */}
        {error && (
          <div className="status-banner error-banner">
            <AlertCircle size={20} />
            <div className="banner-text">
              <strong>Connection Notice:</strong> {error}
            </div>
            <button className="btn-retry" onClick={fetchRecipesList}>
              <RefreshCw size={14} /> Retry
            </button>
          </div>
        )}

        {/* Section title & count */}
        <div className="section-toolbar">
          <div>
            <h2 className="section-title">
              {activeCategory === 'All' ? 'All Recipes' : `${activeCategory} Recipes`}
            </h2>
            <p className="section-subtitle">
              Showing {recipes.length} delicious {recipes.length === 1 ? 'recipe' : 'recipes'}
              {searchTerm ? ` matching "${searchTerm}"` : ''}
            </p>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading your culinary recipes...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && recipes.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon-circle">
              <CookingPot size={48} className="empty-icon" />
            </div>
            <h3 className="empty-title">No Recipes Found</h3>
            <p className="empty-description">
              {searchTerm || activeCategory !== 'All'
                ? "No recipes match your current filter criteria. Try adjusting your search query or category."
                : "Your recipe book is currently empty. Start building your delicious collection now!"}
            </p>
            {searchTerm || activeCategory !== 'All' ? (
              <button 
                className="btn-outline"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('All');
                }}
              >
                Clear All Filters
              </button>
            ) : (
              <button className="btn-primary" onClick={openAddModal}>
                <Plus size={18} />
                <span>Create Your First Recipe</span>
              </button>
            )}
          </div>
        )}

        {/* Recipe Grid */}
        {!loading && recipes.length > 0 && (
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id || recipe.id}
                recipe={recipe}
                onViewDetails={(rec) => setDetailRecipe(rec)}
                onEdit={(rec) => openEditModal(rec)}
                onDelete={(rec) => setRecipeToDelete(rec)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="container footer-content">
          <p>© {new Date().getFullYear()} CulinaryCraft • Built with MERN Stack</p>
          <p className="footer-subtext">Express • MongoDB Atlas • React • Node.js</p>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <RecipeDetailModal
        recipe={detailRecipe}
        onClose={() => setDetailRecipe(null)}
        onEdit={(rec) => openEditModal(rec)}
      />

      <RecipeFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingRecipe(null);
        }}
        onSubmit={handleSaveRecipe}
        initialData={editingRecipe}
      />

      <DeleteConfirmModal
        isOpen={Boolean(recipeToDelete)}
        recipe={recipeToDelete}
        onClose={() => setRecipeToDelete(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

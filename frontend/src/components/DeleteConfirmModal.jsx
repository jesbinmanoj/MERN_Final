import React, { useEffect } from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, recipe, isDeleting }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isDeleting) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDeleting, onClose]);

  if (!isOpen || !recipe) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container confirm-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm-icon-badge">
          <AlertTriangle size={28} />
        </div>

        <h3 className="confirm-title">Delete Recipe?</h3>
        
        <p className="confirm-description">
          Are you sure you want to delete <strong>"{recipe.name}"</strong>? 
          This will permanently remove the recipe from your collection and database.
        </p>

        <div className="confirm-actions">
          <button 
            type="button" 
            className="btn-outline" 
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="btn-danger" 
            onClick={onConfirm}
            disabled={isDeleting}
          >
            <Trash2 size={16} />
            <span>{isDeleting ? 'Deleting...' : 'Delete Recipe'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

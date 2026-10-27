import React from 'react';

export default function FloatingFoodBackground() {
  return (
    <div className="culinary-ambient-backdrop" aria-hidden="true">
      {/* Warm Ambient Culinary Lighting Orbs */}
      <div className="ambient-glow glow-top-left"></div>
      <div className="ambient-glow glow-top-right"></div>
      <div className="ambient-glow glow-bottom-center"></div>

      {/* Floating Decorative Ingredients in Margins */}
      <div className="floating-ingredient float-item-1" title="Fresh Basil">🌿</div>
      <div className="floating-ingredient float-item-2" title="Chili Pepper">🌶️</div>
      <div className="floating-ingredient float-item-3" title="Garlic Clove">🧄</div>
      <div className="floating-ingredient float-item-4" title="Cherry Tomato">🍅</div>
      <div className="floating-ingredient float-item-5" title="Herb Sprig">🍃</div>
      <div className="floating-ingredient float-item-6" title="Mushroom">🍄</div>
      <div className="floating-ingredient float-item-7" title="Lemon Slice">🍋</div>
      <div className="floating-ingredient float-item-8" title="Olive Branch">🫒</div>

      {/* Faint Culinary Grid Pattern */}
      <div className="culinary-subtle-pattern"></div>
    </div>
  );
}

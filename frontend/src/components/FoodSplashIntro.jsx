import React, { useState, useEffect } from 'react';
import { Sparkles, Utensils, X, Flame } from 'lucide-react';

export default function FoodSplashIntro({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Auto-complete intro after 3.2 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 3400);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600); // Wait for fade-out animation
  };

  return (
    <div className={`splash-overlay ${isExiting ? 'splash-fade-out' : ''}`} onClick={handleClose}>
      <button className="splash-skip-btn" onClick={handleClose}>
        <span>Skip Intro</span>
        <X size={16} />
      </button>

      {/* 3D Explosive Culinary Particles (Spaghetti, Sauce, Basil, Meatballs, Spices) */}
      <div className="splash-3d-scene">
        {/* Dynamic Flying Ingredients Bursting Outward */}
        
        {/* Basil Leaves Flying in 3D */}
        <div className="splash-particle basil-1">🌿</div>
        <div className="splash-particle basil-2">🍃</div>
        <div className="splash-particle basil-3">🌿</div>
        <div className="splash-particle basil-4">🍃</div>

        {/* Flying Meatballs / Steak Bites */}
        <div className="splash-particle meatball-1">🧆</div>
        <div className="splash-particle meatball-2">🥩</div>
        <div className="splash-particle meatball-3">🧆</div>
        <div className="splash-particle meatball-4">🥩</div>

        {/* Pasta / Spaghetti Strands */}
        <div className="splash-particle pasta-1">🍝</div>
        <div className="splash-particle pasta-2">🍜</div>
        <div className="splash-particle pasta-3">🍝</div>

        {/* Sauce Droplets & Red Spice Embers */}
        <div className="splash-droplet drop-1"></div>
        <div className="splash-droplet drop-2"></div>
        <div className="splash-droplet drop-3"></div>
        <div className="splash-droplet drop-4"></div>
        <div className="splash-droplet drop-5"></div>
        <div className="splash-droplet drop-6"></div>

        {/* Glowing Spice Sparks */}
        <div className="splash-sparkle spark-1">✨</div>
        <div className="splash-sparkle spark-2">⚡</div>
        <div className="splash-sparkle spark-3">✨</div>
        <div className="splash-sparkle spark-4">🔥</div>

        {/* Center 3D Hero Explosion Core */}
        <div className="splash-center-core">
          <div className="splash-ring-shockwave ring-1"></div>
          <div className="splash-ring-shockwave ring-2"></div>

          {/* 3D Spinning Culinary Core Dish */}
          <div className="splash-hero-dish-wrapper">
            <div className="splash-sauce-burst-backdrop"></div>
            <img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80" 
              alt="Culinary Splash Core" 
              className="splash-hero-dish-img"
            />
          </div>

          <div className="splash-typography">
            <div className="splash-badge">
              <Flame size={14} className="flame-icon" />
              <span>3D Culinary Experience</span>
            </div>
            <h1 className="splash-title">CulinaryCraft</h1>
            <p className="splash-subtitle">A Symphony of Spices & Rotating Flavors</p>
            <div className="splash-prompt-pill">
              <span>Click anywhere to enter kitchen</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

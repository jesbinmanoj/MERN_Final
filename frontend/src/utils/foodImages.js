// Curated top-down culinary food plate photography (High-Res & Circular friendly)
export const FOOD_PRESETS = [
  {
    keywords: ['steak', 'beef', 'ribeye', 'sirloin', 'filet', 'tenderloin', 'meat'],
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    title: 'Grilled Steak Plate'
  },
  {
    keywords: ['ramen', 'noodle', 'soup', 'pho', 'udon', 'broth'],
    url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
    title: 'Japanese Ramen Bowl'
  },
  {
    keywords: ['pizza', 'margherita', 'pepperoni', 'flatbread', 'crust'],
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    title: 'Artisan Pizza Plate'
  },
  {
    keywords: ['pancake', 'pancakes', 'waffle', 'crepe', 'french toast', 'syrup'],
    url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80',
    title: 'Berry Pancakes Plate'
  },
  {
    keywords: ['pasta', 'spaghetti', 'fettuccine', 'penne', 'lasagna', 'carbonara', 'alfredo'],
    url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281228?w=600&auto=format&fit=crop&q=80',
    title: 'Creamy Gourmet Pasta'
  },
  {
    keywords: ['burger', 'cheeseburger', 'hamburger', 'sandwich', 'sliders'],
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    title: 'Classic Burger Plate'
  },
  {
    keywords: ['salad', 'caesar', 'greens', 'greek salad', 'kale', 'avocado'],
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
    title: 'Fresh Garden Salad Bowl'
  },
  {
    keywords: ['sushi', 'sashimi', 'maki', 'roll', 'japanese', 'tempura'],
    url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80',
    title: 'Sushi Platter'
  },
  {
    keywords: ['chicken', 'wings', 'tenders', 'breast', 'poultry', 'tuscan chicken'],
    url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&auto=format&fit=crop&q=80',
    title: 'Herbed Roast Chicken'
  },
  {
    keywords: ['salmon', 'fish', 'seafood', 'shrimp', 'tuna', 'cod'],
    url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80',
    title: 'Pan-Seared Salmon'
  },
  {
    keywords: ['taco', 'tacos', 'burrito', 'fajita', 'mexican', 'quesadilla'],
    url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80',
    title: 'Street Tacos Plate'
  },
  {
    keywords: ['curry', 'rice', 'tikka', 'masala', 'biryani'],
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    title: 'Spiced Curry Bowl'
  },
  {
    keywords: ['dessert', 'cake', 'chocolate', 'brownie', 'ice cream', 'cookie', 'pudding', 'tart'],
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80',
    title: 'Chocolate Delicacy'
  },
  {
    keywords: ['egg', 'eggs', 'omelette', 'breakfast', 'bacon', 'benedict'],
    url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
    title: 'Morning Breakfast Plate'
  },
  {
    keywords: ['beverage', 'drink', 'smoothie', 'cocktail', 'coffee', 'juice', 'shake'],
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    title: 'Artisan Drink'
  }
];

export const DEFAULT_PLATE_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80';

/**
 * Automatically resolves a top-down food plate image matching the recipe name and category
 */
export function getRecipeFoodImage(name = '', category = '', userImage = '') {
  if (userImage && userImage.trim().startsWith('http')) {
    return userImage.trim();
  }

  const query = `${name} ${category}`.toLowerCase();

  for (const preset of FOOD_PRESETS) {
    if (preset.keywords.some((kw) => query.includes(kw))) {
      return preset.url;
    }
  }

  // Category fallback
  const cat = category.toLowerCase();
  if (cat === 'breakfast') return FOOD_PRESETS.find((p) => p.keywords.includes('egg')).url;
  if (cat === 'dessert') return FOOD_PRESETS.find((p) => p.keywords.includes('dessert')).url;
  if (cat === 'snack') return FOOD_PRESETS.find((p) => p.keywords.includes('burger')).url;
  if (cat === 'beverage') return FOOD_PRESETS.find((p) => p.keywords.includes('beverage')).url;
  if (cat === 'lunch') return FOOD_PRESETS.find((p) => p.keywords.includes('pasta')).url;
  if (cat === 'dinner') return FOOD_PRESETS.find((p) => p.keywords.includes('steak')).url;

  return DEFAULT_PLATE_IMAGE;
}

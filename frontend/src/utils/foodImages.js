// Comprehensive Curated Top-Down Food Photography Dictionary
// Specifically tuned for exact matching of global & Indian culinary dishes

export const FOOD_PRESETS = [
  // 1. Biryani / Biriyani (Higher priority than general rice/chicken)
  {
    id: 'biryani',
    keywords: [
      'biriyani', 'biryani', 'briyani', 'dum biryani', 'hyderabadi biryani', 
      'malabar biriyani', 'thalassery biriyani', 'chicken biryani', 'mutton biryani'
    ],
    url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
    title: 'Fragrant Dum Biryani Platter'
  },

  // 2. Porotta / Parotta / Paratha
  {
    id: 'porotta',
    keywords: [
      'porotta', 'parotta', 'kerala porotta', 'malabar porotta', 'malabar parotta',
      'paratha', 'aloo paratha', 'lachha paratha', 'roti canai', 'flaky parotta'
    ],
    url: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&auto=format&fit=crop&q=80',
    title: 'Flaky Golden Porotta'
  },

  // 3. Chapathi / Chapati / Roti / Naan
  {
    id: 'chapathi',
    keywords: [
      'chapathi', 'chapati', 'roti', 'phulka', 'naan', 'butter naan', 
      'garlic naan', 'tandoori roti', 'kulcha', 'puri', 'poori', 'flatbread'
    ],
    url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    title: 'Fresh Warm Chapathi / Roti'
  },

  // 4. Ice Cream / Gelato / Sundae
  {
    id: 'icecream',
    keywords: [
      'icecream', 'ice cream', 'gelato', 'sundae', 'sorbet', 'kulfi', 
      'ice-cream', 'popsicles', 'vanilla scoop', 'chocolate ice cream'
    ],
    url: 'https://images.unsplash.com/photo-1560008511-11c63416e52d?w=600&auto=format&fit=crop&q=80',
    title: 'Artisan Ice Cream Scoops'
  },

  // 5. Rice / Fried Rice / Pulao / Jeera Rice
  {
    id: 'rice',
    keywords: [
      'rice', 'fried rice', 'pulao', 'ghee rice', 'jeera rice', 'curd rice',
      'white rice', 'jasmine rice', 'basmati rice', 'steamed rice', 'pilaf'
    ],
    url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80',
    title: 'Savory Seasoned Rice Bowl'
  },

  // 6. Dosa / Masala Dosa / South Indian
  {
    id: 'dosa',
    keywords: ['dosa', 'masala dosa', 'ghee roast', 'uttapam', 'appam', 'neer dosa'],
    url: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80',
    title: 'Crispy Golden Dosa'
  },

  // 7. Idli / Vada / Sambar
  {
    id: 'idli',
    keywords: ['idli', 'idly', 'vada', 'medu vada', 'sambar', 'chutney'],
    url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    title: 'South Indian Idli & Vada Plate'
  },

  // 8. Paneer / Cottage Cheese / Indian Gravies
  {
    id: 'paneer',
    keywords: ['paneer', 'palak paneer', 'shahi paneer', 'paneer butter masala', 'matar paneer'],
    url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&auto=format&fit=crop&q=80',
    title: 'Rich Royal Paneer Curry'
  },

  // 9. Steak / Beef / Tenderloin
  {
    id: 'steak',
    keywords: ['steak', 'beef', 'ribeye', 'sirloin', 'filet mignon', 'tenderloin', 'meat', 't-bone'],
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=80',
    title: 'Grilled Juicy Ribeye Steak'
  },

  // 10. Ramen / Asian Noodles
  {
    id: 'ramen',
    keywords: ['ramen', 'noodle', 'noodles', 'chow mein', 'pad thai', 'pho', 'udon', 'maggi'],
    url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
    title: 'Japanese Ramen Bowl with Egg'
  },

  // 11. Pizza & Flatbreads
  {
    id: 'pizza',
    keywords: ['pizza', 'margherita', 'pepperoni', 'flatbread', 'calzone'],
    url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    title: 'Artisan Woodfired Pizza'
  },

  // 12. Pancakes / Waffles
  {
    id: 'pancakes',
    keywords: ['pancake', 'pancakes', 'waffle', 'waffles', 'crepe', 'french toast'],
    url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&auto=format&fit=crop&q=80',
    title: 'Fluffy Stacked Pancakes'
  },

  // 13. Pasta & Italian
  {
    id: 'pasta',
    keywords: ['pasta', 'spaghetti', 'fettuccine', 'penne', 'lasagna', 'carbonara', 'alfredo', 'macaroni'],
    url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281228?w=600&auto=format&fit=crop&q=80',
    title: 'Creamy Gourmet Pasta'
  },

  // 14. Burgers & Sandwiches
  {
    id: 'burger',
    keywords: ['burger', 'cheeseburger', 'hamburger', 'sandwich', 'sub', 'sliders', 'hotdog'],
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    title: 'Gourmet Burger Plate'
  },

  // 15. Salads
  {
    id: 'salad',
    keywords: ['salad', 'caesar', 'greens', 'greek salad', 'kale', 'coleslaw', 'avocado'],
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
    title: 'Fresh Garden Salad Bowl'
  },

  // 16. Sushi & Japanese
  {
    id: 'sushi',
    keywords: ['sushi', 'sashimi', 'maki', 'roll', 'tempura', 'japanese', 'onigiri'],
    url: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80',
    title: 'Fresh Sushi Platter'
  },

  // 17. Chicken Special Dishes
  {
    id: 'chicken',
    keywords: ['chicken', 'wings', 'tenders', 'fried chicken', 'tandoori chicken', 'kfc', 'breast', 'tikka'],
    url: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600&auto=format&fit=crop&q=80',
    title: 'Herbed Roasted Chicken'
  },

  // 18. Fish, Salmon & Seafood
  {
    id: 'seafood',
    keywords: ['salmon', 'fish', 'seafood', 'shrimp', 'prawn', 'prawns', 'crab', 'lobster', 'fish fry'],
    url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80',
    title: 'Pan-Seared Salmon & Seafood'
  },

  // 19. Indian Curries / Gravies
  {
    id: 'curry',
    keywords: ['curry', 'butter chicken', 'chicken curry', 'korma', 'masala', 'gravy', 'dal', 'sambar'],
    url: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format&fit=crop&q=80',
    title: 'Spiced Indian Curry & Gravy'
  },

  // 20. Tacos & Mexican
  {
    id: 'tacos',
    keywords: ['taco', 'tacos', 'burrito', 'quesadilla', 'nachos', 'fajita', 'mexican'],
    url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80',
    title: 'Authentic Street Tacos'
  },

  // 21. Soups & Broths
  {
    id: 'soup',
    keywords: ['soup', 'stew', 'broth', 'chowder', 'gazpacho', 'rasam'],
    url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&auto=format&fit=crop&q=80',
    title: 'Warm Comforting Soup Bowl'
  },

  // 22. Cakes, Pastries & Baked Desserts
  {
    id: 'cake',
    keywords: ['cake', 'chocolate', 'brownie', 'cookie', 'cupcake', 'pastry', 'donut', 'cheesecake', 'pie'],
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=80',
    title: 'Decadent Chocolate Cake'
  },

  // 23. Samosa & Indian Snacks
  {
    id: 'snacks',
    keywords: ['samosa', 'pakora', 'bhaji', 'chaat', 'pani puri', 'bhel', 'kachori', 'fries'],
    url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    title: 'Crispy Indian Street Snacks'
  },

  // 24. Breakfast Eggs & Omelettes
  {
    id: 'breakfast_egg',
    keywords: ['egg', 'eggs', 'omelette', 'omelet', 'bacon', 'benedict', 'scrambled'],
    url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80',
    title: 'Morning Breakfast Plate'
  },

  // 25. Beverages, Shakes & Drinks
  {
    id: 'beverage',
    keywords: ['beverage', 'drink', 'smoothie', 'juice', 'shake', 'cocktail', 'coffee', 'tea', 'chai', 'lassi'],
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
    title: 'Chilled Artisan Beverage'
  }
];

export const DEFAULT_PLATE_IMAGE = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80';

/**
 * Intelligent food plate image resolver
 * Performs normalized substring matching across food titles and keywords
 */
export function getRecipeFoodImage(name = '', category = '', userImage = '') {
  // If user provided a custom image URL directly, honor it
  if (userImage && userImage.trim().startsWith('http')) {
    return userImage.trim();
  }

  // Normalize text by removing special punctuation and extra spaces
  const cleanName = (name || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const cleanCat = (category || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const combined = `${cleanName} ${cleanCat}`;

  // 1. Direct and Keyword check in order of specificity
  for (const preset of FOOD_PRESETS) {
    for (const keyword of preset.keywords) {
      const kw = keyword.toLowerCase().trim();
      
      // Match whole word or exact substring
      if (cleanName.includes(kw) || combined.includes(kw)) {
        return preset.url;
      }

      // Handle unspaced words like 'icecream' vs 'ice cream'
      const unspacedName = cleanName.replace(/\s+/g, '');
      const unspacedKw = kw.replace(/\s+/g, '');
      if (unspacedName.includes(unspacedKw)) {
        return preset.url;
      }
    }
  }

  // 2. Category Fallbacks
  if (cleanCat.includes('breakfast')) return FOOD_PRESETS.find((p) => p.id === 'breakfast_egg').url;
  if (cleanCat.includes('dessert')) return FOOD_PRESETS.find((p) => p.id === 'icecream').url;
  if (cleanCat.includes('snack')) return FOOD_PRESETS.find((p) => p.id === 'burger').url;
  if (cleanCat.includes('beverage')) return FOOD_PRESETS.find((p) => p.id === 'beverage').url;
  if (cleanCat.includes('lunch')) return FOOD_PRESETS.find((p) => p.id === 'rice').url;
  if (cleanCat.includes('dinner')) return FOOD_PRESETS.find((p) => p.id === 'steak').url;

  return DEFAULT_PLATE_IMAGE;
}

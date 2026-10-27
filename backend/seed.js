const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
require('dotenv').config();

async function seedInitialData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('[MongoDB Connected to Atlas]:', mongoose.connection.host);

    const count = await Recipe.countDocuments();
    console.log(`Current recipe count in Atlas: ${count}`);

    if (count === 0) {
      console.log('Seeding initial recipes to MongoDB Atlas...');
      await Recipe.create([
        {
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
          cookingTime: 25
        },
        {
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
            'Pour 1/4 cup batter for each pancake. Cook until bubbles form on surface, then flip.',
            'Serve warm with maple syrup and fresh berries.'
          ],
          cookingTime: 15
        },
        {
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
          cookingTime: 20
        }
      ]);
      console.log('Seeded 3 sample recipes successfully to MongoDB Atlas!');
    }
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seedInitialData();

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import Navbar from './Navbar';
import './ProductList.css';

// Simple SVG thumbnail so every plant has an image without external hosting.
const thumb = (emoji, bg) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">` +
      `<rect width="200" height="200" fill="${bg}"/>` +
      `<text x="100" y="125" font-size="90" text-anchor="middle">${emoji}</text></svg>`
  );

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: thumb('🌿', '#e8f5e9'), description: 'Produces oxygen at night and removes toxins.', cost: 15 },
      { name: 'Spider Plant', image: thumb('🌱', '#f1f8e9'), description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: thumb('🌼', '#fff8e1'), description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: thumb('🍃', '#e0f2f1'), description: 'Adds humidity and removes pollutants.', cost: 20 },
      { name: 'Rubber Plant', image: thumb('🪴', '#e8f5e9'), description: 'Easy-care plant that absorbs toxins.', cost: 17 },
      { name: 'Aloe Vera', image: thumb('🌵', '#f9fbe7'), description: 'Purifies the air and soothes burns.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: thumb('💜', '#ede7f6'), description: 'Calming scent that promotes relaxation.', cost: 20 },
      { name: 'Jasmine', image: thumb('🤍', '#fafafa'), description: 'Sweet fragrance that uplifts the mood.', cost: 18 },
      { name: 'Rosemary', image: thumb('🌿', '#e8f5e9'), description: 'Fragrant herb that improves memory.', cost: 15 },
      { name: 'Mint', image: thumb('🍃', '#e0f7fa'), description: 'Refreshing aroma, great for teas.', cost: 12 },
      { name: 'Lemon Balm', image: thumb('🍋', '#fffde7'), description: 'Lemon scent that reduces stress.', cost: 14 },
      { name: 'Hyacinth', image: thumb('🌸', '#fce4ec'), description: 'Strong, sweet spring fragrance.', cost: 22 },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: thumb('🪴', '#e8f5e9'), description: 'Thrives in low light with little water.', cost: 25 },
      { name: 'Pothos', image: thumb('🌿', '#f1f8e9'), description: 'Trailing vine that tolerates neglect.', cost: 10 },
      { name: 'Cast Iron Plant', image: thumb('🍀', '#e0f2f1'), description: 'Nearly impossible to kill.', cost: 22 },
      { name: 'Jade Plant', image: thumb('🌳', '#f9fbe7'), description: 'Succulent that stores water in its leaves.', cost: 16 },
      { name: 'Chinese Evergreen', image: thumb('🌱', '#e8f5e9'), description: 'Tolerates low light and dry air.', cost: 19 },
      { name: 'Haworthia', image: thumb('🌵', '#fff8e1'), description: 'Small succulent that needs minimal care.', cost: 11 },
    ],
  },
];

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (name) => cartItems.some((item) => item.name === name);

  return (
    <div>
      <Navbar onNavigate={onNavigate} />
      <div className="product-grid">
        {plantsArray.map((group) => (
          <section key={group.category}>
            <h2 className="category-title">{group.category}</h2>
            <div className="plant-cards">
              {group.plants.map((plant) => (
                <div className="product-card" key={plant.name}>
                  <img className="product-image" src={plant.image} alt={plant.name} />
                  <h3 className="product-title">{plant.name}</h3>
                  <p className="product-description">{plant.description}</p>
                  <div className="product-cost">${plant.cost}</div>
                  <button
                    className="product-button"
                    disabled={isInCart(plant.name)}
                    onClick={() => dispatch(addItem(plant))}
                  >
                    {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

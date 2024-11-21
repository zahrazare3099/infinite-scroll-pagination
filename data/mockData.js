// src/mockData.js
const generateProducts = (num) => {
  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    description: `Description for Product ${index + 1}`,
    price: (Math.random() * 100).toFixed(2),
    image: `https://via.placeholder.com/150?text=Product+${index + 1}`,
  }));
};

export const products = generateProducts(200); // Generate 200 products

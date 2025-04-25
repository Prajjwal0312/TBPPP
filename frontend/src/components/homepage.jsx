import React, { useState, useEffect } from "react";
import data from "../data.json";
import Cart from "./cart";

const HomePage = ({ searchQuery }) => {
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const filtered = data.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="homepage">
      <div className="carousel">
        <img src="/home.jpg" alt="Home Banner" className="carousel-image" />
      </div>

      <div>
        <h1 className="heading">Popular Products</h1>
      </div>

      <div className="product-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Price(per item): ₹{product.price}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCartClick(product)}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <Cart product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
};

export default HomePage;
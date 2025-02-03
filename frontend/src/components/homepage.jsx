import React, { useState, useEffect } from "react";
import data from "../data.json";

const HomePage = ({ searchQuery }) => {
  const [filteredProducts, setFilteredProducts] = useState(data);

  useEffect(() => {
    const filtered = data.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  return (
    <div className="homepage">
      <div className="product-container">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

import React, { useState } from "react";
import "../css/cart.css";

const Cart = ({ product, onClose }) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="modal-content">
          <img src={product.image} alt={product.name} className="modal-image" />
          <div className="modal-details">
            <h2>{product.name}</h2>
            <p>{product.description || "Fresh Red Carrot Vegetables ready to eat"}</p>
            <div className="modal-price">
              <span className="discount-price">₹{(product.price * quantity).toFixed(2)}</span>
              <span className="original-price">₹{(product.originalPrice || (product.price * 2.2)) * quantity}</span>
            </div>
            <div className="quantity-section">
              <span>Quantity </span>
              <div className="quantity-buttons">
                <button onClick={handleDecrement}>-</button>
                <span>{quantity}</span>
                <button onClick={handleIncrement}>+</button>
              </div>
              <span className="total">= ₹{(product.price * quantity).toFixed(2)}</span>
            </div>
            <button className="modal-cart-btn">
              🛒 Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
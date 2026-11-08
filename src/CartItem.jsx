import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import Navbar from './Navbar';
import './CartItem.css';

function CartItem({ onNavigate }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const itemTotal = (item) => item.cost * item.quantity;
  const totalAmount = items.reduce((sum, item) => sum + itemTotal(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    alert('Checkout: Coming Soon!');
  };

  return (
    <div>
      <Navbar onNavigate={onNavigate} />
      <div className="cart-container">
        <h2>Total Cart Amount: ${totalAmount}</h2>
        {items.length === 0 && <p>Your cart is empty.</p>}
        {items.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit price: ${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button" onClick={() => handleDecrement(item)}>
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button" onClick={() => handleIncrement(item)}>
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${itemTotal(item)}</div>
            </div>
            <button
              className="cart-item-delete"
              onClick={() => dispatch(removeItem(item.name))}
            >
              Delete
            </button>
          </div>
        ))}
        <div className="cart-actions">
          <button className="get-started-button" onClick={() => onNavigate('plants')}>
            Continue Shopping
          </button>
          <button className="get-started-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

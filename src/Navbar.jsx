import React from 'react';
import { useSelector } from 'react-redux';

function Navbar({ onNavigate }) {
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="navbar">
      <div className="brand">🌿 Paradise Nursery</div>
      <div className="nav-links">
        <a onClick={() => onNavigate('landing')}>Home</a>
        <a onClick={() => onNavigate('plants')}>Plants</a>
        <a className="cart-link" onClick={() => onNavigate('cart')} aria-label="Cart">
          🛒
          <span className="cart-count">{totalItems}</span>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;

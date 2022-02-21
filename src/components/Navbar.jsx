import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const auth = useContext(AuthContext);

  const logoutHandler = (e) => {
    e.preventDefault();
    auth.logout();
  };

  return (
    <nav className=" blue darken-1">
      <div className="nav-wrapper container">
        <span className="brand-logo">TravelGuide</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/">Маршруты</Link>
          </li>
          <li>
            <Link to="/CreateRoute">Создать маршрут</Link>
          </li>
          <li>
            <a onClick={logoutHandler} href="/">
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

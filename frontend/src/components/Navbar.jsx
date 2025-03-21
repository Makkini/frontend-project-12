import React, {useContext} from 'react';
import {AuthContext} from "../app/AuthContext.jsx";

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">Hexlet Chat</a>
        {token && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogout}
          >
            Выйти
          </button>
        )}      </div>
    </nav>
  );
};

export default Navbar;
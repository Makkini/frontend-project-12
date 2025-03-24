import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">{t('navbar.title')}</Link>
        {token && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogout}
          >
            {t('navbar.logout')}
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
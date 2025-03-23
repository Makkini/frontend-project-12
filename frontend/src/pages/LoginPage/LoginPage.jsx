import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginCard from '../../components/FormCards/LoginCard.jsx';
import {loginUser} from "../../features/auth/authSlice.js";

const LoginPage = () => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('/api/v1/login', values);
      const { token, username } = response.data;
      dispatch(loginUser({ token, username }));
      navigate('/');
    } catch (err) {
      setError('Неверные имя пользователя или пароль');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center py-5">
        <div className="col-12 col-md-8 col-xxl-6">
          <LoginCard onSubmit={handleSubmit} error={error} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../app/AuthContext.jsx';
import LoginCard from '../../components/LoginCard.jsx';

const LoginPage = () => {
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('/api/v1/login', values);
      const { token } = response.data;
      login(token);
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
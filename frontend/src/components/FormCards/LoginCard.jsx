import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import avatar from "../../assets/images/avatar.jpg"
import {useTranslation} from "react-i18next";
const LoginCard = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(t('validation.required')),
    password: Yup.string().required(t('validation.required')),
  });

  const onSubmit = (values) => {
    dispatch(loginUser(values))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        console.error('Ошибка входа:', err);
      });
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src={avatar} className="rounded-circle" alt="Вход" />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="col-12 col-md-6 mt-3 mt-md-0">
            <h1 className="text-center mb-4">{t('login.title')}</h1>
            {error && <div className="alert alert-danger">{t('login.error')}</div>}
            <div className="form-floating mb-3">
              <Field
                name="username"
                type="text"
                className="form-control"
                placeholder="Имя пользователя"
                id="username"
              />
              <label htmlFor="username">{t('login.username')}</label>
              <ErrorMessage name="username" component="div" className="text-danger" />
            </div>
            <div className="form-floating mb-4">
              <Field
                name="password"
                type="password"
                className="form-control"
                placeholder="Пароль"
                id="password"
              />
              <label htmlFor="password">{t('login.password')}</label>
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={loading}>
              {loading ? t('loading') : t('login.submit')}
            </button>
          </Form>
        </Formik>
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>{t('login.noAccount')}</span> <Link to="/signup">{t('login.register')}</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
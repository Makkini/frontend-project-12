import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import avatar from '../../assets/images/avatar.jpg';
import {Link} from "react-router-dom";

const LoginCard = ({ onSubmit, error }) => {
  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
  });

  return (
    <div className="card shadow-sm">
      <div className="card-body row p-4">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src={avatar} className="rounded-circle" alt="Войти" />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="col-12 col-md-6 mt-3 mt-md-0">
            <h1 className="text-center mb-4">Войти</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-floating mb-3">
              <Field
                name="username"
                type="text"
                className="form-control"
                placeholder="Ваш ник"
                id="username"
              />
              <label htmlFor="username">Ваш ник</label>
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
              <label htmlFor="password">Пароль</label>
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>
            <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
              Войти
            </button>
          </Form>
        </Formik>
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>Нет аккаунта?</span> <Link to="/signup">Регистрация</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
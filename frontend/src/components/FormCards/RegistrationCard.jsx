import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import avatar_1 from '../../assets/images/avatar_1.jpg';
import {Link} from "react-router-dom";

const RegistrationCard = () => {
  const initialValues = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Обязательное поле'),
    password: Yup.string().required('Обязательное поле'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Обязательное поле'),
  });

  const onSubmit = (values) => {
    console.log(values);
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src={avatar_1} className="rounded-circle" alt="Регистрация" />
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="col-12 col-md-6 mt-3 mt-md-0">
            <h1 className="text-center mb-4">Регистрация</h1>
            <div className="form-floating mb-3">
              <Field
                name="username"
                type="text"
                className="form-control"
                placeholder="Имя пользователя"
                id="username"
              />
              <label htmlFor="username">Имя пользователя</label>
              <ErrorMessage name="username" component="div" className="text-danger" />
            </div>
            <div className="form-floating mb-3">
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
            <div className="form-floating mb-4">
              <Field
                name="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Подтвердите пароль"
                id="confirmPassword"
              />
              <label htmlFor="confirmPassword">Подтвердите пароль</label>
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </div>
            <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
              Зарегистрироваться
            </button>
          </Form>
        </Formik>
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>Уже есть аккаунт?</span> <Link to="/login">Войти</Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationCard;
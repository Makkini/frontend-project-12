import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {registerUser} from '../../features/auth/authSlice';
import avatar_1 from "../../assets/images/avatar_1.jpg"
import {useTranslation} from "react-i18next";

const RegistrationCard = () => {
  const {t} = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const onSubmit = async (values, {setSubmitting, setErrors}) => {
    try {
      await dispatch(registerUser(values)).unwrap();

      navigate('/');
    } catch (err) {
      setErrors({submit: err.message || 'Ошибка регистрации'});
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body row p-5">
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
          <img src={avatar_1} className="rounded-circle" alt="Регистрация"/>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({isSubmitting, errors}) => (
            <Form className="col-12 col-md-6 mt-3 mt-md-0">
              <h1 className="text-center mb-4">{t('registration.title')}</h1>
              {errors.submit && <div className="alert alert-danger">{t('registration.error')}</div>}
              <div className="form-floating mb-3">
                <Field
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="Имя пользователя"
                  id="username"
                />
                <label htmlFor="username">{t('registration.username')}</label>
                <ErrorMessage name="username" component="div" className="text-danger"/>
              </div>
              <div className="form-floating mb-3">
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Пароль"
                  id="password"
                />
                <label htmlFor="password">{t('registration.password')}</label>
                <ErrorMessage name="password" component="div" className="text-danger"/>
              </div>
              <div className="form-floating mb-4">
                <Field
                  name="confirmPassword"
                  type="password"
                  className="form-control"
                  placeholder="Подтвердите пароль"
                  id="confirmPassword"
                />
                <label htmlFor="confirmPassword">{t('registration.confirmPassword')}</label>
                <ErrorMessage name="confirmPassword" component="div" className="text-danger"/>
              </div>
              <button type="submit" className="w-100 mb-3 btn btn-outline-primary" disabled={isSubmitting}>
                {isSubmitting ? t('loading') : t('registration.submit')}
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="card-footer p-4">
        <div className="text-center">
          <span>{t('registration.hasAccount')}</span> <Link to="/login">{t('registration.login')}</Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationCard;
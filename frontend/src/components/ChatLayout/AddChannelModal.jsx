import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addChannel } from '../../features/chat/chatSlice';

const AddChannelModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.chat);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов')
      .required('Обязательное поле')
      .test('unique-name', 'Должно быть уникальным', (value) => {
        return !channels.some((channel) => channel.name === value);
      }),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(addChannel(values.name))
      .then(() => {
        setSubmitting(false);
        onClose();
      });
  };

  return (
    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">Добавить канал</div>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{ name: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <div>
                    <Field
                      name="name"
                      className={`mb-2 form-control ${
                        errors.name && touched.name ? 'is-invalid' : ''
                      }`}
                    />
                    <label className="visually-hidden" htmlFor="name">
                      Имя канала
                    </label>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="me-2 btn btn-secondary"
                      onClick={onClose}
                    >
                      Отменить
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      Отправить
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChannelModal;
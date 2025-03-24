import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addChannel } from '../../../features/chat/chatSlice.js';
import {filterProfanity, hasProfanity} from "../../../services/profanityFilter.js";

const AddChannelModal = ({ onClose,  onSuccess, onError }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.chat);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t('channels.minMaxError'))
      .max(20, t('channels.minMaxError'))
      .required(t('channels.required'))
      .test('no-profanity', t('validation.noProfanity'), (value) => !hasProfanity(value))
      .test('unique-name', t('channels.uniqueError'), (value) => {
        return !channels.some((channel) => channel.name === value);
      }),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const filteredName = filterProfanity(values.name);
    dispatch(addChannel(filteredName))
      .then(() => {
        onSuccess();
        setSubmitting(false);
        onClose();
      })
      .catch((error) => {
        onError(error.message);
        setSubmitting(false);
      });
  };

  return (
    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{t('channels.add')}</div>
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
                      {t('channels.cancel')}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      {t('channels.submit')}
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
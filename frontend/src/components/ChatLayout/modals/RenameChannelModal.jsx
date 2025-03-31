import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { renameChannel } from '../../../features/chat/chatSlice.js';
import {hasProfanity} from "../../../services/profanityFilter.js";

const RenameChannelModal = ({ channelId, currentName, onClose, onSuccess, onError }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { channels } = useSelector((state) => state.chat);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t('channels.minMaxError'))
      .max(20, t('channels.minMaxError'))
      .test('no-profanity', t('validation.noProfanity'), (value) => !hasProfanity(value))
      .required(t('channels.required'))
      .test('unique-name', t('channels.uniqueError'), (value) => {
        return !channels.some((channel) => channel.name === value && channel.id !== channelId);
      }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(renameChannel({ id: channelId, name: values.name })).unwrap();
      onSuccess();
      onClose();
    } catch (err) {
      onError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{t('channels.rename')}</div>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{ name: currentName }}
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

export default RenameChannelModal;
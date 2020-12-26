import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import SharedForm from 'components/shared-form';
import {
  formsInitialValue,
  validationSchema,
} from 'formik/forms-initial-values';
import { postAntiHeroAction } from '../features/anti-heroes/anti-hero.async.actions';

const AntiHeroForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={formsInitialValue}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        dispatch(postAntiHeroAction(values));
        actions.resetForm();
      }}
    >
      {() => <SharedForm />}
    </Formik>
  );
};

export default AntiHeroForm;

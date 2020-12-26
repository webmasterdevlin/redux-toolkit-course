import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import SharedForm from 'components/shared-form';
import {
  formsInitialValue,
  validationSchema,
} from 'formik/forms-initial-values';
import { postHeroAction } from 'features/heroes/hero.async.actions';

const HeroForm = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={formsInitialValue}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        dispatch(postHeroAction(values));
        actions.resetForm();
      }}
    >
      {() => <SharedForm />}
    </Formik>
  );
};

export default HeroForm;

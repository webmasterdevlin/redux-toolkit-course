import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import SharedForm from '../../../shared/shared-form';
import {
  formsInitialValue,
  validationSchema,
} from '../../../shared/forms-initial-values';
import { postHeroAction } from '../hero.async.actions';

const HeroForm: FC = () => {
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
      {formikProps => <SharedForm formikProps={formikProps} />}
    </Formik>
  );
};

export default HeroForm;

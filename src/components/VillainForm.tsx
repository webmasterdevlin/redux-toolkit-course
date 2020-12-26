import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import {
  formsInitialValue,
  validationSchema,
} from 'formik/forms-initial-values';
import SharedForm from 'components/shared-form';
import { postVillainAction } from 'features/villains/villain.async.actions';

const VillainForm: FC = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={formsInitialValue}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        dispatch(postVillainAction(values));
        actions.resetForm();
      }}
    >
      {() => <SharedForm />}
    </Formik>
  );
};

export default VillainForm;

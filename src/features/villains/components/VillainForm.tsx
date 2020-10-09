import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import {
  formsInitialValue,
  validationSchema,
} from '../../../shared/forms-initial-values';
import SharedForm from '../../../shared/shared-form';
import { postVillainAction } from '../villain.async.actions';

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
      {formikProps => <SharedForm formikProps={formikProps} />}
    </Formik>
  );
};

export default VillainForm;

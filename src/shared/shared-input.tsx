import React from 'react';
import FormB from 'react-bootstrap/Form';
import { ErrorMessage, FormikProps } from 'formik';

type Props = {
  formikProps: FormikProps<any>;
  id: string;
};

const SharedInput: React.FC<Props> = ({ formikProps, id }) => {
  return (
    <>
      <FormB.Control
        onChange={formikProps.handleChange(id)}
        onBlur={formikProps.handleBlur(id)}
        value={formikProps.values[`${id}`]}
        autoComplete={'off'}
      />
      <ErrorMessage
        name={id}
        component="div"
        className={'mt-2 alert alert-danger'}
      />
    </>
  );
};

export default SharedInput;

import React from 'react';
import { Field, FormikProps } from 'formik';
import { Box, createStyles, TextField, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

type Props = {
  formikProps: FormikProps<any>;
  id: string;
};

const SharedInput: React.FC<Props> = ({ formikProps, id }) => {
  const classes = useStyles();

  return (
    <Box mb={2}>
      <Field
        className={classes.field}
        type={'text'}
        label={id.toUpperCase()}
        name={id}
        as={TextField}
        error={formikProps.touched[`${id}`] && formikProps.errors[`${id}`]}
        helperText={formikProps.touched[`${id}`] && formikProps.errors[`${id}`]}
      />
    </Box>
  );
};

export default SharedInput;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      marginBottom: '2rem',
      width: '100%',
    },
  }),
);

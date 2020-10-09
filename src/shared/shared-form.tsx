import React, { FC } from 'react';
import { Form, FormikProps } from 'formik';
import SharedInput from './shared-input';
import { Box, Button, Paper } from '@material-ui/core';

const SharedForm: FC<{
  formikProps: FormikProps<any>;
}> = ({ formikProps }) => {
  return (
    <Box mb={4}>
      <Paper>
        <Form style={{ padding: '1rem' }}>
          <div>
            <SharedInput formikProps={formikProps} id={'firstName'} />
            <SharedInput formikProps={formikProps} id={'lastName'} />
            <SharedInput formikProps={formikProps} id={'house'} />
            <SharedInput formikProps={formikProps} id={'knownAs'} />
          </div>

          <Button
            disabled={!formikProps.dirty || !formikProps.isValid}
            type="submit"
            color={'primary'}
            variant={'outlined'}
          >
            Save Character
          </Button>
        </Form>
      </Paper>
    </Box>
  );
};

export default SharedForm;

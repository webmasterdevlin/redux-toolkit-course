import React from 'react';
import Card from 'react-bootstrap/Card';
import { Form, FormikProps } from 'formik';
import FormB from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SharedInput from './shared-input';

type Props = {
  formikProps: FormikProps<any>;
};

const SharedForm: React.FC<Props> = ({ formikProps }) => {
  return (
    <div>
      <Card bg={'light'} className={'mb-5'}>
        <Card.Body>
          <Form>
            <FormB.Group>
              <FormB.Label>First Name</FormB.Label>
              <SharedInput formikProps={formikProps} id={'firstName'} />
            </FormB.Group>

            <FormB.Group>
              <FormB.Label>Last Name</FormB.Label>
              <SharedInput formikProps={formikProps} id={'lastName'} />
            </FormB.Group>

            <FormB.Group>
              <FormB.Label>House</FormB.Label>
              <SharedInput formikProps={formikProps} id={'house'} />
            </FormB.Group>

            <FormB.Group>
              <FormB.Label>Known as</FormB.Label>
              <SharedInput formikProps={formikProps} id={'knownAs'} />
            </FormB.Group>
            <Button
              disabled={!formikProps.dirty || !formikProps.isValid}
              type="submit"
            >
              Send
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SharedForm;

import * as yup from 'yup';

export const formsInitialValue = {
  id: '',
  firstName: '',
  lastName: '',
  house: '',
  knownAs: '',
};

export const validationSchema = yup.object({
  firstName: yup.string().label('First Name').min(2).required(),
  lastName: yup.string().label('Last Name').min(2).required(),
  house: yup.string().label('House').required(),
  knownAs: yup.string().label('Known as').required(),
});

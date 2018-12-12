import React from 'react';
import { Field } from 'react-final-form';
import { OnChange } from 'react-final-form-listeners';

const WhenFieldChanges = ({ field, becomes, set, to }) => (
  <Field name={set} subscription={{}}>
    {(
      // No subscription. We only use Field to get to the change function
      { input: { onChange } }
    ) => (
        <OnChange name={field}>
          {value => {
            if (value === becomes) {
              onChange(to)
            }
          }}
        </OnChange>
      )}
  </Field>
);

export default WhenFieldChanges;

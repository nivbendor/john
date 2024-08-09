import React, { CSSProperties } from 'react';
import { Input } from './input';

const styles: { Stepper: CSSProperties } = {
  Stepper: {
    width: '80%',
    padding: '0px 8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    color: '#333',
    fontSize: '16px',
    fontFamily: 'Source Sans Pro',
    lineHeight: '25x',
    textAlign: 'center',
    outline: 'none',
  },
};

const defaultProps = {
  value: 43,
};

const InputStepper = ({ value = defaultProps.value, onChange, errors = {} }) => {
  return (
    <Input
      id="age"
      name="age"
      value={value}
      onChange={onChange}
      className={errors["Age"] ? 'border-red-500' : ''}
      type="number"
      style={styles.Stepper}
      placeholder={value.toString()}
      
    />
  );
};

export default InputStepper;

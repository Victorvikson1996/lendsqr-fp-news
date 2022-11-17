import React from 'react';
import {render} from '@testing-library/react-native';
import {RegisterScreen} from '../src/Screens/Auth';

it('Test is its renders', () => {
  const {getAllByText} = render(<RegisterScreen />);
  expect(getAllByText('Log In').length).toBe(2);
});

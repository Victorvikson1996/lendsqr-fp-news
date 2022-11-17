import React from 'react';
import {render} from '@testing-library/react-native';
import {LoginScreen} from '../src/Screens/Auth';

it('Test is its renders', () => {
  const {getAllByText} = render(<LoginScreen />);
  expect(getAllByText('Sign In').length).toBe(2);
});

import React from 'react';
import {render} from '@testing-library/react-native';
import {HomeItem} from '../src/components/Home';
import DefaultTextInput from '../src/components/DefaultTextInput/DefaultTextInput';
import {DefaultButton} from '../src/components/Buttons/Button';

it('Test by ID', () => {
  const {getAllByTestId} = render(<HomeItem />);
  const Home = getAllByTestId((testID = 'item'));
  expect(Home).toBeTruthy();
});

it('Test by ID', () => {
  const {getAllByTestId} = render(<DefaultTextInput />);
  const TextInput = getAllByTestId((testID = 'text'));
  expect(TextInput).toBeTruthy();
});

it('Test by ID', () => {
  const {getAllByTestId} = render(<DefaultButton />);
  const Button = getAllByTestId((testID = 'button'));
  expect(Button).toBeTruthy();
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

it('checks if Async Storage is used', async () => {
  await asyncOperationOnAsyncStorage();

  expect(AsyncStorage.getItem).toBeCalledWith('myKey');
});

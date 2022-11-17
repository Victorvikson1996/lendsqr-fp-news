// export default from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// somewhere in your configuration files
import AsyncStorageMock from '@react-native-async-storage/async-storage/jest/async-storage-mock';

AsyncStorageMock.multiGet = jest.fn(([keys], callback) => {
  // do something here to retrieve data
  callback([]);
});

export default AsyncStorageMock;

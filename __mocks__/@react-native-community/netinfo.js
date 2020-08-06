export default {
  fetch: () => {
    return new Promise(resolve => {
      resolve({ isConnected: true });
    });
  },
};

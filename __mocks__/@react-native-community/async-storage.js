const createAsyncStorage = () => {
  const store = {};

  return {
    setItem: (key, content) => {
      return new Promise(resolve => {
        store[key] = content;
        resolve(true);
      });
    },
    getItem: key => {
      return new Promise(resolve => {
        resolve(store[key]);
      });
    },
    multiGet: keys => {
      return new Promise(resolve => {
        const data = keys.map(k => {
          return [k, store[k]];
        });

        resolve(data);
      });
    },
  };
};

export default createAsyncStorage();

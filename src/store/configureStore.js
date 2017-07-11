import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import reducers from '../reducers';


const configureStore = () => {
  const middleware = [thunk];
  middleware.push(createLogger());

  const store = createStore(
    reducers,
    applyMiddleware(...middleware),
  );
  return store;
};

export default configureStore;

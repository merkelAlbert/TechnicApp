import omit from 'lodash-es/omit';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducer from './reducers';

const blackListTransform = createTransform(
  (inboundState, key) => {
    if (key === 'user') {
      return omit(inboundState, ['error', 'isSuccess']);
    }
    return inboundState;
  }
)

const persistConfig = {
  key: 'root',
  whitelist: ['user'],
  transforms: [blackListTransform],
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { store, persistor };

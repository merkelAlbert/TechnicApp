import omit from 'lodash-es/omit';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistCombineReducers, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from './reducers';

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

const persistedReducer = persistCombineReducers(persistConfig, reducers);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { store, persistor };

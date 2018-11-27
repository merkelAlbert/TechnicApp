import omit from 'lodash-es/omit';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers';
import { persistStore, persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const blackListTransform = createTransform(
  (inboundState, key) => {
    if (key === 'account') {
      return omit(inboundState, ['error', 'isSuccess']);
    }
    return inboundState;
  }
)

const persistConfig = {
  key: 'root',
  whitelist: ['account'],
  transforms: [blackListTransform],
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { store, persistor };

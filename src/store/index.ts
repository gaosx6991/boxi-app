import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';
import userReducer from './User';
import orderReducer from './Order';
import uploadReducer from './Upload';
import notificationReducer from './Notification';
import promoReducer from './Promo';
import balanceReducer from './Balance';
import {createBlacklistFilter} from 'redux-persist-transform-filter';

export const LOG_OUT = 'LOG_OUT';

export const STORAGE_KEY = 'boxi';

const saveSubsetBlacklistFilter = createBlacklistFilter('user', [
  'status',
  'scene',
]);

const persistConfig = {
  key: STORAGE_KEY,
  storage: AsyncStorage,
  transforms: [saveSubsetBlacklistFilter],
  whitelist: ['user'],
};

const appReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  upload: uploadReducer,
  notification: notificationReducer,
  promo: promoReducer,
  balance: balanceReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === LOG_OUT) {
    AsyncStorage.removeItem(STORAGE_KEY).then(() => {});

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: __DEV__,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './api'


const customLoggerMiddleware = store => next => action => {
  console.log('Dispatching action:', action.type);
  const result = next(action);
  console.log('Next state:', store.getState());
  return result;
};



export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware,),
})
setupListeners(store.dispatch)
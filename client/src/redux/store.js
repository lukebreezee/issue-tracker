import { createStore } from 'redux';
import { persistedReducer } from './reducer';
import { persistStore } from 'redux-persist';

//Creating store
const store = createStore(persistedReducer);

const persistor = persistStore(store);

export { store, persistor };
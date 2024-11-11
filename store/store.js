import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore,FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from "./reducer/reduser";

const persistConfig ={
    key: 'root',
    storage : AsyncStorage,
    whitelist: ['users']
}

const reducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE],
          },
        }),
})

const persistor = persistStore(store);

export default { store, persistor };
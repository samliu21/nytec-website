import { combineReducers, createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";

import authReducer from "./reducers/auth";

const rootReducer = combineReducers({
	auth: authReducer,
});

const persistConfig = {
	key: "root",
	storage: storage,
	stateReconciler: autoMergeLevel1,
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, applyMiddleware(ReduxThunk));
export const persistor = persistStore(store);

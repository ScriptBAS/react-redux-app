import { configureStore, combineReducers } from "@reduxjs/toolkit";
import errorReducer from "./errors";
import { logger } from "./middlewear/logger";
import taskReducer from "./task";

const rootReducer = combineReducers({
    errors: errorReducer,
    tasks: taskReducer
})
function createStore() {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddlewear) => getDefaultMiddlewear().concat(logger),
        devTools: process.env.NODE_ENV !== "production"
    })
}

export default createStore
import { combineReducers, Store, createStore, applyMiddleware, compose } from "redux";
import { appReducer } from "./app/AppReducer";
import ReduxThunk from 'redux-thunk';

export type RootState = ReturnType<typeof rootReducer>;
export const rootReducer = combineReducers({
    app: appReducer,
});

export const configureStore = (): Store<RootState> => {
    const reduxExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__; // Valida si posee la extension de redux de debugging
    return reduxExtension ? 
        createStore(rootReducer, undefined, compose(applyMiddleware(ReduxThunk),(window as any).__REDUX_DEVTOOLS_EXTENSION__())) 
        : createStore(rootReducer, undefined, applyMiddleware(ReduxThunk));
};

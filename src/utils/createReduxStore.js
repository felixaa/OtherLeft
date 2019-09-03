import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from '../reducers';
import { rootSaga } from '../sagas';
import { composeWithDevTools } from 'redux-devtools-extension';


const sagaMiddleware = createSagaMiddleware();

export const createReduxStore = (initialState = {}) => {
    const middlewares = [sagaMiddleware];
    const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
    const store = createStore(rootReducer, initialState, enhancer);

    sagaMiddleware.run(rootSaga);

    return store;
};

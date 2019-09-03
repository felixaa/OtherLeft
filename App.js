import React from 'react';
import { StoreContext } from 'redux-react-hook';
import { createReduxStore } from './src/utils/createReduxStore';
import { Router } from './src/containers/Router';

const store = createReduxStore();

export const App = () => {
    return (
        <StoreContext.Provider value={store}>
            <Router/>
        </StoreContext.Provider>
    )
};

export default App;

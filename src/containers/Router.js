import React from 'react';
import { useMappedState } from 'redux-react-hook';
import { useOnMount } from '../utils/useOnMount';
import { getIsAppReady } from '../reducers/appReducer';
import { actions } from '../actions';
import { useMappedActions } from '../utils/useMappedActions';
import { Playground } from './Playground';
import { Menu } from './Menu';

const mapState = state => ({
  isAppReady: getIsAppReady(state),
  currentRoute: state.router.currentScreen
});

const mapActions = {
    rehydrate: () => ({ type: actions.rehydrate }),
};

export const Router = () => {
    const { isAppReady, currentRoute } = useMappedState(mapState);
    const { rehydrate } = useMappedActions(mapActions);

    useOnMount(() => {
        rehydrate();
    });

    if (!isAppReady) {
        return null;
    }

    switch (currentRoute) {
        case 'MENU':
            return <Menu />;
        case 'PLAYGROUND':
            return <Playground />;
        default:
            return <Menu />;
    }
};

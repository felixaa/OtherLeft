import { produce } from 'immer';
import { actions } from '../actions';

export const initialState = {
    currentScreen: 'MENU'
};

export const routerReducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case actions.navigateToPlayground: {
                console.log('CAME TO PLAYGROUND');
                draft.currentScreen = 'PLAYGROUND';
                break;
            }
            case actions.navigateToMenu: {
                console.log('CAME TO MENU');
                draft.currentScreen = 'MENU';
                break;
            }
            default:
                return state;
        }
    });
};

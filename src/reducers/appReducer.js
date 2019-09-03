import { produce } from 'immer';
import { actions } from '../actions';

export const initialState = {
    isRehydrated: false,
    isRehydrating: false
};

export const appReducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case actions.rehydrate: {
                console.log('REHYDRATING....');
                draft.isRehydrating = true;
                break;
            }
            case actions.rehydrateSuccess: {
                console.log('REHYDRATE SUCCESS');
                draft.isRehydrated = true;
                draft.isRehydrating = false;
                break;
            }
            default:
                return state;
        }
    });
};

export const getIsAppReady = state => state.app.isRehydrated;

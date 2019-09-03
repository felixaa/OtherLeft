
import { produce } from 'immer';
import { actions } from '../actions';

export const initialState = {
    highScore: 0,
    score: 0
};

export const statsReducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case actions.endGame:
                if (state.highScore <= action.score) {
                   draft.highScore = action.score
                }
                break;
            case actions.rehydrateSuccess:
                draft.highScore = action.reduxState.stats.highScore
                break;
            default:
                return state

        }
    })
};

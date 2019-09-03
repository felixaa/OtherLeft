import { produce } from 'immer';
import { actions } from '../actions';
import { GameStatuses } from '../types/GameStatuses';
import { INITIAL_TIME, FOLLOW_TYPES } from '../config/constants';
import { buildCardStack } from '../utils/buildCardStack';

export const initialState = {
    gameStatus: GameStatuses.STOPPED,
    timeLeft: INITIAL_TIME,
    followThe: null,
    cardStack: [],
    score: 0,
};

export const gameReducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case actions.startGame:
                return initialState;
            case actions.timerTick:
                draft.timeLeft--;
                break;
            case actions.prepareRound:
                console.log('PREPARING ROUND...');
                draft.cardStack = buildCardStack();
                draft.followThe = FOLLOW_TYPES[Math.round(Math.random())];
                draft.gameStatus = GameStatuses.STARTING_NEW_ROUND;
                break;
            case actions.showInterlude:
                draft.gameStatus = GameStatuses.SHOWING_INTERLUDE;
                break;
            case actions.play:
                console.log('PLAYING ROUND...');
                draft.gameStatus = GameStatuses.PLAYING;
                break;
            case actions.swipe:
                action.correct ? draft.score++ : draft.score--;
                draft.followThe = FOLLOW_TYPES[Math.round(Math.random())];
                draft.cardStack.shift();
                break;
            case actions.endGame:
                console.log('END GAME CALLED');
                draft.gameStatus = GameStatuses.ENDING_GAME;
                break;
            case actions.showResult:
                console.log('SHOW RESULT CALLED');
                draft.gameStatus = GameStatuses.SHOWING_RESULT;
                break;
            default:
                return state
        }
    })
};

export const getTimeLeft = state => state.game.timeLeft;
export const getScore = state => state.game.score;
export const getCardStack = state => state.game.cardStack;

import { delay } from '../utils/delay';
import { call, put, race, select } from 'redux-saga/effects';
import { actions } from '../actions';
import { PREPARE_ROUND_DURATION, CLEAR_STACK_DURATION } from '../config/constants';
import { runGameTimerSaga } from './runGameTimerSaga';
import { getScore } from '../reducers/gameReducer';
import { checkIfStackClearSaga } from './checkIfStackClearSaga';

export const runRoundSaga = function*() {
    // WAIT FOR DURATION TO PREPARE THE ROUND
    yield put({ type: actions.prepareRound })
    yield delay(PREPARE_ROUND_DURATION)
    yield put({ type: actions.play })

    const { isTimeLimitReached, isBoardClear } = yield race({
        isTimeLimitReached: call(runGameTimerSaga),
        isStackClear: call(checkIfStackClearSaga)
    });

    if (isTimeLimitReached) {
        const score = yield select(getScore);
        console.log('SCORE: ', score);
        yield put({ type: actions.endGame, score });
        yield delay(CLEAR_STACK_DURATION);
        yield put({ type: actions.showResult });
    } else {
        const score = yield select(getScore);
        console.log('SCORE: ', score);
        yield put({ type: actions.endGame, score });
        yield delay(CLEAR_STACK_DURATION);
        yield put({ type: actions.showResult });
    }
};

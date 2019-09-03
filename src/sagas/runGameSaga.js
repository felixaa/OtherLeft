import { put } from 'redux-saga/effects';
import { actions } from './../actions/index';

export const runGameSaga = function*() {
    yield put({ type: actions.startNewRound, payload: 'some payload' });
};

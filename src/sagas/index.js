import { persistSaga } from './persistSaga';
import { all, takeEvery } from 'redux-saga/effects';
import { actions } from './../actions/index';
import { rehydrateSaga } from './rehydrateSaga';
import { runGameSaga } from './runGameSaga';
import { runRoundSaga } from './runRoundSaga';

export const rootSaga = function*() {
  yield all([
    takeEvery(actions.startGame, runGameSaga),
    takeEvery(actions.startNewRound, runRoundSaga),
    takeEvery(actions.rehydrate, rehydrateSaga),
    takeEvery(actions.endGame, persistSaga)
  ]);
};

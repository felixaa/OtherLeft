import { getTimeLeft } from './../reducers/gameReducer';
import { actions } from './../actions/index';
import { eventChannel, END } from 'redux-saga';
import { put, take, call, cancelled, select } from 'redux-saga/effects';

const countdown = (seconds) => {
    return eventChannel(emitter => {
        const interval = setInterval(() => {
        seconds -= 1;
        if (seconds > 0) {
            emitter(seconds);
        } else {
            emitter(END);
        }
    }, 1000);
        return () => {
            clearInterval(interval);
        };
    });
};

export const runGameTimerSaga = function*() {
    const timeLeft = yield select(getTimeLeft);
    const timerCountdownChannel = yield call(countdown, timeLeft);
    try {
        while (true) {
            yield take(timerCountdownChannel);
            yield put({ type: actions.timerTick });
        }
    } finally {
        if (yield cancelled()) {
            timerCountdownChannel.close();
        }
        return true;
    }
};

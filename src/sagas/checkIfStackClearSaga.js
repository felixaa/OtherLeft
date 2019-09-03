import { select, take } from 'redux-saga/effects';
import { getCardStack } from '../reducers/gameReducer';
import { actions } from '../actions';

export const checkIfStackClearSaga = function*() {
    while (true) {
        yield take(actions.swipe)
        const reduxCardStack = yield select(getCardStack);
        console.log('REDUX CARDS STACK LENGTH: ', reduxCardStack.length);
        if (reduxCardStack.length === 0) {
            return true;
        }
    }
}

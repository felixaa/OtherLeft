import AsyncStorage from '@react-native-community/async-storage';
import { select } from 'redux-saga/effects';

export const persistSaga = function*() {
    const reduxState = yield select();
    const reduxStateToPersist = { stats: reduxState.stats };

    AsyncStorage.setItem('REDUX_STATE', JSON.stringify(reduxStateToPersist));
};

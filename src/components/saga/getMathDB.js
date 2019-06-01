import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// get route to server to get the last ten math problems after that it sets the reducer with the last ten problmes

function* cardLastTen() {
  try {
    const mathInfo = yield axios({
        method: 'GET',
        url: '/mathProblems/currentlastten'
      })
      yield put({type: 'SET_LAST_TEN', payload: mathInfo.data})// sends to reducer to set the lates ten problems
  } catch (error) {
    console.log('User get request failed', error);
  }
}
function* exportSaga() {
  yield takeLatest('GET_LAST_TEN', cardLastTen);
}

export default exportSaga;
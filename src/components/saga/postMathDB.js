import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// this saga will post the current math problem to the server
function* postLastTen(action) {
  try {
    yield axios({
        method: 'post',
        url: '/mathProblems/postLastTen',
        data: action.payload,
      })
      yield put({type: 'GET_LAST_TEN'}) // this will do a GET request to the server to get the last ten problems
  } catch (error) {
    console.log('User get request failed', error);
  }
}
function* postMathProblem() {
  yield takeLatest('POST_MATH_PROBLEM', postLastTen);
}

export default postMathProblem;
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
// imports for reducers and sagas.
import rootReducer from './components/reducers/index'; 
import rootSaga from './components/saga/index';
import logger from 'redux-logger';

import App from './components/App/App';

const sagaMiddleware = createSagaMiddleware();

const middlewareList = process.env.NODE_ENV === 'development' ?
    [sagaMiddleware, logger] :
    [sagaMiddleware];

const store = createStore(
    // rootSaga contains all of our other reducers
    rootReducer,
    applyMiddleware(...middlewareList),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

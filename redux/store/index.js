import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import createRootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
export default createStore(rootReducer, applyMiddleware(sagaMiddleware));
const rootSaga = createRootSaga();
sagaMiddleware.run(rootSaga);

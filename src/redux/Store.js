import {createStore} from 'redux';
import reducer from './Reducer';

const initValues = {
    First: 0,
    Tow: 10
};

const store = createStore(reducer,initValues);

export default store;
import { EventEmitter } from "events";
import AppDispatcher from '../AppDispatcher';
import * as ActionTypes from '../ActionTypes';

const CHANGE_EVENT = 'changed';

const counterValues = {
  First: 0,
  Tow: 10
};

const CounterStore = Object.assign({}, EventEmitter.prototype, {
  getCounterValues: () => {
    return counterValues;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removerChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});


// 登记各种action回调
CounterStore.dispatchToken = AppDispatcher.register((action) => {
    if(action.type === ActionTypes.INCREMENT){
        counterValues[action.counterCaption] ++;
        CounterStore.emitChange();
    }else if(action.type === ActionTypes.DECREMENT){    
        counterValues[action.counterCaption] --;
        CounterStore.emitChange();
    }
})

export default CounterStore;

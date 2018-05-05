import { createStore, combineReducers } from 'redux';
import expensesReducer from '../reducers/expenses';
import filterReducer from '../reducers/filters';

export default () => {
  const store = createStore(
    combineReducers({ //combine reducers let us use multiple reducers in a store
      expenses: expensesReducer,
      filters: filterReducer
    })
  ); //now here we are going to use combineReducers. it takes arguments in form of object and in the object we provide key: value pair, where key is the root state name and value is reducer that supposed to manage that 

  return store;
}
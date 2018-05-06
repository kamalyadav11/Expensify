import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; //installed react-redux
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.css';


const store = configureStore();


store.dispatch(addExpense({ description: "Water Bill" })); 
store.dispatch(addExpense({ description: "Gas Bill" }));

store.dispatch(setTextFilter("water"));

setTimeout(() => {
  store.dispatch(setTextFilter("Gas"));
},3000)

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
  <Provider store={store}> 
    <AppRouter />
  </Provider>
);//provider also takes a prop that is the store that we want to share, we got our store by the same name store

ReactDOM.render(jsx, document.getElementById("app"));

//Providers provides the store to all the components that make up our application






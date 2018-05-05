import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

const addExpense = ({ description = "", note = "", amount = 0, createdAt = 0 } = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

//REMOVE EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
})

//EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

//SET_TEXT_FILTER
const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});

//SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

//SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

//SET_START-DATE
const setStartDate = (date) => ({
  type: "SET_START_DATE",
  date
});

//SET_END_DATE
const setEndDate = (date) => ({
  type: "SET_END_DATE",
  date
});

//expenses reducer => 1. Reducers are Pure Functions(Pure functions are fns whose output completely depends on input). 2. Never change state or action.
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense]; //is equal to return { state.concat(action.expense) } but we are using es6 spread operator. Thats cool
    case "REMOVE_EXPENSE":
      return state.filters(({ id }) => id !== action.id); //if id we is not equal to the id we are removing than it returns false and the item is kept but if the id matched then the item is removed
    case "EDIT_EXPENSE":
      return state.map((expense) => {
        if (expense.id === action.id) { //if the expense we are currently on is equal to expense we want to edit
          return {
            ...expense,//we are grabbing all the properties on expense + we are overriding ...action.updates 
            ...action.updates // the one thing we are updating
          }
        } else {
          return expense;
        }
      })
    default:
      return state;
  }
};


//filters reducer
const filterReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      }
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      }
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      }
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.date
      }
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.date
      }
    default:
      return state;
  }
}

//Get Visible expenses(for filtering redux data)\
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {//expenses is the complete expense array and filters we need
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
    //if(expense.description(includes) text) then => return true

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
      if(sortBy === 'date') {
        return a.createdAt < b.createdAt ? 1 : -1 //returns most recent expense
      } else if(sortBy === 'amount') {
          return a.amount < b.amount ? 1 : -1
      }
  })
};

const store = createStore(
  combineReducers({ //combine reducers let us use multiple reducers in a store
    expenses: expensesReducer,
    filters: filterReducer
  })
); //now here we are going to use combineReducers. it takes arguments in form of object and in the object we provide key: value pair, where key is the root state name and value is reducer that supposed to manage that 

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: "Rent", amount: 500, createdAt: -51000 })); //we are storing the return value so that we can use it to remove expense
const expenseTwo = store.dispatch(addExpense({ description: "Coffee", amount: 2100, createdAt: 1000 }));

// store.dispatch(removeExpense({id: expenseTwo.expense.id}));

// store.dispatch(editExpense(expenseOne.expense.id, {amount: 320}));

// store.dispatch(setTextFilter("co"));

store.dispatch(sortByAmount());

// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());

// store.dispatch(setEndDate(1250));

//console.log(expenseOne);
// const demoData = {
//   expense: [{
//     id: 'fddfdfdfd',
//     description: 'dfdfdfdf',
//     note: 'January Rent',
//     amount: 42,
//     createdAt: 0
//   }],
//   filters: {
//     text: 'rent',
//     sortBy: 'date', //date or amount,
//     startDate: undefined,
//     endDate: undefined
//   }
// };



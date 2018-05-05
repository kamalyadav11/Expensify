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

export default expensesReducer;
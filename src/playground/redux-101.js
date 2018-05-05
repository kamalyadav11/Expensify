import { createStore } from 'redux';


const incrementCount = ({incrementBy = 1} = {}) => ({ //payload will be an empty object if it does not exist
  type: "INCREMENT",
  incrementBy: incrementBy //can also be writen just as incrementBy
});

const decrementCount = ({decrementBy = 1} = {}) => ({
  type: "DECREMENT",
  decrementBy
});

const setCount = ({count} = {}) => ({
  type: "SET",
  count
});

const resetCount = () => ({
  type: "RESET",
});

const countReducer = ((state={count: 0}, action) => { //we set a default state value and second parameter is action

  switch (action.type) {
    case "INCREMENT": 
      return {
        count: state.count + action.incrementBy
      }
    case "DECREMENT":
      return {
        count: state.count - action.decrementBy
      }
    case "SET": 
      return {
        count: action.count
      }
    case "RESET": 
      return {
        count: 0
      }
    default: 
      return state
  }

})

const store = createStore(countReducer);


const unsub = store.subscribe(() => { //it rerendeers everytime the action changes means dispatch is called
  console.log(store.getState());
}) //we passed the return value of subscribe to unsub

//we craete an action and connect it to store using store.dispatch

store.dispatch(incrementCount());
store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(decrementCount());
store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(setCount({count: 101}));
store.dispatch(resetCount());
//unsub(); //we called unsub so that subscribe stop

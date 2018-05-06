import React from 'react';
import { connect } from 'react-redux';//connect connects components to redux store

const ExpenseList = (props) => (
  <div>
    <h1>Expense List</h1>
    {props.filters.text}
    {props.expenses.length}
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    filters: state.filters
  };
};

export default connect(mapStateToProps)(ExpenseList);//what we want to connect, what we want back, connect returns a object having key value pair


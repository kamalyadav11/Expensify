import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './../components/Header';
import ExpenseDashboardPage from './../components/ExpenseDashboardPage';
import AddExpenses from './../components/AddExpensePage';
import EditExpensePage from './../components/EditExpensePage';
import NotFoundPage from './../components/NotFoundPage';
import HelpPage from './../components/HelpPage';


const AppRouter = () => (
  <BrowserRouter>
  <div>
    <Header />
    <Switch>
      <Route path="/" component={ExpenseDashboardPage} exact={true} />
      <Route path="/create" component={AddExpenses} />
      <Route path="/edit/:id" component={EditExpensePage} />
      <Route path="/help" component={HelpPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </div>
</BrowserRouter>
);


export default AppRouter;

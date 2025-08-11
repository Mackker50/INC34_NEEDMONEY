import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';
import PaymentHistory from '../components/PaymentHistory';
import ExpenseReport from '../components/ExpenseReport';
import ActivityPayment from '../components/ActivityPayment';

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={LoginPage} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/payment-history" component={PaymentHistory} />
                <Route path="/expense-report" component={ExpenseReport} />
                <Route path="/activity-payment" component={ActivityPayment} />
            </Switch>
        </Router>
    );
};

export default AppRoutes;
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { ToastContainer } from "react-toastr";
import "toastr/build/toastr.css";
import "animate.css/animate.css";

import EmployeesList from './components/employees/employees'
import EmployeeNew from './components/employees/employeeNew'
import EmployeeEdit from './components/employees/employeeEdit'
import CurrenciesList from './components/currencies/currencies'
import CurrencyNew from './components/currencies/currencyNew'
import CurrencyEdit from './components/currencies/currencyEdit'

import Movements from './components/movements/movements'
import MovementsToday from './components/movements/movementsToday'

import SaleNew from './components/movements/saleNew'
import SpendingNew from './components/movements/spendingNew'

export default class App extends React.Component {
  state = {
    title: ''
  }
  constructor(props) {
    super(props)
    this.success = this.success.bind(this)
    this.warning = this.warning.bind(this)
    this.error = this.error.bind(this)
    this.setTitle = this.setTitle.bind(this)
  }
  success(title, message) {
    this.container.success(
      <span>
        <strong>{title}</strong><br/>
        <em>{message}</em>
      </span>
    );
  }

  error(title, message) {
    this.container.error(
      <span>
        <strong>{title}</strong><br/>
        <em>{message}</em>
      </span>
    );
  }

  warning(title, message) {
    this.container.warning(
      <span>
        <strong>{title}</strong><br/>
        <em>{message}</em>
      </span>
    );
  }

  setTitle(title) {
    this.setState({title: title})
  }

  render() {
    return (
      <Router>
      <div className="container">
        <ToastContainer
          ref={ref => this.container = ref}
          className="toast-top-right"
        />
        <div className="row">
          <div className="col-xs-12 col-md-2">
          </div>
          <div className="col-xs-12 col-md-10">
            <h3>{this.state.title}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-2">
            <div className="row">
              <div className="col-xs-12">
                <Link to="/">Home</Link>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <Link to="/movements/today">Today</Link>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <Link to="/movements/sale">Register Sale</Link>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <Link to="/movements/spending">Register Spending</Link>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <Link to="/movements">All Movements</Link>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <Link to="/employees">Employees</Link>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <Link to="/currencies">Currencies</Link>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-10">
            <Route exact path="/" render={(props)=><EmployeesList success={this.success} error={this.error} warning={this.warning} setTitle={this.setTitle} {...props}/>}/>
            <Route exact path="/employees" render={(props)=><EmployeesList success={this.success} error={this.error} warning={this.warning} setTitle={this.setTitle} {...props}/>}/>
            <Route exact path="/employees/new" render={(props)=><EmployeeNew success={this.success} error={this.error} warning={this.warning} setTitle={this.setTitle} {...props}/>}/>
            <Route exact path="/employees/:id/edit" render={(props)=><EmployeeEdit success={this.success} error={this.error} warning={this.warning} setTitle={this.setTitle} {...props}/>}/>
            <Route exact path="/currencies" render={(props)=><CurrenciesList success={this.success} error={this.error} warning={this.warning} setTitle={this.setTitle} {...props}/>}/>
            <Route exact path="/currencies/new" render={(props)=><CurrencyNew success={this.success} error={this.error} warning={this.warning} setTitle={this.setTitle} {...props}/>}/>
            <Route exact path="/currencies/:id/edit" render={(props)=><CurrencyEdit success={this.success} error={this.error} warning={this.warning} setTitle={this.setTitle} {...props}/>}/>
            <Route exact path="/movements" render={(props)=><Movements success={this.success} error={this.error} warning={this.warning} setTitle={this.setTitle} {...props}/>}/>
            <Route exact path="/movements/today" render={(props)=><MovementsToday success={this.success} error={this.error} warning={this.warning} setTitle={this.setTitle} {...props}/>}/>
            <Route exact path="/movements/sale" render={(props)=><SaleNew success={this.success} error={this.error} warning={this.warning} setTitle={this.setTitle} {...props}/>}/>
            <Route exact path="/movements/spending" render={(props)=><SpendingNew success={this.success} error={this.error} warning={this.warning} setTitle={this.setTitle} {...props}/>}/>
          </div>
        </div>
      </div>
      </Router>
    );
  }
}

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

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.success = this.success.bind(this)
    this.warning = this.warning.bind(this)
    this.error = this.error.bind(this)
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

  render() {
    return (
      <Router>
      <div className="container">
        <ToastContainer
          ref={ref => this.container = ref}
          className="toast-top-right"
        />
        <div className="row">
          <div className="col-xs-12 col-md-4">
            <div className="row">
              <div className="col-xs-12">
                <Link to="/">Home</Link>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <Link to="/employees">Employees</Link>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-8">
            <Route exact path="/" render={(props)=><EmployeesList success={this.success} error={this.error} warning={this.warning} {...props}/>}/>
            <Route exact path="/employees" render={(props)=><EmployeesList success={this.success} error={this.error} warning={this.warning} {...props}/>}/>
            <Route exact path="/employees/new" render={(props)=><EmployeeNew success={this.success} error={this.error} warning={this.warning} {...props}/>}/>
            <Route exact path="/employees/:id/edit" render={(props)=><EmployeeEdit success={this.success} error={this.error} warning={this.warning} {...props}/>}/>
          </div>
        </div>
      </div>
      </Router>
    );
  }
}

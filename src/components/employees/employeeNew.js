import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { displayError, API_URL } from './../utilities';
import EmployeeForm from './employeeForm'
export default class EmployeeNew extends React.Component {
  constructor(props) {
    super(props);
    this.props.setTitle("New employee")
    this.state = {doc: '', names: '', lastNames: '', birthDate: moment().subtract(20,'year'), admissionDate: moment(),
      docValid: false, namesValid: true, lastNamesValid: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(doc, names, lastNames, birthDate, admission_date) {
    axios.post(`${API_URL}employees`, {
      doc: doc,
      names: names,
      last_names: lastNames,
      birth_date: birthDate,
      admission_date: admission_date
    }).then(()=>{
      this.props.success('I am a strong title', 'I am an emphasized message');
      this.props.history.push('/employees')
    }).catch((error)=>{
      if (error.response.status === 400) {
        this.props.warning('Some errors ocurring when saving', displayError(error.response.data.errors));
      } else {
        this.props.error('Error', 'An error ocurred when creating.');
      }
    })
  }

  render() {
    return (
      <EmployeeForm handleSubmit={this.handleSubmit} {...this.props}/>
    );
  }
}



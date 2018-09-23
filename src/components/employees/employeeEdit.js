import React from 'react';
import moment from 'moment';
import axios from 'axios';
import { displayError, API_URL } from './../utilities';
import EmployeeForm from './employeeForm';

export default class EmployeeEdit extends React.Component {
  state = {doc: '', names: '', lastNames: '', birthDate: moment().subtract(20,'year'), admissionDate: moment(),
    docValid: false, namesValid: true, lastNamesValid: true
  };
  constructor(props) {
    super(props);
    this.props.setTitle("Edit employee")
    var id = this.props.match.params.id
    axios.get(`${API_URL}employees/${id}`)
    .then(res => {
      const employee = res.data.employee;
      this.form.setState({doc: employee.doc, names: employee.names, lastNames: employee.last_names,
        birthDate: moment(employee.birth_date), admissionDate: moment(employee.admission_date)});
      this.form.validate('doc', employee.doc)
      this.form.validate('names', employee.names)
      this.form.validate('lastNames', employee.last_names)
    })
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(doc, names, lastNames, birthDate, admission_date) {
    axios.put(`${API_URL}employees/${this.props.match.params.id}`, {
      doc: doc,
      names: names,
      last_names: lastNames,
      birth_date: birthDate,
      admission_date: admission_date
    }).then(()=>{
      this.props.success('Success', 'Updated employee sucessfully.');
      this.props.history.push('/employees')
    }).catch((error)=>{
      if (error.response.status === 400) {
        this.props.warning('Some errors ocurring when saving', displayError(error.response.data.errors));
      } else {
        this.props.error('Error', 'An error ocurred when updating.');
      }
    })
  }

  render() {
    return (
      <EmployeeForm onRef={ref => (this.form = ref)} handleSubmit={this.handleSubmit} {...this.props}/>
    );
  }
}

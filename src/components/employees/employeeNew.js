import React from 'react'
import moment from 'moment'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import { ToastContainer } from "react-toastr";
import 'react-datepicker/dist/react-datepicker.css';
import "toastr/build/toastr.css";
import "animate.css/animate.css";

export default class EmployeeNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {doc: '', names: '', lastNames: '', birthDate: moment().subtract(20,'year'), admissionDate: moment(),
      docValid: false, namesValid: true, lastNamesValid: true
    };

    this.handleChangeDoc = this.handleChangeDoc.bind(this);
    this.handleChangeNames = this.handleChangeNames.bind(this);
    this.handleChangeLastNames = this.handleChangeLastNames.bind(this);
    this.handleChangeBirthDate = this.handleChangeBirthDate.bind(this);
    this.handleChangeAdmissionDate = this.handleChangeAdmissionDate.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeDoc(event) { this.setState({doc: event.target.value}); this.validate('doc', event.target.value)}
  handleChangeNames(event) {this.setState({names: event.target.value}); this.validate('names', event.target.value)}
  handleChangeLastNames(event) {this.setState({lastNames: event.target.value}); this.validate('lastNames', event.target.value)}
  handleChangeBirthDate(value) {this.setState({birthDate: value}); }
  handleChangeAdmissionDate(value) {this.setState({admissionDate: value}); }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.docValid && this.state.namesValid && this.state.lastNamesValid) {
      axios.post('http://localhost:3001/employees', {
        doc: this.state.doc,
        names: this.state.names,
        last_names: this.state.lastNames,
        birth_date: this.state.birthDate.format("YYYY-MM-DD"),
        admission_date: this.state.admissionDate.format("YYYY-MM-DD")
      }).then(()=>{
        this.props.success('I am a strong title', 'I am an emphasized message');
        this.props.history.push('/employees')
      }).catch(()=>{
        this.props.error('Error', 'An error ocurred when creating.');
      })
    } else {
      this.props.warning('Warning', 'Solve the validation problems first');
    }
  }

  validate(field, value) {
    switch(field) {
      case 'doc':
        this.setState({docValid: value.length === 8 && value.trim().match(/^[0-9]+$/) !== null})
        break;
      case 'names':
        this.setState({namesValid: value.length <= 100})
        break;
      case 'lastNames':
        this.setState({lastNamesValid: value.length <= 100})
        break;
      default:
        return
    }
  }

  render() {
    return (
      <div>
        <ToastContainer
          ref={ref => this.container = ref}
          className="toast-top-right"
        />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label >Document</label>
            <input className="form-control" type="text" value={this.state.doc} onChange={this.handleChangeDoc} />
            { !this.state.docValid ? (<span className="help-block text-danger">Should be 8 digits.</span>) : (<span></span>)}
          </div>
          <div className="form-group">
            <label >Names</label>
            <input className="form-control" type="text" value={this.state.names} onChange={this.handleChangeNames}/>
            { !this.state.namesValid ? (<span className="help-block text-danger">Should be less than 100 characters.</span>) : (<span></span>)}
          </div>
          <div className="form-group">
            <label >Last Names</label>
            <input className="form-control" type="text" value={this.state.lastNames} onChange={this.handleChangeLastNames}/>
            { !this.state.lastNamesValid ? (<span className="help-block text-danger">Should be less than 100 characters.</span>) : (<span></span>)}
          </div>
          <div className="form-group">
            <label >Birthdate</label>
            <DatePicker selected={this.state.birthDate} onChange={this.handleChangeBirthDate} showYearDropdown scrollableYearDropdown yearDropdownItemNumber={30}/>
          </div>
          <div className="form-group">
            <label >AdmissionDate</label>
            <DatePicker selected={this.state.admissionDate} onChange={this.handleChangeAdmissionDate} showYearDropdown scrollableYearDropdown yearDropdownItemNumber={30}/>
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
}



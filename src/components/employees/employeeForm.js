import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {doc: props.doc, names: props.names, lastNames: props.lastNames,
      birthDate: props.birthDate, admissionDate: props.admissionDate};
    this.validate('doc', props.doc)
    this.validate('names', props.names)
    this.validate('lastNames', props.lastNames)

    this.handleChangeDoc = this.handleChangeDoc.bind(this);
    this.handleChangeNames = this.handleChangeNames.bind(this);
    this.handleChangeLastNames = this.handleChangeLastNames.bind(this);
    this.handleChangeBirthDate = this.handleChangeBirthDate.bind(this);
    this.handleChangeAdmissionDate = this.handleChangeAdmissionDate.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  handleChangeDoc(event) { this.setState({doc: event.target.value}); this.validate('doc', event.target.value)}
  handleChangeNames(event) {this.setState({names: event.target.value}); this.validate('names', event.target.value)}
  handleChangeLastNames(event) {this.setState({lastNames: event.target.value}); this.validate('lastNames', event.target.value)}
  handleChangeBirthDate(value) {this.setState({birthDate: value}); }
  handleChangeAdmissionDate(value) {this.setState({admissionDate: value}); }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.docValid && this.state.namesValid && this.state.lastNamesValid) {
      this.props.handleSubmit(this.state.doc, this.state.names, this.state.lastNames, this.state.birthDate.format("YYYY-MM-DD"), this.state.admissionDate.format("YYYY-MM-DD"))
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

EmployeeForm.defaultProps = {
  doc: '',
  names: '',
  lastNames: '',
  birthDate: moment().subtract(20,'year'),
  admissionDate: moment(),
  docValid: false,
  namesValid: false,
  lastNamesValid: false
};

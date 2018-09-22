import React from 'react';
import moment from 'moment';
import axios from 'axios';
import DatePicker from 'react-datepicker';

export default class SpendingNew extends React.Component {
  state = {date: moment(), code: '', description: '', amount: '', currencyId: '', employeeId: '', codes: [], currencies: [], employees: [],
    codeValid: false, descriptionValid: false, amountValid: false, currencyValid: false, employeeValid: true
  };
  constructor(props) {
    super(props);
    this.props.setTitle("New Spending")
    axios.get(`http://localhost:3001/movements/spending_codes`)
    .then(res => {
      const codes = res.data.codes;
      this.setState({codes: codes });
    })
    axios.get(`http://localhost:3001/currencies/all`)
    .then(res => {
      const currencies = res.data.currencies;
      this.setState({currencies: currencies });
    })
    axios.get(`http://localhost:3001/employees/all`)
    .then(res => {
      const employees = res.data.employees;
      this.setState({employees: employees });
    })
    this.handleChangedDate = this.handleChangedDate.bind(this);
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeCurrencyId = this.handleChangeCurrencyId.bind(this);
    this.handleChangeEmployeeId = this.handleChangeEmployeeId.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangedDate(value) { this.setState({date: value}); }
  handleChangeCode(event) {this.setState({code: event.target.value}); this.validate('code', event.target.value)}
  handleChangeDescription(event) {this.setState({description: event.target.value}); this.validate('description', event.target.value)}
  handleChangeAmount(event) {this.setState({amount: event.target.value}); this.validate('amount', event.target.value) }
  handleChangeCurrencyId(event) {this.setState({currencyId: event.target.value}); this.validate('currencyId', event.target.value) }
  handleChangeEmployeeId(event) {this.setState({employeeId: event.target.value}); this.validate('employeeId', event.target.value) }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.codeValid && this.state.descriptionValid && this.state.amountValid && this.state.currencyValid && this.state.employeeValid) {
      axios.post('http://localhost:3001/movements/spending', {
        spending: {
          date: this.state.date.format("YYYY-MM-DD"),
          code: this.state.code,
          description: this.state.description,
          amount: this.state.amount,
          currency_id: this.state.currencyId,
          employee_id: this.state.employeeId
        }
      }).then(()=>{
        this.props.success('Success', 'Sale saved sucessfully.');
        this.props.history.push('/movements')
      }).catch(()=>{
        this.props.error('Error', 'An error ocurred when creating.');
      })
    } else {
      this.props.warning('Warning', 'Solve the validation problems first');
    }
  }

  validate(field, value) {
    switch(field) {
      case 'code':
        this.setState({codeValid: value.length > 0 && value.length <= 50})
        if (value === "2") {
          this.setState({employeeValid: this.state.employeeId.length > 0})
        } else {
          this.setState({employeeValid: true})
        }
        break;
      case 'description':
        this.setState({descriptionValid: value.length > 0 && value.length <= 300})
        break;
      case 'amount':
        this.setState({amountValid: value.length <= 100 && this.isFloat(value) && parseFloat(value) > 0})
        break;
      case 'currencyId':
        this.setState({currencyValid: value.length > 0})
        break;
      case 'employeeId':
        if (this.state.code === "2") {
          this.setState({employeeValid: value.length > 0})
        } else {
          this.setState({employeeValid: true})
        }
        break;
      default:
        return
    }
  }

  isFloat(n) {
    return parseFloat(n.match(/^-?\d*(\.\d+)?$/))>0;
  }

  render() {
    var currencyOptions = this.state.currencies.map((currency)=>{return <option key={currency.id} value={currency.id}>{currency.name}</option>;})
    var employeeOptions = this.state.employees.map((employee)=>{return <option key={employee.id} value={employee.id}>{employee.names + ", " + employee.last_names}</option>;})
    var codeOptions = this.state.codes.map((code)=>{return <option key={code.code} value={code.code}>{code.name}</option>;})
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Date</label>
            <DatePicker selected={this.state.date} onChange={this.handleChangeDate} showYearDropdown scrollableYearDropdown yearDropdownItemNumber={30}/>
          </div>
          <div className="form-group">
            <label>Code</label>
            <select className="form-control" onChange={this.handleChangeCode}>
              <option>Select an code</option>
              { codeOptions }
            </select>
            { !this.state.codeValid ? (<span className="help-block text-danger">Please choose a code.</span>) : (<span></span>)}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" value={this.state.description} onChange={this.handleChangeDescription}></textarea>
            { !this.state.descriptionValid ? (<span className="help-block text-danger">Should be less than 300 characters.</span>) : (<span></span>)}
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input className="form-control" type="text" value={this.state.amount} onChange={this.handleChangeAmount}/>
            { !this.state.amountValid ? (<span className="help-block text-danger">Should be a number bigger than 0.</span>) : (<span></span>)}
          </div>
          <div className="form-group">
            <label>Currency</label>
            <select className="form-control" onChange={this.handleChangeCurrencyId}>
              <option>Select a currency</option>
              { currencyOptions }
            </select>
            { !this.state.currencyValid ? (<span className="help-block text-danger">Please choose a currency.</span>) : (<span></span>)}
          </div>
          <div className="form-group">
            <label>Employee</label>
            <select className="form-control" onChange={this.handleChangeEmployeeId}>
              <option>Select an employee</option>
              { employeeOptions }
            </select>
            { !this.state.employeeValid ? (<span className="help-block text-danger">Please choose a employee.</span>) : (<span></span>)}
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
}

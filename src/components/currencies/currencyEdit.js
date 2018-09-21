import React from 'react'
import axios from 'axios';
import { ToastContainer } from "react-toastr";
import "toastr/build/toastr.css";
import "animate.css/animate.css";

export default class EmployeeNew extends React.Component {
  state = {code: '', name: '', sign: '', rate: '', codeValid: false, nameValid: false, signValid: false, rateValid: false};
  constructor(props) {
    super(props);
    var id = this.props.match.params.id
    axios.get(`http://localhost:3001/currencies/${id}`)
    .then(res => {
      const currency = res.data.currency;
      this.setState({code: currency.code, name: currency.name, sign: currency.sign,
        rate: currency.rate, codeValid: true, nameValid: true, signValid: true, rateValid: true
      });
    })
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSign = this.handleChangeSign.bind(this);
    this.handleChangeRate = this.handleChangeRate.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeCode(event) { this.setState({code: event.target.value}); this.validate('code', event.target.value)}
  handleChangeName(event) {this.setState({name: event.target.value}); this.validate('name', event.target.value)}
  handleChangeSign(event) {this.setState({sign: event.target.value}); this.validate('sign', event.target.value)}
  handleChangeRate(event) {this.setState({rate: event.target.value}); this.validate('rate', event.target.value)}

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.codeValid && this.state.nameValid && this.state.signValid && this.state.rateValid) {
      axios.put('http://localhost:3001/currencies/' + this.props.match.params.id, {
        code: this.state.code,
        name: this.state.name,
        sign: this.state.sign,
        rate: this.state.rate
      }).then(()=>{
        this.props.success('Success', 'Updated currency sucessfully.');
        this.props.history.push('/currencies')
      }).catch(()=>{
        this.props.error('Error', 'An error ocurred when updating.');
      })
    } else {
      this.props.warning('Warning', 'Solve the validation problems first');
    }
  }

  validate(field, value) {
    switch(field) {
      case 'code':
        this.setState({codeValid: value.length > 0 && value.length <= 100})
        break;
      case 'name':
        this.setState({nameValid: value.length > 0 && value.length <= 100})
        break;
      case 'sign':
        this.setState({signValid: value.length > 0 && value.length <= 100})
        break;
      case 'rate':
        this.setState({rateValid: value.length > 0 && this.isFloat(value) && parseFloat(value) > 0})
        break;
      default:
        return
    }
  }

  isFloat(n) {
    return parseFloat(n.match(/^-?\d*(\.\d+)?$/))>0;
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
            <label >Code</label>
            <input className="form-control" type="text" value={this.state.code} onChange={this.handleChangeCode} />
            { !this.state.codeValid ? (<span className="help-block text-danger">Should be less than 100 characters.</span>) : (<span></span>)}
          </div>
          <div className="form-group">
            <label >Name</label>
            <input className="form-control" type="text" value={this.state.name} onChange={this.handleChangeName}/>
            { !this.state.nameValid ? (<span className="help-block text-danger">Should be less than 20 characters.</span>) : (<span></span>)}
          </div>
          <div className="form-group">
            <label >Sign</label>
            <input className="form-control" type="text" value={this.state.sign} onChange={this.handleChangeSign}/>
            { !this.state.signValid ? (<span className="help-block text-danger">Should be less than 20 characters.</span>) : (<span></span>)}
          </div>
          <div className="form-group">
            <label >Rate</label>
            <input className="form-control" type="text" value={this.state.rate} onChange={this.handleChangeRate}/>
            { !this.state.rateValid ? (<span className="help-block text-danger">Should be a number bigger than 0.</span>) : (<span></span>)}
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    );
  }
}

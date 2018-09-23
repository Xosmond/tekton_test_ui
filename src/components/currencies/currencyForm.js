import React from 'react';

export default class CurrencyEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {code: props.code, name: props.name, sign: props.sign, rate: props.rate};
    this.validate('code', props.code)
    this.validate('name', props.name)
    this.validate('sign', props.sign)
    this.validate('rate', props.rate)
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeSign = this.handleChangeSign.bind(this);
    this.handleChangeRate = this.handleChangeRate.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  handleChangeCode(event) { this.setState({code: event.target.value}); this.validate('code', event.target.value)}
  handleChangeName(event) {this.setState({name: event.target.value}); this.validate('name', event.target.value)}
  handleChangeSign(event) {this.setState({sign: event.target.value}); this.validate('sign', event.target.value)}
  handleChangeRate(event) {this.setState({rate: event.target.value}); this.validate('rate', event.target.value)}

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.codeValid && this.state.nameValid && this.state.signValid && this.state.rateValid) {
      this.props.handleSubmit(this.state.code, this.state.name, this.state.sign, this.state.rate)
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

CurrencyEdit.defaultProps = {
  code: '',
  name: '',
  sign: '',
  rate: '',
  codeValid: false,
  nameValid: false,
  signValid: false,
  rateValid: false,
};

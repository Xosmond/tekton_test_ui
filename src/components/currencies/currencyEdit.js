import React from 'react'
import axios from 'axios';
import { displayError, API_URL } from './../utilities';
import CurrencyForm from './currencyForm';

export default class CurrencyEdit extends React.Component {
  constructor(props) {
    super(props);
    this.props.setTitle("Edit Currency")
    var id = this.props.match.params.id
    axios.get(`${API_URL}currencies/${id}`)
    .then(res => {
      const currency = res.data.currency;
      this.form.setState({code: currency.code, name: currency.name, sign: currency.sign, rate: currency.rate});
      this.form.validate('code', currency.code)
      this.form.validate('name', currency.name)
      this.form.validate('sign', currency.sign)
      this.form.validate('rate', currency.rate)
    })
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(code, name, sign, rate) {
    axios.put(`${API_URL}currencies/${this.props.match.params.id}`, {
      code: code,
      name: name,
      sign: sign,
      rate: rate
    }).then(()=>{
      this.props.success('Success', 'Updated currency sucessfully.');
      this.props.history.push('/currencies')
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
      <CurrencyForm onRef={ref => (this.form = ref)} handleSubmit={this.handleSubmit} {...this.props}/>
    );
  }
}

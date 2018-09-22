import React from 'react'
import axios from 'axios';
import { displayError, API_URL } from './../utilities';
import CurrencyForm from './currencyForm';

export default class CurrencyNew extends React.Component {
  constructor(props) {
    super(props);
    this.props.setTitle("New Currency")
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(code, name, sign, rate) {
    axios.post(`${API_URL}currencies`, {
      code: code,
      name: name,
      sign: sign,
      rate: rate
    }).then(()=>{
      this.props.success('Success', 'Currency created sucessfully.');
      this.props.history.push('/currencies')
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
      <CurrencyForm handleSubmit={this.handleSubmit} {...this.props}/>
    );
  }
}

import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import displayError from './../utilities'

export default class CurrencyItem extends React.Component {
  constructor(props) {
    super(props);
    this.destroy = this.destroy.bind(this)
  }
  destroy() {
    axios.delete(`http://localhost:3001/currencies/${this.props.currency.id}`)
    .then(() => {
      this.props.success('Success', 'Currency deleted sucessfully.');
      this.props.getCurrencies(1)
    }).catch((error)=>{
      if (error.response.status === 400) {
        this.props.warning('You can not delete this currency', displayError(error.response.data.errors));
      } else {
        this.props.error('Error', 'An error ocurred when deleting.');
      }
    })
  }

  render() {
    var code = this.props.currency.code
    var name = this.props.currency.name
    var sign = this.props.currency.sign
    var rate = this.props.currency.rate
    return (
      <tr>
        <td>{ code }</td>
        <td>{ name }</td>
        <td>{ sign }</td>
        <td>{ rate }</td>
        <td>
          <Link className="btn btn-warning btn-sm" to={"/currencies/"+this.props.currency.id+"/edit"}>Edit</Link>&nbsp;&nbsp;
          <button className="btn btn-danger btn-sm" onClick={this.destroy}>Delete</button>
        </td>
      </tr>
    );
  }
}

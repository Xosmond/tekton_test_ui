import React from 'react'
import axios from 'axios';
import CurrencyItem from './currency'
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class CurrenciesList extends React.Component {
  state = {
    currencies: [],
    page: 1,
    isLoading: false,
    count: 0
  }
  constructor(props) {
    super(props)
    this.getCurrencies = this.getCurrencies.bind(this)
  }

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies(number = this.state.page) {
    this.setState({ isLoading: true, page: number });
    axios.get(`http://localhost:3001/currencies`, {params: {page: number}})
    .then(res => {
      const currencies = res.data.currencies;
      const count = res.data.count
      this.setState({ currencies: currencies, isLoading: false, count: count });
    })
  }

  render() {
    const loading = this.state.isLoading;
    const currencies = this.state.currencies;
    const perPage = 10
    let content;

    if (loading) {
      content = <tr><td colSpan="3">Loading</td></tr>;
    } else {
      var props = this.props
      content = currencies.map((currency)=>{return <CurrencyItem key={currency.id} currency={ currency } getCurrencies={this.getCurrencies} {...props}/>;})
    }

    let items = [];
    for (let number = 1; number <= Math.ceil(this.state.count/perPage); number++) {
      items.push(
        <Pagination.Item key={number} active={number === this.state.page} onClick={()=>{this.getCurrencies(number)}}>{number}</Pagination.Item>
      );
    }

    const paginationBasic = <Pagination bsSize="medium">{items}</Pagination>;

    return (
      <div className="row">
        <div className="col-xs-12 text-right">
          <Link className="btn btn-sm btn-primary" to="/currencies/new">Add</Link>
        </div>
        <div className="col-xs-12">
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Sign</th>
                <th>Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { content }
            </tbody>
          </table>
          {paginationBasic}
        </div>
      </div>
    );
  }
}

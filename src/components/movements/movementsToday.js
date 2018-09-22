import React from 'react'
import axios from 'axios';
import moment from 'moment';
import MovementItem from './movement'
import { Pagination } from 'react-bootstrap';
import { API_URL } from './../utilities';

export default class MovementsToday extends React.Component {
  state = {
    movements: [],
    page: 1,
    isLoading: false,
    count: 0
  }
  constructor(props) {
    super(props)
    this.props.setTitle("Today Movements")
    this.getMovements = this.getMovements.bind(this)
  }

  componentDidMount() {
    this.getMovements();
  }

  getMovements(number = this.state.page) {
    this.setState({ isLoading: true, page: number });
    axios.get(`${API_URL}movements`, {params: {page: number, start: moment().format("YYYY-MM-DD"), end: moment().format("YYYY-MM-DD")}})
    .then(res => {
      const movements = res.data.movements;
      const count = res.data.count
      this.setState({ movements: movements, isLoading: false, count: count });
    })
  }

  render() {
    const loading = this.state.isLoading;
    const movements = this.state.movements;
    const perPage = 10
    let content;

    if (loading) {
      content = <tr><td colSpan="3">Loading</td></tr>;
    } else {
      var props = this.props
      content = movements.map((movement)=>{return <MovementItem key={movement.id} movement={ movement } getMovements={this.getMovements} {...props}/>;})
    }

    let items = [];
    for (let number = 1; number <= Math.ceil(this.state.count/perPage); number++) {
      items.push(
        <Pagination.Item key={number} active={number === this.state.page} onClick={()=>{this.getMovements(number)}}>{number}</Pagination.Item>
      );
    }

    const paginationBasic = <Pagination bsSize="medium">{items}</Pagination>;

    return (
      <div className="row">
        <div className="col-xs-12">
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Date & Time</th>
                <th>Descripcion</th>
                <th>Currency</th>
                <th>Amount</th>
                <th>Box Amount</th>
                <th>Box All Amount</th>
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

import React from 'react'
import axios from 'axios';
import EmployeeItem from './employee'
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class EmployeesList extends React.Component {
  state = {
    employees: [],
    page: 1,
    isLoading: false,
    count: 0
  }
  constructor(props) {
    super(props)
    this.props.setTitle("Employees")
    this.getEmployees = this.getEmployees.bind(this)
  }

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees(number = this.state.page) {
    this.setState({ isLoading: true, page: number });
    axios.get(`http://localhost:3001/employees`, {params: {page: number}})
    .then(res => {
      const employees = res.data.employees;
      const count = res.data.count
      this.setState({ employees: employees, isLoading: false, count: count });
    })
  }

  render() {
    const loading = this.state.isLoading;
    const employees = this.state.employees;
    const perPage = 10
    let content;

    if (loading) {
      content = <tr><td colSpan="3">Loading</td></tr>;
    } else {
      var props = this.props
      content = employees.map((employee)=>{return <EmployeeItem key={employee.id} employee={ employee } getEmployees={this.getEmployees} {...props}/>;})
    }

    let items = [];
    for (let number = 1; number <= Math.ceil(this.state.count/perPage); number++) {
      items.push(
        <Pagination.Item key={number} active={number === this.state.page} onClick={()=>{this.getEmployees(number)}}>{number}</Pagination.Item>
      );
    }

    const paginationBasic = <Pagination bsSize="medium">{items}</Pagination>;

    return (
      <div className="row">
        <div className="col-xs-12 text-right">
          <Link className="btn btn-sm btn-primary" to="/employees/new">Add</Link>
        </div>
        <div className="col-xs-12">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
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

import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class EmployeeItem extends React.Component {
  constructor(props) {
    super(props);
    this.destroy = this.destroy.bind(this)
  }
  destroy() {
    axios.delete(`http://localhost:3001/employees/${this.props.employee.id}`)
    .then(() => {
      this.props.success('Success', 'Employee deleted sucessfully.');
      this.props.getEmployees(1)
    }).catch(()=>{
      this.props.error('Error', 'An error ocurred when deleting.');
    })
  }

  render() {
    var doc = this.props.employee.doc
    var fullname = this.props.employee.names + ", " + this.props.employee.last_names
    return (
      <tr>
        <td>{ doc }</td>
        <td>{ fullname }</td>
        <td>
          <Link className="btn btn-warning btn-sm" to={"/employees/"+this.props.employee.id+"/edit"}>Edit</Link>&nbsp;&nbsp;
          <button className="btn btn-danger btn-sm" onClick={this.destroy}>Delete</button>
        </td>
      </tr>
    );
  }
}

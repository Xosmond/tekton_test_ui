import React from 'react';
import moment from 'moment';

export default class MovementItem extends React.Component {
  render() {
    return (
      <tr>
        <td>{ this.props.movement.type }</td>
        <td>{ moment(this.props.movement.created_at).format("MMMM Do YYYY, h:mm:ss a") }</td>
        <td>{ this.props.movement.description }</td>
        <td>{ this.props.movement.currency.name }</td>
        <td>{ this.props.movement.currency.sign } { this.props.movement.amount }</td>
        <td>{ this.props.movement.currency.sign } { this.props.movement.box_amount }</td>
        <td>{ this.props.movement.real_amount } - { this.props.movement.box_all_amount }</td>
      </tr>
    );
  }
}

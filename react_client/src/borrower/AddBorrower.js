import React, { Component } from 'react';
import axios from 'axios';
import myserver from '../myserver.json';
import myauth from '../Auth';

class Addborrower extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      borrower_id: '',
      firstname: '',
      lastname: '',
      phone: '',
      streetAddress:'',
      postalCode:''
    };
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  handleSubmit = event => {
    event.preventDefault();

    const { borrower_id, firstname, lastname, phone,streetAddress,postalCode } = this.state;

    axios
      .post(myserver.url+'/borrower/', { borrower_id, firstname, lastname, phone,streetAddress,postalCode },
      {
        auth:myauth
      })
      .then(res => {
        if(res.data.errno>0) {
          this.setState({
            message: "ERROR: "+res.data.sqlMessage
          });
        }
        else {
          this.props.history.push('/borrowerlist');
        }
      })
      .catch(error => {
        this.setState({
          message: "ERROR: You are not authorized "
        });
      })
  };

  render() {
    return (
      <div className="container">
        <h2>Add borrower</h2>
        <p className="error">{this.state.message}</p>
        <form onSubmit={this.handleSubmit}>
        <table>
          <thead></thead>
          <tbody>
            <tr><th>borrower_id:</th><td><input type="number" name="borrower_id" onChange={this.onChange} /></td></tr>
            <tr><th>Firstname:</th><td><input type="text" name="firstname" onChange={this.onChange} /></td></tr>
            <tr><th>Lastname:</th><td><input type="text" name="lastname" onChange={this.onChange} /></td></tr>
            <tr><th>Phone:</th><td><input type="text" name="phone" onChange={this.onChange} /></td></tr>
            <tr><th>Streetaddress:</th><td><input type="text" name="streetAddress" onChange={this.onChange} /></td></tr>
            <tr><th>Postalcode:</th><td><input type="text" name="postalCode" onChange={this.onChange} /></td></tr>
            <tr><th></th><td> <button className="btn btn-primary" type="submit">Add</button></td></tr>
          </tbody>
        </table>
        </form>
      </div>
    );
  }
}

export default Addborrower;

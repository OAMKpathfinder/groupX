import React, { Component } from 'react';
import axios from 'axios';
import myserver from '../myserver.json';

class AddBorrow extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    var curr_a = new Date();
    curr_a.setDate(curr_a.getDate() + 0);
    var date_a = curr_a.toISOString().substr(0,10);

    var curr_b = new Date();
    curr_b.setDate(curr_b.getDate() + 21);
    var date_b = curr_b.toISOString().substr(0,10);

    this.state = {
      book_id: '',
      borrower_id: '',
      borrow_date: date_a,
      return_date: date_b,
      message:''
    };

  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  handleSubmit = event => {
    event.preventDefault();

    const { book_id, borrower_id, borrow_date, return_date } = this.state;

    axios
      .post(myserver.url+'/borrow/', { book_id, borrower_id, borrow_date, return_date })
      .then(res => {
        console.log(res.data);
        if(res.data.errno>0) {
          this.setState({
            message: "ERROR: "+res.data.sqlMessage
          });
        }
        else {
          this.props.history.push('/borrowlist');
        }
        
        
      });
  };

  render() {
    return (
      <div className="container">
        <h2>Add Borrow</h2>
        <p className="error">{this.state.message}</p>
        <form onSubmit={this.handleSubmit}>
        <table>
          <thead></thead>
          <tbody>
            <tr><th>book_id:</th><td><input type="number" name="book_id" onChange={this.onChange} /></td></tr>
            <tr><th>borrower_id:</th><td><input type="text" name="borrower_id" onChange={this.onChange} /></td></tr>
            <tr><th>Borrow date:</th><td><input type="date" name="borrow_date" onChange={this.onChange} defaultValue={this.state.borrow_date} /></td></tr>
            <tr><th>Return date:</th><td><input type="date" name="return_date" onChange={this.onChange} defaultValue={this.state.return_date}  /></td></tr>
            <tr><th></th><td> <button className="btn btn-primary" type="submit">Add</button></td></tr>
          </tbody>
        </table>
        </form>
      </div>
    );
  }
}

export default AddBorrow;

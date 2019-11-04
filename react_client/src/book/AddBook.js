import React, { Component } from 'react';
import axios from 'axios';
import myserver from '../myserver.json';
import myauth from '../Auth';

class AddBook extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      book_id: '',
      name: '',
      author: '',
      isbn: '',
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
    const { book_id, name, author, isbn } = this.state;

    axios
      .post(myserver.url+'/book', { book_id, name, author, isbn },
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
          this.props.history.push('/booklist');
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
        <h2>Add Book</h2>
        <p className="error">{this.state.message}</p>
        <form onSubmit={this.handleSubmit}>
        <table>
          <thead></thead>
          <tbody>
            <tr><th>book_id:</th><td><input type="number" name="book_id" onChange={this.onChange} /></td></tr>
            <tr><th>Name:</th><td><input type="text" name="name" onChange={this.onChange} /></td></tr>
            <tr><th>Author:</th><td><input type="text" name="author" onChange={this.onChange} /></td></tr>
            <tr><th>ISBN:</th><td><input type="text" name="isbn" onChange={this.onChange} /></td></tr>
            <tr><th></th><td> <button className="btn btn-primary" type="submit">Add</button></td></tr>
          </tbody>
        </table>
        </form>
      </div>
    );
  }
}

export default AddBook;

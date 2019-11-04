import React, { Component } from 'react';
import axios from 'axios';
import myserver from '../myserver.json';

class Deleteborrower extends Component {
  constructor() {
    super();
    this.delete = this.delete.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.state = {
      borrower_id: 1
    };
  }

  updateInputValue(val) {
    this.setState({ borrower_id: val.target.value });
  }
  delete = event => {
    event.preventDefault();
    const id = this.state.borrower_id;

    axios
      .delete(myserver.url+'/borrower/' + id)

      .then(res => {
        console.log(res);
        console.log(res.data);
        this.props.history.push('/showborrower');
      });
  };

  render() {
    return (
      <div className="container">
        <h2>Delete borrower</h2>
        <label>borrower_id:</label>
        <input type="number" onChange={this.updateInputValue} min="1" />

        <button className="button" onClick={this.delete}>
          Delete
        </button>
      </div>
    );
  }
}

export default Deleteborrower;

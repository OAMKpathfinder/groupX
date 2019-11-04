import React, { Component } from 'react';
import axios from 'axios';
import { NavLink} from 'react-router-dom';
import myserver from '../myserver.json';

  class BorrowerList extends Component {
    constructor() {
      super();
      this.state = {
        borrower: []
      };
    }
    componentDidMount() {
      axios.get(myserver.url+'/borrower/').then(res => {
        const borrower = res.data;
        this.setState({ borrower });
      });
    }

    render() {
      return (
        <div className="container">
          <h2>borrower</h2>
          <a href="/addborrower"><button className="btn btn-primary">Add new borrower</button></a>
          <table className="table table-hover table-condensed">
            <thead>
              <tr><th>ID</th><th>Firstname</th><th>Lastname</th><th>Phone</th><th>Street Address</th><th>Postal Code</th><th>Select</th></tr>
            </thead>
            <tbody>
              {this.state.borrower.map(borrower => (
              <tr key={borrower.borrower_id}>
              <td>{borrower.borrower_id}</td>
              <td>{borrower.firstname}</td>
              <td>{borrower.lastname}</td>
              <td>{borrower.phone}</td>
              <td>{borrower.streetAddress}</td>
              <td>{borrower.postalCode}</td>
                <td><NavLink to={`selectedborrower/${borrower.borrower_id}`}><button className="btn btn-primary">Select</button></NavLink></td>       
                </tr>         
              ))}

            </tbody>
          </table>
        
        </div>
      );
    }
  }

  export default BorrowerList;

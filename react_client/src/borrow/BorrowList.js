import React, { Component } from 'react';
import axios from 'axios';
import { NavLink} from 'react-router-dom';
import myserver from '../myserver.json';

  class borrowList extends Component {
    constructor() {
      super();
      this.state = {
        borrow: []
      };
    }
    
    componentDidMount() {
      axios.get(myserver.url+'/borrow/').then(res => {
        const borrow = res.data;
        this.setState({ borrow });
      });
    }

    render() {
      return (
        <div className="container">
          <NavLink to={`addborrow`}><button className="btn btn-primary">Add new borrow</button></NavLink>
          <h2>borrow</h2>
          <table className="table table-hover table-condensed">
          <thead>
              <tr><th colSpan="2">Book</th><th colSpan="4">Borrower</th></tr>
              <tr><th>ID</th><th>Book name</th><th>Firstname</th><th>Lastname</th><th>Return date</th><th>Select</th></tr>
          </thead>
            <tbody>
              {this.state.borrow.map(borrow => (
              <tr key={borrow.book_id}>
                <td>{borrow.book_id}</td>
                <td>{borrow.name}</td>
                <td>{borrow.firstname}</td>
                <td>{borrow.lastname}</td>
                <td>{borrow.ret_date}</td>
                <td><NavLink to={`selectedborrow/${borrow.book_id}`}><button className="btn btn-primary">Select</button></NavLink></td>       
              </tr>         
              ))}

            </tbody>
          </table>
        </div>
      );
    }
  }

  export default borrowList;

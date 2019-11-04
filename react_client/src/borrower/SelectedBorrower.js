import React, { Component } from 'react';
import axios from 'axios';
import { NavLink} from 'react-router-dom';
import myserver from '../myserver.json';

class SelectedBorrower extends Component {
    constructor(props) {
        super(props);
        this.getborrower = this.getborrower.bind(this);
        this.state = {
        borrower: []
        };
        this.getborrower(this.props.match.params.id);
    }

    getborrower(borrower_id) {
        axios.get(myserver.url+'/borrower/'+borrower_id).then(res => {
        const borrower = res.data;
        this.setState({ borrower });
        });
        }
      
      render() {
        return (
          <div className="container">
            <h2>Selected Borrower</h2>
            <table className="table">
              <thead>
                
              </thead>
              
                {this.state.borrower.map(borrower => (
                <tbody key={borrower.borrower_id}>
                <tr><th>ID</th><td>{borrower.borrower_id}</td></tr>
                <tr><th>Firstname</th><td>{borrower.firstname}</td></tr>
                <tr><th>Lastname</th><td>{borrower.lastname}</td></tr>    
                <tr><th>Phone</th><td>{borrower.phone}</td></tr>    
                <tr><th>Streetaddress</th><td>{borrower.streetAddress}</td></tr>   
                <tr><th>Postalcode</th><td>{borrower.postalCode}</td></tr>                    
                </tbody>         
                ))}
            </table>
            <NavLink to={`/updateborrower/${this.props.match.params.id}`}><button className="btn btn-primary">Update</button></NavLink>
              &nbsp;
            <NavLink to={`/deleteselectedborrower/${this.props.match.params.id}`}><button className="btn btn-danger">Delete</button></NavLink>
          </div>
        );
      }
    }
export default SelectedBorrower;


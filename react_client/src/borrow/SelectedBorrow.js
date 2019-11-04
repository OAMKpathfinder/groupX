import React, { Component } from 'react';
import axios from 'axios';
import { NavLink} from 'react-router-dom';
import myserver from '../myserver.json';

class SelectedBorrow extends Component {
    constructor(props) {
        super(props);
        this.getBorrow = this.getBorrow.bind(this);
        this.state = {
        borrow: []
        };
        this.getBorrow(this.props.match.params.id);
    }

    getBorrow(book_id) {
        console.log('get borrow');
        axios.get(myserver.url+'/borrow/'+book_id).then(res => {
        const borrow = res.data;
        this.setState({ borrow });
        });
        }
      
      render() {
        return (
          <div className="container">
            <h2>Selected Borrow</h2>
            <table className="table">
              <thead>
                
              </thead>
              
                {this.state.borrow.map(borrow => (
                <tbody key={borrow.book_id}>
                <tr><th>ID</th><td>{borrow.book_id}</td></tr>
                <tr><th>Book name</th><td>{borrow.name}</td></tr>
                <tr><th>Firstname</th><td>{borrow.firstname}</td></tr>    
                <tr><th>Lastname</th><td>{borrow.lastname}</td></tr>    
                <tr><th>Return date</th><td>{borrow.ret_date}</td></tr>                     
                </tbody>         
                ))}
            </table>
            <NavLink to={`/updateborrow/${this.props.match.params.id}`}><button className="btn btn-primary">Update</button></NavLink>
            &nbsp;
            <NavLink to={`/deleteselectedborrow/${this.props.match.params.id}`}><button className="btn btn-danger">Delete</button></NavLink>
          </div>
        );
      }
    }
export default SelectedBorrow;


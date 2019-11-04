import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import myserver from '../myserver.json';
import myauth from '../Auth';

class DeleteSelectedBook extends Component {
    constructor(props) {
        console.log('delete book constructor');
        super(props);
        this.delete = this.delete.bind(this);
        this.state = {
            book_id: this.props.match.params.id
          };
    }

      delete = event => {
        event.preventDefault();       
        const id = this.state.book_id;
        console.log('id='+id);
        axios
          .delete(myserver.url+'/book/' + id,
          {
            auth:myauth
          })
          .then(res => {
            console.log(res);
            console.log(res.data);
            this.props.history.push('/booklist');
          })
          .catch(error => {
            this.setState({
              message: "ERROR: You are not authorized "
            });
          });
      };
    render() {
        return (
            <div className="container">
                     <p className="error">{this.state.message}</p>
                <p>Do you really want to delete this book?</p>
                <button className="btn btn-danger" onClick={this.delete}>Delete</button>
                <NavLink to={`/selectedbook/${this.state.book_id}`}><button className="btn btn-primary">Cancel</button></NavLink>
            </div>
        );
    }
}

export default DeleteSelectedBook;
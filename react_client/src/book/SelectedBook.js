import React, { Component } from 'react';
import axios from 'axios';
import { NavLink} from 'react-router-dom';
import myserver from '../myserver.json';

class SelectedBook extends Component {
    constructor(props) {
        super(props);
        this.getBook = this.getBook.bind(this);
        this.state = {
        book: []
        };
        this.getBook(this.props.match.params.id);
    }

    getBook(book_id) {
        console.log('get book');
        axios.get(myserver.url+'/book/'+book_id).then(res => {
        const book = res.data;
        this.setState({ book });
        });
        }
      
      render() {
        return (
          <div className="container">
            <h2>Selected Book</h2>
            <table className="table">
              <thead>
                
              </thead>
              
                {this.state.book.map(book => (
                <tbody key={book.book_id}>
                <tr><th>ID</th><td>{book.book_id}</td></tr>
                <tr><th>Book name</th><td>{book.name}</td></tr>
                <tr><th>Author</th><td>{book.author}</td></tr>    
                <tr><th>ISBN</th><td>{book.isbn}</td></tr>                     
                </tbody>         
                ))}
            </table>
            <NavLink to={`/updatebook/${this.props.match.params.id}`}><button className="btn btn-primary">Update</button></NavLink>
            &nbsp;
            <NavLink to={`/deleteselectedbook/${this.props.match.params.id}`}><button className="btn btn-danger">Delete</button></NavLink>
          </div>
        );
      }
    }
export default SelectedBook;


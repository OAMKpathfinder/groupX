import React, { Component } from 'react';
import axios from 'axios';
import { NavLink} from 'react-router-dom';
import myserver from '../myserver.json';


  class BookList extends Component {
    constructor() {
      super();
      this.sortByNameAsc = this.sortByNameAsc.bind(this);
      this.sortByNameDesc = this.sortByNameDesc.bind(this);

      this.sortByAuthorAsc = this.sortByAuthorAsc.bind(this);
      this.sortByAuthorDesc = this.sortByAuthorDesc.bind(this);

      this.sortByIdAsc = this.sortByIdAsc.bind(this);
      this.sortByIdDesc = this.sortByIdDesc.bind(this);
      this.state = {
        book: []
      };

    }


    componentDidMount() {
      axios.get(myserver.url+'/book').then(res => {
        const book = res.data;
        this.setState({ book });
      });
    }

    sortByNameAsc(){
      this.state.book.sort( (left, right) => {
        if ( left.name < right.name )
          return -1;
        else if ( left.name > right.name )
          return 1;
        else
          return 0;
      });
      this.forceUpdate();
    }
    sortByNameDesc(){
      this.state.book.sort( (right, left) => {
        if ( left.name < right.name )
          return -1;
        else if ( left.name > right.name )
          return 1;
        else
          return 0;
      });
      this.forceUpdate();
    }
    sortByAuthorAsc(){
      this.state.book.sort( (left, right) => {
        if ( left.author < right.author )
          return -1;
        else if ( left.author > right.author )
          return 1;
        else
          return 0;
      });
      this.forceUpdate();  
    }
    sortByAuthorDesc(){
      this.state.book.sort( (right, left) => {
        if ( left.author < right.author )
          return -1;
        else if ( left.author > right.author )
          return 1;
        else
          return 0;
      });
      this.forceUpdate();  
    }
    sortByIdAsc(){
      this.state.book.sort( (left, right) => {
        if ( left.book_id < right.book_id )
          return -1;
        else if ( left.book_id > right.book_id )
          return 1;
        else
          return 0;
      });
      this.forceUpdate();  
    }
    sortByIdDesc(){
      this.state.book.sort( (right, left) => {
        if ( left.book_id < right.book_id )
          return -1;
        else if ( left.book_id > right.book_id )
          return 1;
        else
          return 0;
      });
      this.forceUpdate();  
    }
    searchBook = e => {
      var search = e.target.value;
      if(search==='') {
        this.componentDidMount();
      }
      else if(e.target.name==='searchName')
      {
        console.log(search);
        axios.get(myserver.url+'/book/name/'+search).then(res => {
          const book = res.data;
          this.setState({ book });
          document.getElementById("searchAuthor").value='';
        });
      }
      else {
        axios.get(myserver.url+'/book/author/'+search).then(res => {
          const book = res.data;
          this.setState({ book });
          document.getElementById("searchName").value='';
        });
      }
    };

     
    render() {
      return (
        <div className="container">
          <h2>book</h2>
          <p>  
          <NavLink to={`addbook`}><button className="btn btn-primary">Add new book</button></NavLink>
          </p>
          <p className="form-inline">
            <label>Name of the book </label> &nbsp;
            <input className="form-control" id="searchName" type="text" name="searchName" onKeyUp={this.searchBook} placeholder="Search" />
             &nbsp;
            <label>Author of the book </label> &nbsp;
            <input className="form-control" id="searchAuthor" type="text" name="searchAuthor" onKeyUp={this.searchBook} placeholder="Search" />
          </p>
          <table className="table table-hover table-condensed">
            <thead>
              <tr>
              <th>Id <button onClick={this.sortByIdAsc}>&#9660;</button> <button onClick={this.sortByIdDesc}>&#9650;</button></th>
              <th>Book name <button onClick={this.sortByNameAsc}>&#9660;</button> <button onClick={this.sortByNameDesc}>&#9650;</button></th>
              <th>Author <button onClick={this.sortByAuthorAsc}>&#9660;</button> <button onClick={this.sortByAuthorDesc}>&#9650;</button></th>
              <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {this.state.book.map(book => (
              <tr key={book.book_id}>
                <td>{book.book_id}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td><NavLink to={`selectedbook/${book.book_id}`}><button className="btn btn-primary">Select</button></NavLink></td>       
              </tr>         
              ))}

            </tbody>
          </table>
        </div>
      );
    }
  }

  export default BookList;

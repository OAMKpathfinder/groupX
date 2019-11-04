import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import BookList from './book/BookList';
import AddBook from './book/AddBook';
import UpdateBook from './book/UpdateBook';
import SelectedBook from './book/SelectedBook'
import DeleteSelectedBook from './book/DeleteSelectedBook';

import BorrowerList from './borrower/BorrowerList';
import AddBorrower from './borrower/AddBorrower';
import UpdateBorrower from './borrower/UpdateBorrower';
import SelectedBorrower from './borrower/SelectedBorrower'
import DeleteSelectedBorrower from './borrower/DeleteSelectedBorrower';

import BorrowList from './borrow/BorrowList';
import AddBorrow from './borrow/AddBorrow';
import UpdateBorrow from './borrow/UpdateBorrow';
import SelectedBorrow from './borrow/SelectedBorrow'
import DeleteSelectedBorrow from './borrow/DeleteSelectedBorrow';

import { NavLink, Route, BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {

    return (
      <BrowserRouter>
      <div>
        <div className="menu">
          <ul>
            <li>
              <NavLink to="/home" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/booklist">book</NavLink>
            </li>
            <li>
              <NavLink to="/borrowerList">borrower</NavLink>
            </li>
            <li>
              <NavLink to="/borrowList">borrow</NavLink>
            </li>
            <hr/>
          </ul>
        </div>
        <div className="container">
        <div className="myPage">
        <h1>Library example</h1>
          <Route path="/home" exact component={Home} />
          <Route path="/booklist" exact component={BookList} />
          <Route path="/addbook" exact component={AddBook} />
          <Route path="/updatebook/:id" exact component={UpdateBook} />
          <Route path="/selectedbook/:id" exact component={SelectedBook} />
          <Route path="/deleteselectedbook/:id" exact component={DeleteSelectedBook} />


          <Route path="/borrowerlist" exact component={BorrowerList} />
          <Route path="/addborrower" exact component={AddBorrower} />
          <Route path="/updateborrower/:id" exact component={UpdateBorrower} />
          <Route path="/selectedborrower/:id" exact component={SelectedBorrower} />
          <Route path="/deleteselectedborrower/:id" exact component={DeleteSelectedBorrower} />
 
          <Route path="/borrowlist" exact component={BorrowList} />
          <Route path="/addborrow" exact component={AddBorrow} />
          <Route path="/updateborrow/:id" exact component={UpdateBorrow} />
          <Route path="/selectedborrow/:id" exact component={SelectedBorrow} />
          <Route path="/deleteselectedborrow/:id" exact component={DeleteSelectedBorrow} />
 
        </div>
      </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;

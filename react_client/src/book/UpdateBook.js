import React, { Component } from 'react';
import axios from 'axios';
import myserver from '../myserver.json';
import myauth from '../Auth';

class UpdateBook extends Component {
  constructor(props) {
    console.log('update_const');
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.getbook = this.getbook.bind(this);
    this.getSelected = this.getSelected.bind(this);
      this.state = {
      book_id: this.props.match.params.id,
      name: '',
      author: '',
      isbn: ''
    };
    this.getSelected(this.props.match.params.id);

  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };
  getSelected(book_id) {
    axios.get(myserver.url+'/book/'+book_id).then(res => {
      const state = {
        name: res.data[0].name,
        author: res.data[0].author,
        isbn: res.data[0].isbn
      };
      this.setState(state);
    });
    }

  getbook(val) {
    this.setState({ book_id: val.target.value });
    axios.get(myserver.url+'/book/' + val.target.value).then(res => {
      const state = {
        name: res.data[0].name,
        author: res.data[0].author,
        isbn: res.data[0].isbn
      };
      this.setState(state);
    });
  }

  updateInputValue(val) {
    this.setState({ book_id: val.target.value });
    console.group("update");
  }
  handleSubmit = event => {
    console.log("update handle");
    event.preventDefault();
    const id = this.state.book_id;
    const { name, author, isbn } = this.state;

    axios
      .put(myserver.url+'/book/' + id, {name, author,isbn},
      {
        auth:myauth
      })
      .then(res => {
        this.props.history.push('/booklist');
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
        <h2>Update Book</h2>
        <p className="error">{this.state.message}</p>
        <table>
          <tbody>
            <tr>
              <td width="80px">
                <label> Book ID:</label>
              </td>
              <td>
                <input
                  type="number"
                  name="book_id"
                  onChange={this.getbook}
                  value={this.state.book_id}
                  min="1"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <form onSubmit={this.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td width="80px">
                  <label>Name</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label>Author</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="author"
                    onChange={this.onChange}
                    value={this.state.author}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>ISBN</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="isbn"
                    onChange={this.onChange}
                    value={this.state.isbn}
                  />
                </td>
              </tr>
              <tr>
                <td />
                <td>
                  <button className="btn btn-primary" type="submit">
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default UpdateBook;

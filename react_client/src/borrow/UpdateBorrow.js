import React, { Component } from 'react';
import axios from 'axios';
import myserver from '../myserver.json';
import myauth from '../Auth';

class UpdateBorrow extends Component {
  constructor(props) {
    console.log('update_const');
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.getborrow = this.getborrow.bind(this);
    this.getSelected = this.getSelected.bind(this);
      this.state = {
      book_id: this.props.match.params.id,
      name: '',
      firstname: '',
      lastname: '',
      ret_date: ''
    };
    this.getSelected(this.props.match.params.id);

  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };
  getSelected(book_id) {
    axios.get(myserver.url+'/borrow/'+book_id).then(res => {
      const state = {
        name: res.data[0].name,
        firstname: res.data[0].firstname,
        lastname: res.data[0].lastname,
        ret_date: res.data[0].ret_date
      };
      this.setState(state);
    });
    }

  getborrow(val) {
    this.setState({ book_id: val.target.value });
    axios.get(myserver.url+'/borrow/' + val.target.value).then(res => {
      const state = {
        name: res.data[0].name,
        firstname: res.data[0].firstname,
        lastname: res.data[0].lastname,
        ret_date: res.data[0].ret_date
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
    const { name, firstname,lastname, ret_date } = this.state;

    axios
      .put(myserver.url+'/borrow/' + id, {
        name,
        firstname,
        lastname,
        ret_date
      },
      {
        auth:myauth
      })
      .then(res => {
        this.props.history.push('/borrowlist');
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
        <h2>Update Borrow</h2>
        <p className="error">{this.state.message}</p>
        <table>
          <tbody>
            <tr>
              <td width="80px">
                <label> Borrow ID:</label>
              </td>
              <td>
              <label>{this.state.bookd_id}</label>
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
                    <label>{this.state.name}</label>
                </td>
              </tr>

              <tr>
                <td>
                  <label>Firstname</label>
                </td>
                <td>
                    <label>{this.state.firstname}</label>
                </td>
              </tr>
              <tr>
                <td>
                <label>Lastname</label>
                </td>
                <td>
                <label>{this.state.lastname}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Return date</label>
                </td>
                <td>
                  <input
                    type="date"
                    name="ret_date"
                    onChange={this.onChange}
                    value={this.state.ret_date}
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

export default UpdateBorrow;

import React, { Component } from 'react';
import axios from 'axios';
import myserver from '../myserver.json';
import myauth from '../Auth';

class UpdateBorrower extends Component {
  constructor(props) {
    console.log('update_borrower_const');
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.getborrower = this.getborrower.bind(this);
    this.getSelected = this.getSelected.bind(this);
      this.state = {
      borrower_id: this.props.match.params.id,
      firstname: '',
      lastname: '',
      phone: '',
      streetAddress:'',
      postalCode:''
    };
    this.getSelected(this.props.match.params.id);
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };
  getSelected(borrower_id) {
    axios.get(myserver.url+'/borrower/'+borrower_id).then(res => {
      const state = {
        firstname: res.data[0].firstname,
        lastname: res.data[0].lastname,
        phone: res.data[0].phone,
        streetAddress: res.data[0].streetAddress,
        postalCode: res.data[0].postalCode
      };
      this.setState(state);
    });
    }

  getborrower(val) {
    this.setState({ borrower_id: val.target.value });
    axios.get(myserver.url+'/borrower/' + val.target.value).then(res => {
      const state = {
        firstname: res.data[0].firstname,
        lastname: res.data[0].lastname,
        phone: res.data[0].phone,
        streetAddress: res.data[0].streetAddress,
        postalCode: res.data[0].postalCode
      };
      this.setState(state);
    });
  }

  updateInputValue(val) {
    this.setState({ borrower_id: val.target.value });
  }
  handleSubmit = event => {
    console.log("update handle");
    event.preventDefault();
    const id = this.state.borrower_id;
    const { firstname, lastname, phone,streetAddress,postalCode } = this.state;
    console.log(this.state);

    axios
      .put(myserver.url+'/borrower/' + id, {
        firstname,
        lastname,
        phone,
        streetAddress,
        postalCode
      },
      {
        auth:myauth
      })
      .then(res => {
        this.props.history.push('/borrowerlist');
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
        <h2>Update borrower</h2>
        <p className="error">{this.state.message}</p>
        <table>
          <tbody>
            <tr>
              <td width="80px">
                <label> borrower ID:</label>
              </td>
              <td>
                <input
                  type="number"
                  name="borrower_id"
                  onChange={this.getborrower}
                  value={this.state.borrower_id}
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
                    name="firstname"
                    value={this.state.firstname}
                    onChange={this.onChange}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label>lastname</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="lastname"
                    onChange={this.onChange}
                    value={this.state.lastname}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>phone</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="phone"
                    onChange={this.onChange}
                    value={this.state.phone}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>streetAddress</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="streetAddress"
                    onChange={this.onChange}
                    value={this.state.streetAddress}
                  />
                </td>
              </tr>

              <tr>
                <td>
                  <label>postalCode</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="postalCode"
                    onChange={this.onChange}
                    value={this.state.postalCode}
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

export default UpdateBorrower;

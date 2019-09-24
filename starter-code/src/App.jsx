import React, { Component } from "react";
import contacts from "./contacts.json";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.state.contacts = contacts.slice(0, 5);
    this.addRandom = this.addRandom.bind(this);
    this.sortName = this.sortName.bind(this);
    this.sortPopularity = this.sortPopularity.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }

  makeRow(contact, key) {
    return (
      <tr key={key}>
        <td>
          <img src={contact.pictureUrl} width="100px" alt="" />
        </td>
        <td>{contact.name}</td>
        <td>{contact.popularity.toFixed(2)}</td>
        <td>
          <button
            onClick={() => {
              this.deleteContact(key);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }

  addRandom() {
    let randomIndex = Math.floor(Math.random() * contacts.length);
    this.setState({
      contacts: [...this.state.contacts, contacts[randomIndex]]
    });
  }

  sortName() {
    const newArray = this.state.contacts.slice();
    const sortMethod = (personA, personB) => {
      if (personA.name > personB.name) {
        return 1;
      } else if (personA.name < personB.name) {
        return -1;
      } else {
        return 0;
      }
    };
    newArray.sort(sortMethod);
    this.setState({ contacts: newArray });
  }

  sortPopularity() {
    const newArray = this.state.contacts.slice();
    const sortMethod = (personA, personB) => {
      return personB.popularity - personA.popularity;
    };
    newArray.sort(sortMethod);
    this.setState({ contacts: newArray });
  }

  deleteContact(key) {
    const newArray = this.state.contacts.slice();
    newArray.splice(key, 1);
    this.setState({ contacts: newArray });
  }

  render() {
    return (
      <div className="App">
        <h1>IronContacts</h1>
        <button onClick={this.addRandom}>Add random contact</button>
        <br />
        <button onClick={this.sortName}>Sort by name</button>
        <br />
        <button onClick={this.sortPopularity}>Sort by popularity</button>
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contacts.map((contact, index) => {
              return this.makeRow(contact, index);
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;

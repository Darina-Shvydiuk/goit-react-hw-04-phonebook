import React, { Component } from 'react';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import s from './App.module.css';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState, prevProps) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handelFormSubmit = data => {
    const contactName = data.name.toLowerCase();
    if (
      this.state.contacts.find(
        recordName => recordName.name.toLowerCase() === contactName
      )
    ) {
      alert(`${data.name} is already in contacts.`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, data],
      };
    });
  };

  handleFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  handleDelete = toDelete => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== toDelete),
      };
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    const filterContacts = contacts.filter(recordName =>
      recordName.name.toLowerCase().includes(normalizedFilter)
    );

    return (
      <div className={s.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handelFormSubmit} />

        <h2>Contacts</h2>
        <Filter filter={filter} handleFilter={this.handleFilter} />
        <ContactList
          contacts={filterContacts}
          handleDelete={this.handleDelete}
        />
      </div>
    );
  }
}

import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import { AppContainer, MainTitle, SecondTitle } from './App.styled';

const INITIAL_STATE_BASE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
};

export class App extends Component {
  state = { ...INITIAL_STATE_BASE };

  addContact = data => {
    if (this.state.contacts.find(contact => contact.name === data.name)) {
      alert(`${data.name} is already in contacts`);
      return;
    }

    const contact = { ...data, id: nanoid() };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = id => {
    const afterDeleteArr = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: [...afterDeleteArr] });
  };

  onChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContact = () => {
    const { filter, contacts } = this.state;
    const normalizedFilterQuery = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilterQuery)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContact();
    const isContact = !this.state.contacts.length ? false : true;

    return (
      <AppContainer>
        <MainTitle>Phonebook</MainTitle>
        <ContactForm formSubmitHandler={this.addContact} />
        <SecondTitle>Contacts</SecondTitle>
        <Filter onChangeFilter={this.onChangeFilter} value={filter} />
        <ContactList
          contactList={filteredContacts}
          deleteContact={this.deleteContact}
          isContact={isContact}
          contactsAmount={this.state.contacts.length}
        />
      </AppContainer>
    );
  }
}

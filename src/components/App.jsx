import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import initialBaseContacts from './Data/initialBaseContacts.json';

import { AppContainer, MainTitle, SecondTitle } from './App.styled';

const INITIAL_STATE_BASE = {
  contacts: [...initialBaseContacts],
  filter: '',
};

export class App extends Component {
  state = { ...INITIAL_STATE_BASE };

  /**
   * function that creates a new contact
   * @param {Object} data
   * @returns used to stop the execution of a function
   */
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

  /**
   * a function that deletes a contact
   * @param {String} id
   */
  deleteContact = id => {
    const afterDeleteArr = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: [...afterDeleteArr] });
  };

  /**
   * function that updates the state of the class for data filtering
   * @param {Event} e
   */
  onChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  /**
   * function that creates a filtered array of contacts
   * @returns filtered contact array
   */
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

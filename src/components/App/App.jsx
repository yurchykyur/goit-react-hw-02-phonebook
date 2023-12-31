import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import ContactAmount from 'components/ContactAmount';
import Notification from 'components/Notification';

import initialBaseContacts from 'Data/initialBaseContacts';

import { AppContainer, MainTitle, SecondTitle } from './App.styled';

const INITIAL_STATE_BASE = {
  contacts: [...initialBaseContacts],
  filter: '',
};

export default class App extends Component {
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
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
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
        <ContactAmount
          contactsAmount={this.state.contacts.length}
        ></ContactAmount>
        {isContact ? (
          <ContactList
            contactList={filteredContacts}
            deleteContact={this.deleteContact}
          />
        ) : (
          <Notification
            message={'There are no contacts in your phonebook'}
          ></Notification>
        )}
      </AppContainer>
    );
  }
}

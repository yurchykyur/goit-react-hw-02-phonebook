import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import {
  FormWrapper,
  ContactSubmitForm,
  FormInputLabel,
  FormInput,
  FormSubmitBtn,
} from './ContactForm.styled';

const INITIAL_STATE_FORM = {
  name: '',
  number: '',
};

export default class ContactForm extends Component {
  state = { ...INITIAL_STATE_FORM };

  /**
   * function that updates the state of the class with the data entered in the field
   * @param {Event} e
   */
  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  /**
   * a function that clears the form by writing the initial data from the state class to it
   */
  reset = () => {
    this.setState({ ...INITIAL_STATE_FORM });
  };

  /**
   * function that raises the state of the class to the level of the parent
   * @param {Event} e
   */
  handleFormSubmit = e => {
    e.preventDefault();

    this.props.formSubmitHandler(this.state);
    this.reset();
  };

  nameInputId = nanoid();

  numberInputId = nanoid();

  render() {
    return (
      <FormWrapper>
        <ContactSubmitForm onSubmit={this.handleFormSubmit}>
          <FormInputLabel htmlFor={this.nameInputId}>
            Name
            <FormInput
              type="text"
              name="name"
              placeholder="John Wick"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleInputChange}
              id={this.nameInputId}
              value={this.state.name}
            />
          </FormInputLabel>

          <FormInputLabel htmlFor={this.numberInputId}>
            Phone number
            <FormInput
              type="tel"
              name="number"
              placeholder="+380501234567"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleInputChange}
              id={this.numberInputId}
              value={this.state.number}
            />
          </FormInputLabel>
          <FormSubmitBtn type="submit">Add contact</FormSubmitBtn>
        </ContactSubmitForm>
      </FormWrapper>
    );
  }
}

ContactForm.propTypes = {
  formSubmitHandler: PropTypes.func.isRequired,
};

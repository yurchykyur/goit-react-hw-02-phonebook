import React, { Component } from 'react';
import { nanoid } from 'nanoid';

const INITIAL_STATE_FORM = {
  name: '',
  number: '',
};

export default class ContactForm extends Component {
  state = { ...INITIAL_STATE_FORM };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
    console.log(e.currentTarget.value);
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE_FORM });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    this.props.formSubmitHandler(this.state);
    this.reset();
  };

  nameInputId = nanoid();

  numberInputId = nanoid();

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <h2>Name</h2>
        <label htmlFor={this.nameInputId}>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleInputChange}
            id={this.nameInputId}
            value={this.state.name}
          />
        </label>

        <label htmlFor={this.numberInputId}>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleInputChange}
            id={this.numberInputId}
            value={this.state.number}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
// } ({ handleInputChange, handleFormSubmit }) {

// }

// onSubmit={}

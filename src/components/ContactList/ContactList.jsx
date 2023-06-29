import PropTypes from 'prop-types';

import {
  NotificationText,
  ListElement,
  PhonebookList,
  TotalContactsNum,
  TotalContactsText,
  ContactItemWrapper,
  ContactItemName,
  ContactItemNum,
  DeleteBtn,
} from './ContactList.styled';

export default function ContactList({
  contactList,
  deleteContact,
  isContact,
  contactsAmount,
}) {
  return isContact ? (
    <>
      <TotalContactsText>
        Contacts amount: <TotalContactsNum>{contactsAmount}</TotalContactsNum>
      </TotalContactsText>
      <PhonebookList>
        {contactList.map(({ id, number, name }) => {
          return (
            <ListElement key={id}>
              <ContactItemWrapper>
                <ContactItemName>{name}</ContactItemName>
                <ContactItemNum href={`tel:${number}`}>{number}</ContactItemNum>
                <DeleteBtn onClick={() => deleteContact(id)}>Delete</DeleteBtn>
              </ContactItemWrapper>
            </ListElement>
          );
        })}
      </PhonebookList>
    </>
  ) : (
    <NotificationText>There are no contacts in your phonebook</NotificationText>
  );
}

ContactList.propTypes = {
  contactList: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
  isContact: PropTypes.bool.isRequired,
  contactsAmount: PropTypes.number.isRequired,
};

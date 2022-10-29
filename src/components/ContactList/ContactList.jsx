import React from 'react';
import PropTypes from 'prop-types';
import { List } from './ContactList.styled';
import ContactItem from 'components/ContactItem/ContactItem';


export default function ContactList({ items, removeContact }) {
  return (
    <List>
      {
        items.map(({ name, phone, id }) => (
          <ContactItem key={id} id={id} name={name} phone={phone} removeContact={removeContact} />
        ))}
    </List>
  );
};


ContactList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    phone: PropTypes.string,
  })),
    removeContact: PropTypes.func,
}

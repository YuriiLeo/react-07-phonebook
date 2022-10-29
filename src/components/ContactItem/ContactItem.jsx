import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Item, Button } from './ContactItem.styled';
import { MdContactPhone } from 'react-icons/md';

export default function ContactItem({ id, name, phone, removeContact }) {    
  return (
    <Item key={id}>
        <MdContactPhone size={18}/>
        <Wrapper>
            <span>{name}: </span>
            <span>{phone}</span>
       </Wrapper> 
            <Button type='button' onClick={() => removeContact(id)} >Delete</Button>
     </Item>
  )
}

ContactItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    phone: PropTypes.string,
    removeContact: PropTypes.func,
}
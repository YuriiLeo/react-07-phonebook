import PropTypes from 'prop-types';
import { Form, Input, Button } from './ContactForm.styled';
import { useDispatch } from "react-redux";
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { addContact } from 'redux/operetions'; 

export default function ContactForm() {
const [name, setName] = useState("");
const [phone, setPhone] = useState("");

const dispatch = useDispatch();

const nameId = nanoid();
const phoneId = nanoid();


const handleChange = (evt) => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
       case 'phone':
        setPhone(value);
        break;
    
      default:
        return;
    }
  }
  
const handleSubmit = (evt) => {
  evt.preventDefault();
      onAddContact({ name, phone });
      setName("");
      setPhone("");
    }


const onAddContact = (contact) => {
  const action = addContact(contact);
      dispatch(action);
}
  
  return (
    <Form onSubmit={handleSubmit}>
         <label htmlFor={nameId}>Name</label>
         <Input
          id={nameId}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. 
          For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
         <label htmlFor={phoneId}>phone</label>
         <Input
          id={phoneId}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone phone must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={handleChange}
       />  
         <Button type="sybmit">Add contact</Button>
     </Form>
  )
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func
}
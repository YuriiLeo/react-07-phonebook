import ContactList from 'components/Contacts/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import Section from "components/Section/Section";
import Notification from "components/Notification/Notification";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import { selectContacts, selectFilter, selectFilterdContacts } from 'redux/selectors';
import { fetchContacts } from "redux/operetions";
import { useEffect } from "react";
import { Wrapper } from './Contacts.styled';

export default function Contacts() {
  const contacts = useSelector(selectFilterdContacts);
  const { isLoading, error } = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();    

  
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
      

  return (
    <Wrapper>
        {isLoading && !error && <p>Loading contacts...</p>}
        {error && <p>{error}</p>}
      {/* {!isLoading && contacts.length ? */}
        {!isLoading ?
          <Section title="Contacts">
              <Filter />
              <ContactList items={contacts}  />
           </Section> :
        (isLoading && filter.length > 0 ? null : <Notification message="There is no contacts"></Notification>)
      }
      {filter && !contacts.length && <Notification message="No contact on request"></Notification> }
      </Wrapper>
  )
}


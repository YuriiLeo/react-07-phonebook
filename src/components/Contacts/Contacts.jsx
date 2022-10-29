import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import Section from "components/Section/Section";
import Notification from "components/Notification/Notification";
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from "react-redux";
import { selectContacts, selectFilter } from 'redux/selectors';
import { toast } from 'react-toastify'
import { deleteContact } from "redux/operetions"; 
import { setFilter } from "redux/filterSlice";
import { fetchContacts } from "redux/operetions";
import { useEffect } from "react";
import { Wrapper } from './Contacts.styled';

export default function Contacts() {
  const { items, isLoading, error } = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();    

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  
  const removeContact = (id) => {
    const action = deleteContact(id);
    dispatch(action);

    if (contactsFilter.length === 1) {
           dispatch(setFilter(""));
           
        toast.info('No more contacts matching the filter.', {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
       });
      }   
    }  
    
    const handleChange = (evt) => {
      const { value } = evt.target;
      dispatch(setFilter(value));
    }
    const getFilterContacts = () => {
           if (!filter) {
            return items;  
         }  
        const normalizedFilter = filter.toLocaleLowerCase();
        const filterContacts = items.filter(({name, phone}) => {
        const normalizedName = name.toLocaleLowerCase();
        const normalizedNumber = phone.toLocaleLowerCase();
        const result = normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter);
            return result;
        }) 
       
        return filterContacts;
    }

    const contactsFilter = getFilterContacts();

  return (
    <Wrapper>
        {isLoading && !error && <p>Loading contacts...</p>}
        {error && <p>{error}</p>}
        {!isLoading && items.length ?
          <Section title="Contacts">
              <Filter onChange={handleChange} />
              <ContactList items={contactsFilter} removeContact={removeContact} />
           </Section> :
        (isLoading ? null : <Notification message="There is no contacts"></Notification>)
      }
      </Wrapper>
  )
}


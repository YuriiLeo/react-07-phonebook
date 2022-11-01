import PropTypes from 'prop-types';
import { Wrapper, Item, Button } from './ContactItem.styled';
import { MdContactPhone } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts, selectFilterdContacts } from 'redux/selectors';
import { deleteContact } from 'redux/operetions';
import { setFilter } from 'redux/filterSlice';
import { toast } from 'react-toastify';

export default function ContactItem({ id, name, phone }) {  
  const contacts = useSelector(selectFilterdContacts);
  const { isLoading } = useSelector(selectContacts);
  const dispatch = useDispatch();    

    const removeContact = (id) => {
    const action = deleteContact(id);
    dispatch(action);

    if (contacts.length === 1) {
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
    
  return (
    <Item key={id}>
        <MdContactPhone size={18}/>
        <Wrapper>
            <span>{name}: </span>
            <span>{phone}</span>
       </Wrapper> 
            {isLoading ? <Button>Deleting...</Button> : <Button type='button' onClick={() => removeContact(id)} >Delete</Button>}
     </Item>
  )
}

ContactItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    phone: PropTypes.string,
}
import { Container } from "./App.styled";
import ContactForm from 'components/ContactForm/ContactForm';
import Section from "components/Section/Section";
import Contacts from "components/Contacts/Contacts"; 
import { ToastContainer } from 'react-toastify';

export default function App() {
 
  return (
    <Container>
          <Section title="Phonebook">
            <ContactForm  />
          </Section>
          <ToastContainer position="top-left" autoClose={3000} />
          <Contacts/>
    </Container>
  )
}
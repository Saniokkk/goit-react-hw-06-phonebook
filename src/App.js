import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { Section } from 'components/Section';
import { ContactList } from 'components/Contacts';
import { ContactForm } from 'components/ContactForm';
import { addToStorage } from './components/storage';
import { addContacts, filterContacts, removeContacts } from 'redux/actions/contactsAction';




function App() {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const state = useSelector(state=>state)
  const dispatch = useDispatch();
  
  console.log(state)
  useEffect(() => {
    addToStorage('contacts', contacts);
  }, [contacts]);

  const handleDeleteBtn = event => {
    const currentId = event.target.closest('li').id;    
    dispatch(removeContacts(currentId));
  };

  const changeStateAfterSubmit = (contactName, contactNumber) => {
    if (contacts.find(contact => contact.name === contactName)) {
      toast.warn(`${contactName} is already in contacts`, { color: "red" });
    } else {
      return dispatch(addContacts({ name: contactName, number: contactNumber, id: nanoid() }));
    }
  };

  const handleChange = event => {
    const {value } = event.target;
    
    dispatch(filterContacts(value));    
  };
  
  const contactsFilter = () => {      
    return contacts.filter(({ name }) => {     
      return name.toLowerCase().includes(filter.toLowerCase().trim());
    });
  };

  console.log(contactsFilter())
    return (
      <>
        <Section title="Phone book">
          <ContactForm stateApp={changeStateAfterSubmit} />
        </Section>
        <Section title="Contacts">
          <ContactList
            onChange={handleChange}
            handleBtn={handleDeleteBtn}
            filterContacts={contactsFilter()}
            value={filter}
          />
        </Section>
        <ToastContainer />
      </>
    );
  }


export default App;

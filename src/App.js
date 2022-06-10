import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { Section } from 'components/Section';
import { ContactList } from 'components/Contacts';
import { ContactForm } from 'components/ContactForm';
import { addToStorage } from './components/storage';
import { addContacts, removeContacts } from 'redux/actions/contactsAction';



function App() {
  const contacts = useSelector(state => state.contacts);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');  

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
    const { name, value } = event.target;
    setFilter({ [name]: value });
  };

  const contactsFilter = () => {      
    return contacts.filter(({ name }) => {     
      return name.toLowerCase().includes(filter.toLowerCase().trim());
    });
  };
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

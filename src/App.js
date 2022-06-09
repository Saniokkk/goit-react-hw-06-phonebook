import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Section } from 'components/Section';
import { ContactList } from 'components/Contacts';
import { ContactForm } from 'components/ContactForm';
import { addToStorage, getFromStorage } from './components/storage';
// import { createStore } from 'redux'

function App() {
  const [contacts, setContacts] = useState(getFromStorage('contacts') ? getFromStorage('contacts') : []);
  const [filter, setFilter] = useState('');
  console.log(contacts);



  useEffect(() => {
    addToStorage('contacts', contacts);
  }, [contacts]);


  const handleDeleteBtn = event => {
      const contactList = Object.values(contacts);
      const currentId = event.target.closest('li').id;
      const filterContacts = contactList.filter(({ id }) => {
      return id !== currentId;
    });
    setContacts(filterContacts);
  };

  const changeStateAfterSubmit = (contactName, contactNumber) => {
    if (contacts.find(contact => contact.name === contactName)) {
      alert(`${contactName} is already in contacts`);
    } else {
      return setContacts([...contacts, { name: contactName, number: contactNumber, id: nanoid() }]);          
    }
  }



  const handleChange = event => {
    const { name, value } = event.target;
    setFilter({ [name]: value });
  };

  const contactsFilter = () => {  
    console.log(contacts)
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
      </>
    );
  }


export default App;

// function counterReducer(state = { value: 0 }, action) {
//   switch (action.type) {
//     case 'counter/incremented':
//       return { value: state.value + 1 }
//     case 'counter/decremented':
//       return { value: state.value - 1 }
//     default:
//       return state
//   }
// }
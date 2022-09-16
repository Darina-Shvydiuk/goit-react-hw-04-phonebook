import React, { useState, useEffect, useMemo } from 'react';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';
import s from './App.module.css';

const CONTACTS = 'contacts';

const getLocalData = () => JSON.parse(localStorage.getItem(CONTACTS));

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    () => getLocalData() ?? initialContacts
  );
  console.log(contacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const handelFormSubmit = data => {
    const contactName = data.name.toLowerCase();
    if (
      contacts.find(recordName => recordName.name.toLowerCase() === contactName)
    ) {
      alert(`${data.name} is already in contacts.`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, data]);
  };

  const handleFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const handleDelete = toDelete => {
    setContacts(contacts.filter(({ id }) => id !== toDelete));
  };

  // const normalizedFilter = filter.toLowerCase();

  // const filterContacts = contacts.filter(recordName =>
  //   recordName.name.toLowerCase().includes(normalizedFilter)
  // );

  const filterContacts = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    contacts.filter(recordName =>
      recordName.name.toLowerCase().includes(normalizedFilter)
    );
  }, [contacts, filter]);

  return (
    <div className={s.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handelFormSubmit} />

      <h2>Contacts</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <ContactList contacts={filterContacts} handleDelete={handleDelete} />
    </div>
  );
};

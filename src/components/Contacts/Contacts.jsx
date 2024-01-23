import { useDispatch, useSelector } from 'react-redux';
import { ContactItem } from 'components';
import { deleteContact, getContacts, getFilter } from '../../redux';
import css from 'components/Contacts/Contacts.module.css';

export const Contacts = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className={css.list}>
      {filteredContacts.map(contact => (
        <ContactItem
          key={contact.id}
          contact={contact}
          onClickDelBtn={() => dispatch(deleteContact(contact.id))}
        />
      ))}
    </ul>
  );
};

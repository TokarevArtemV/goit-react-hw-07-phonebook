import { useDispatch, useSelector } from 'react-redux';
import { ContactItem } from 'components';
import { apiDeleteContact, selectFilteredContacts } from '../../redux';
import css from 'components/ContactsList/ContactsList.module.css';

export const ContactsList = location => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  return (
    <>
      <ul className={css.list}>
        {filteredContacts.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onClickDelBtn={() => dispatch(apiDeleteContact(contact.id))}
          />
        ))}
      </ul>
    </>
  );
};

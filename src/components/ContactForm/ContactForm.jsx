import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import css from 'components/ContactForm/ContactForm.module.css';

import { addContact, getContacts } from '../../redux';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const onSubmitForm = evt => {
    evt.preventDefault();
    const name = evt.target.elements.name.value;
    const number = evt.target.elements.number.value;

    const isExists = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExists) {
      NotificationManager.info(`${name} is alredy in contacts`);
      return;
    }
    dispatch(addContact(name, number));

    evt.target.reset();
  };

  return (
    <form className={css.form} onSubmit={onSubmitForm}>
      <label>
        <span className={css.text}>Name</span>
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        <span className={css.text}>Telefone</span>
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\d{3}[\-]\d{2}[\-]\d{2}"
          title="Number may contain only numbers and dushes. For example 123-45-67"
          required
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

import { NotificationContainer } from 'react-notifications';
import { ContactForm, Contacts, Filter, Container } from 'components';
import 'react-notifications/lib/notifications.css';

export const App = () => {
  return (
    <Container>
      <NotificationContainer />
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <Contacts />
    </Container>
  );
};

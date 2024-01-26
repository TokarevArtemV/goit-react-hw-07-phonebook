import { Route, Routes, useLocation } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import ContactDetails from 'pages/ContactDetails';
import Contacts from 'pages/Contacts';

import css from 'components/App/App.module.css';
import 'react-notifications/lib/notifications.css';

export const App = () => {
  const location = useLocation();

  return (
    <div className={css.appWraper}>
      <h1>Phonebook</h1>
      <Routes>
        <Route index element={<Contacts />} />
        <Route
          path="/:contactId"
          element={<ContactDetails location={location} />}
        />
      </Routes>
      <NotificationContainer />
    </div>
  );
};
// https://i.ibb.co/2ShmK52/nobody.png

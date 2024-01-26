import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  apiGetContactById,
  selectContactById,
  selectError,
  selectStatus,
} from '../redux';
import ContactDetailsContainer from 'components/ContactDetailsContainer/ContactDetailsContainer';
import { Loader } from 'components/Loader/Loader';

import css from 'pages/ContactDetails.module.css';

const ContactDetails = location => {
  const { contactId } = useParams(null);
  const backLink = useRef(location.state?.from ?? '/');
  const dispatch = useDispatch();
  const contact = useSelector(selectContactById);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(apiGetContactById(contactId));
  }, [dispatch, contactId]);

  return (
    <>
      <NavLink to={backLink.current} className={css.button_back}>
        Go back
      </NavLink>
      <h2>Contacts details</h2>
      {status === 'error' && <p>Error: {error}</p>}
      {status === 'pending' && <Loader />}
      {contact && <ContactDetailsContainer />}
    </>
  );
};

export default ContactDetails;

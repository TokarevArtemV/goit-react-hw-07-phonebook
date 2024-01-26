import css from 'components/ContactItem/ContactItem.module.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectLocation } from '../../redux';

export const ContactItem = ({
  contact: { id, name, phone, avatar },
  onClickDelBtn,
}) => {
  const location = useSelector(selectLocation);

  return (
    <li className={css.item}>
      <Link to={`/${id}`} state={{ from: location }}>
        <img className={css.avatar} src={avatar} alt={name} />
        <span className={css.name}> {`${name} `}</span>
      </Link>
      <span className={css.phone}> {`☎ ${phone}`}</span>
      <button className={css.button} type="button" onClick={onClickDelBtn}>
        ❌
      </button>
    </li>
  );
};

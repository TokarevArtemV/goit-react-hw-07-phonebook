import css from 'components/ContactItem/ContactItem.module.css';

export const ContactItem = ({ contact: { name, number }, onClickDelBtn }) => (
  <li className={css.item}>
    <span className={css.text}> {`${name}: `}</span>
    <span className={css.text}> {`${number}`}</span>
    <button className={css.button} type="button" onClick={onClickDelBtn}>
      Delete contact
    </button>
  </li>
);

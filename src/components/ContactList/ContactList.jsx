import s from '../ContactList/ContactList.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
export class ContactList extends Component {
  render() {
    return (
      <ul className={s.list}>
        {this.props.contacts.map(({ id, name, number }) => {
          return (
            <li key={id} className={s.item}>
              <span className={s.name}>{name}: </span>
              <span className={s.tel}>{number} </span>
              <button
                className={s.btn}
                type="button"
                onClick={() => this.props.handleDelete(id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
ContactList.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

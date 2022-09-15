import s from '../Filter/Filter.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class Filter extends Component {
  render() {
    return (
      <label className={s.label}>
        Find contacts by name
        <input
          className={s.input}
          onChange={this.props.handleFilter}
          value={this.props.filter}
          type="text"
          name="filter"
          title=" Find contacts by name"
        />
      </label>
    );
  }
}
Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

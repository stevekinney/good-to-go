import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewItem.css';

class NewItem extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  shouldComponentUpdate(newProp, newState) {
    return newState.value !== this.state.value;
  }

  handleChange(event: Event) {
    const { target } = event;
    if (target instanceof HTMLInputElement) {
      const { value } = target;
      this.setState({ value });
    }
  }

  handleSubmit(event: Event) {
    const { onSubmit } = this.props;
    const { value } = this.state;

    event.preventDefault();
    onSubmit({ value, packed: false, id: Date.now() });
    this.setState({ value: '' });
  }

  render() {
    const { value } = this.state;

    return (
      <form className="NewItem" onSubmit={this.handleSubmit}>
        <input className="NewItem-input" type="text" value={value} onChange={this.handleChange} />
        <input className="NewItem-submit button" type="submit" />
      </form>
    );
  }
}

NewItem.propTypes = {
  onSubmit: PropTypes.func,
};

NewItem.defaultProps = {
  onSubmit: () => {},
};

export default NewItem;

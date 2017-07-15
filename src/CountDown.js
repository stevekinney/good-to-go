import React from 'react';
import PropTypes from 'prop-types';

const CountDown = ({ timeLeft }) => (
  <div className="CountDown">
    This plane leaves {timeLeft}.
  </div>
);

CountDown.propTypes = {
  timeLeft: PropTypes.string,
};

CountDown.defaultProps = {
  timeLeft: 'eventually',
};

export default CountDown;

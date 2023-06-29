import PropTypes from 'prop-types';

import { NotificationText } from './Notification.styled';

export default function Notification({ message }) {
  return <NotificationText>{message}</NotificationText>;
}

Notification.propTypes = { NotificationText: PropTypes.string.isRequired };

import { Alert } from 'react-bootstrap';

import React from 'react';

const Message = ({ varinat, children }) => {
  return <Alert variant={varinat}>{children}</Alert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;

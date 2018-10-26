import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Button, CardFooter } from 'reactstrap';
import { injectIntl } from 'components/Intl';

export const StudentCard = ({ data: { userId, name, username, totalCredits }, formatMessage, remove }) => (
  <Card>
    <CardHeader>
      <h3 className="float-left">
        <Link to={`/students/${userId}`}>{name}</Link>
      </h3>
      {!!remove && (
        <i
          className="fa fa-trash action float-right"
          onClick={() => remove(userId)}
        />
      )}
    </CardHeader>
    <CardBody>
      <div>
        {formatMessage('Username')}: {username}
      </div>
      <div>
        {formatMessage('Credits')}: {totalCredits}
      </div>
    </CardBody>
    <CardFooter className="text-center">
      <Link to={`/admin/${userId}`}>
        <Button outline color="secondary">
          {formatMessage('Details')}
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

StudentCard.propTypes = {
  data: PropTypes.shape({
    attributes: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
  }).isRequired,
  formatMessage: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default injectIntl(StudentCard);

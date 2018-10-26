import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  InputGroup,
  Input,
  Button,
} from 'reactstrap';
import Serializer from 'helpers/form-serialize';
import Select from 'components/Select';
import { injectIntl } from 'components/Intl';

export const UpdateAdminModal = ({ data: { userId, username, nameOfUser, userDesignation }, isOpen, toggle, onSave, className, formatMessage }) => (
  <Modal
    isOpen={isOpen}
    toggle={toggle}
    className={` ${className}`.split(' ').join(' modal-')}
  >
    <Form onSubmit={(e) => {
      e.preventDefault();
      onSave(userId, Serializer.serialize(e.target, { hash: true }));
      toggle();
    }}>
      <ModalHeader toggle={toggle}>{formatMessage('Update')}</ModalHeader>
      <ModalBody>
        <span>{username}</span>
        <InputGroup className="mb-3">
          <Input type="text" name="username" placeholder={formatMessage('Username')} defaultValue={username} />
        </InputGroup>
        <InputGroup className="mb-3">
          <Input type="text" name="nameOfUser" placeholder={formatMessage('nameOfUser')} defaultValue={nameOfUser} />
        </InputGroup>
        <InputGroup className="mb-3">
          <Input type="text" name="userDesignation" placeholder={formatMessage('userDesignation')} defaultValue={userDesignation} />
        </InputGroup>
        <FormGroup className="mb-3">
          <Select
            options={[
              { value: 'Admin', label: 'Admin' },
            ]}
            name="userType"
            defaultValue="Admin"
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>{formatMessage('Cancel')}</Button>{' '}
        <Button type="submit" color="primary">{formatMessage('Save')}</Button>
      </ModalFooter>
    </Form>
  </Modal>
);

UpdateAdminModal.propTypes = {
  data: PropTypes.shape({
    attributes: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    }),
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  formatMessage: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

UpdateAdminModal.defaultProps = {
  className: '',
};

export default injectIntl(UpdateAdminModal);

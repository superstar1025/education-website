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

export const AddAdmintModal = ({ isOpen, toggle, onSave, className, formatMessage }) => (
  <Modal
    isOpen={isOpen}
    toggle={toggle}
    className={` ${className}`.split(' ').join(' modal-')}
  >
    <Form onSubmit={(e) => {
      e.preventDefault();
      onSave(Serializer.serialize(e.target, { hash: true }));
      toggle();
    }}>
      <ModalHeader toggle={toggle}>{formatMessage('New')}</ModalHeader>
      <ModalBody>
        <InputGroup className="mb-3">
          <Input type="text" name="username" placeholder={formatMessage('Username')} required />
        </InputGroup>
        <InputGroup className="mb-3">
          <Input type="password" name="password" placeholder={formatMessage('Password')} required />
        </InputGroup>
        <InputGroup className="mb-4">
          <Input type="password" name="confirmpassword" placeholder={formatMessage('Repeat password')} required />
        </InputGroup>
        <InputGroup className="mb-3">
          <Input type="text" name="nameOfUser" placeholder={formatMessage('nameOfUser')} required />
        </InputGroup>
        <InputGroup className="mb-3">
          <Input type="text" name="userDesignation" placeholder={formatMessage('userDesignation')} required />
        </InputGroup>
        <FormGroup className="mb-3">
          <Select
            options={[
              { value: 'Admin', label: 'Admin' },
              { value: 'Staff', label: 'Staff' },
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

AddAdmintModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  className: PropTypes.string,
  formatMessage: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

AddAdmintModal.defaultProps = {
  className: '',
};

export default injectIntl(AddAdmintModal);

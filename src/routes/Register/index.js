import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'components/Intl';
import { Container, Row, Col, Card, CardBody, CardFooter, Button, FormGroup, Input, InputGroup, Form } from 'reactstrap';
import Select from 'components/Select';
import Serializer from 'helpers/form-serialize';
import { REGISTER_USER_REQUEST } from 'redux/constants';

class Register extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    formatMessage: PropTypes.func.isRequired,
    registerUser: PropTypes.func.isRequired,
    registerSuccess: PropTypes.bool,
  }

  static defaultProps = {
    registerSuccess: false,
  }

  constructor(props) {
    super(props);
    this.goLogin = this.goLogin.bind(this);
  }

  componentWillReceiveProps({
    history, registerSuccess,
  }) {
    if (registerSuccess) {
      history.push('/dashboard');
    }
  }

  goLogin() {
    this.props.history.push('login');
  }

  validateForm(form) {
    const { registerUser } = this.props;
    registerUser(form);
    if (form.password === form.confirmpassword) { // Todo: additional form validations are needed
    }
  }

  render() {
    const {
      formatMessage,
    } = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>{formatMessage('Register')}</h1>
                  <p className="text-muted">{formatMessage('Create your account')}</p>
                  <Form onSubmit={(e) => {
                    e.preventDefault();
                    const formValue = Serializer.serialize(e.target, { hash: true });
                    this.validateForm(formValue);
                  }}>
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
                    <Button type="submit" color="success" block>{formatMessage('Create Account')}</Button>
                  </Form>
                </CardBody>
                <CardFooter className="text-center">
                  <Button color="link" className="mt-3" active onClick={this.goLogin}>{formatMessage('Login Now')}!</Button>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    registerSuccess: state.toJS().auth.registerSuccess,
  };
}

const mapDispatchToProps = dispatch => ({
  registerUser: user => dispatch({ type: REGISTER_USER_REQUEST, payload: { user } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Register));

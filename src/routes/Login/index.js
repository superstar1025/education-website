import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl } from 'components/Intl';
import { Container, Row, Col, Card, CardBody, CardFooter, Button, Input, InputGroup, Form } from 'reactstrap';
import Serializer from 'helpers/form-serialize';
import { LOGIN_USER_REQUEST } from 'redux/constants';

class Login extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    formatMessage: PropTypes.func.isRequired,
    loginUser: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.goSignUp = this.goSignUp.bind(this);
  }

  componentWillReceiveProps({ history }) {
    if (localStorage.getItem('tokenInfo') !== '') {
      history.push('/dashboard');
    }
  }

  goSignUp() {
    this.props.history.push('register');
  }

  render() {
    const {
      formatMessage,
      loginUser,
    } = this.props;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody>
                  <h1>{formatMessage('Login')}</h1>
                  <p className="text-muted">{formatMessage('Sign In to your account')}</p>
                  <Form onSubmit={(e) => {
                    e.preventDefault();
                    loginUser(Serializer.serialize(e.target, { hash: true }));
                  }}>
                    <InputGroup className="mb-3">
                      <Input type="text" name="username" placeholder={formatMessage('Username')} required />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <Input type="password" name="password" placeholder={formatMessage('Password')} required />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button type="submit" color="primary" className="px-4">{formatMessage('Login')}</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">{formatMessage('Forgot password')}?</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter className="text-center">
                  <Button color="link" className="mt-3" active onClick={this.goSignUp}>{formatMessage('Register Now')}!</Button>
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
    currentUser: state.toJS().auth.currentUser,
  };
}

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch({ type: LOGIN_USER_REQUEST, payload: { user } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Login));

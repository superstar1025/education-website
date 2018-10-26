import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { CLEAR_AUTH_TOKEN_REQUEST } from 'redux/constants';

export class App extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    clearAuthToken: PropTypes.func.isRequired,
  };

  render() {
    const { children, clearAuthToken, ...props } = this.props;
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...props} clearAuthToken={clearAuthToken} />
          <main className="main">
            <Container fluid>
              {children}
            </Container>
          </main>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  clearAuthToken: () => dispatch({ type: CLEAR_AUTH_TOKEN_REQUEST }),
});

export default connect(undefined, mapDispatchToProps)(App);

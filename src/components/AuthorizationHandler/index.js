/**
 * This wraps all routes, and is mounted anytime a user is viewing the application.
 * It verifies that a user is authroized to view the application and spawns a token refresh process.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export class AuthorizationHandler extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;
    const tokenInfo = localStorage.getItem('tokenInfo');
    if (!tokenInfo) {
      // null can be replaced with loading indicator for better UX
      return <Redirect to="login" />;
    }
    return children;
  }
}

export default AuthorizationHandler;

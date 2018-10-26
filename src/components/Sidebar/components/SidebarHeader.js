import React from 'react';
import PropTypes from 'prop-types';

const gravatarUrl = require('gravatar-url');

const SidebarHeader = ({ username, userType }) => (
  <div className="sidebar-header">
    <img src={gravatarUrl('millsb123@gmail.com', { size: 200 })} className="img-avatar" alt="Avatar" />
    <div><strong>{username}</strong></div>
    <div className="text-muted"><small>{userType}</small></div>
    <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
      <button type="button" className="btn btn-link">
        <i className="icon-settings" />
      </button>
    </div>
  </div>
);

SidebarHeader.propTypes = {
  username: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
};

export default SidebarHeader;

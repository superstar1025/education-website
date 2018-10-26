import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Nav, Button } from 'reactstrap';
import { fromJS } from 'immutable';
import PropTypes from 'prop-types';

import Title from './components/Title';
import Divider from './components/Divider';
import NavDropdown from './components/NavDropdown';
import NavItem from './components/NavItem';
import SidebarHeader from './components/SidebarHeader';
import SidebarMinimizer from './components/SidebarMinimizer';

export class Sidebar extends Component {

  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequire,
    }).isRequired,
    currentUser: PropTypes.shape({
      userId: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number,
      ]),
    }),
    clearAuthToken: PropTypes.func.isRequired,
  }

  static defaultProps = {
    currentUser: fromJS({
      picture: '',
      name: '',
      nickname: '',
    }),
  }

  handleClick = (e) => {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute = (routeName) => {
    const { location: { pathname } } = this.props;
    return pathname.indexOf(routeName) > -1;
  }

  // nav link
  navLink = (item, idx) => {
    if (item.title) return <Title {...item} key={idx} />;
    if (item.divider) return <Divider {...item} key={idx} />;
    if (item.children) {
      return (
        <NavDropdown
          handleClick={this.handleClick}
          open={this.activeRoute(item.url)}
          {...item}
          key={idx}
        >
          {this.navList(item.children)}
        </NavDropdown>
      );
    }
    return <NavItem {...item} key={idx} />;
  }

  // nav list
  navList = items => items.map((item, index) => this.navLink({ ...item, name: item.name || '--' }, index))

  logout = () => {
    localStorage.removeItem('tokenInfo');
    localStorage.removeItem('currentUser');
    this.props.history.push('login');
  }

  render() {
    const sidebarItems = [
      {
        title: true,
        name: 'Global',
      },
      {
        name: 'Admin',
        url: '/admin',
        icon: 'icon-user',
      },
      {
        name: 'Students',
        url: '/students',
        icon: 'icon-graduation',
      },
      {
        name: 'Staff',
        url: '/staff',
        icon: 'icon-people',
      },
    ];
    // sidebar-nav root
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return (
      <div className="sidebar">
        <SidebarHeader {...currentUser} />
        <nav className="sidebar-nav">
          <Nav>
            {this.navList(sidebarItems)}
            <Button className="logout-button" onClick={this.logout}>
              <i className="icon-logout" />
              <span>Logout</span>
            </Button>
          </Nav>
        </nav>
        <SidebarMinimizer />
      </div>
    );
  }
}

/* istanbul ignore next */
const mapStateToProps = state => ({
  currentUser: state.toJS().auth.currentUser,
});

export default connect(mapStateToProps)(Sidebar);

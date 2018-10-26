import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap';
import { injectIntl } from 'components/Intl';
import ButtonLink from 'components/ButtonLink';
import NotificationCard from 'components/NotificationCard';
import { LIST_ADMIN_REQUEST, REMOVE_ADMIN_REQUEST, CREATE_ADMIN_REQUEST } from 'redux/constants';
import AdminCard from './components/AdminCard';
import AddAdminModal from './components/AddAdminModal';
import UpdateAdminModal from './components/UpdateAdminModal';

class Admin extends Component {
  static propTypes = {
    listAdmins: PropTypes.func.isRequired,
    formatMessage: PropTypes.func.isRequired,
    admins: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.oneOfType([
          PropTypes.string, PropTypes.number,
        ]),
      }),
    ),
    createAdmin: PropTypes.func.isRequired,
    removeAdmin: PropTypes.func.isRequired,
    updateAdmin: PropTypes.func.isRequired,
    adminsRequesting: PropTypes.bool.isRequired,
    createAdminRequesting: PropTypes.bool.isRequired,
    removeAdminRequesting: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    admins: [
      {
        userId: '12345',
      },
    ],
  }

  state = { createModal: false, updateModal: false };

  componentDidMount() {
    const { listAdmins } = this.props;
    listAdmins();
  }

  componentWillReceiveProps({ createAdminRequesting, removeAdminRequesting }) {
    const { listAdmins } = this.props;
    if (!createAdminRequesting && this.props.createAdminRequesting) {
      listAdmins();
    }
    if (!removeAdminRequesting && this.props.removeAdminRequesting) {
      listAdmins();
    }
  }

  onSearch = () => {
    const { listAdmins } = this.props;
    listAdmins();
  }

  toggleCreateModal = () => this.setState({ createModal: !this.state.createModal })

  toggleUpdateModal = () => this.setState({ updateModal: !this.state.updateModal })

  render() {
    const {
      formatMessage,
      admins,
      createAdmin,
      removeAdmin,
      updateAdmin,
      adminsRequesting,
      createAdminRequesting,
      removeAdminRequesting,
    } = this.props;
    const { createModal, updateModal } = this.state;
    const adminsCount = formatMessage('{count} {count, plural, one {admin} other {admins}}', { count: adminsRequesting ? '--' : admins.length });
    const ghost = adminsRequesting || createAdminRequesting || removeAdminRequesting;
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem><a href="/admin">{formatMessage('Admin')}</a></BreadcrumbItem>
          <ButtonLink className="no-border">
            {adminsCount}
          </ButtonLink>
          <ButtonLink className="no-border" handleClick={this.toggleCreateModal} icon="fa fa-plus">
            {formatMessage('Add Admin')}
          </ButtonLink>
        </Breadcrumb>
        <div className="content-list">
          {
          !ghost && !admins.length ? (
            <NotificationCard
              icon="folder"
              title={formatMessage('There is no data.')}
              description={formatMessage('You can create one if you want.')}
            />
          ) : (
            <Row>
              {
              admins.map((item, index) => (
                <Col xs="12" sm="6" md="4" key={index}>
                  <AdminCard data={item} remove={removeAdmin} update={this.toggleUpdateModal} />
                  <UpdateAdminModal
                    data={item}
                    isOpen={updateModal}
                    toggle={this.toggleUpdateModal}
                    className="primary"
                    onSave={updateAdmin}
                  />
                </Col>
              ))
            }
            </Row>
          )
        }
        </div>
        <AddAdminModal
          isOpen={createModal}
          toggle={this.toggleCreateModal}
          className="primary"
          onSave={createAdmin}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { admins, adminsRequesting, createAdminRequesting, removeAdminRequesting } = state.toJS().admin;
  return {
    admins,
    adminsRequesting,
    createAdminRequesting,
    removeAdminRequesting,
  };
}

const mapDispatchToProps = dispatch => ({
  listAdmins: () => dispatch({ type: LIST_ADMIN_REQUEST }),
  createAdmin: user => dispatch({ type: CREATE_ADMIN_REQUEST, payload: { user } }),
  removeAdmin: adminId => dispatch({ type: REMOVE_ADMIN_REQUEST, payload: { adminId } }),
  updateAdmin: (adminId, user) => dispatch({ type: CREATE_ADMIN_REQUEST, payload: { adminId, user } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Admin));

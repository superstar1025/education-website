import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap';
import { injectIntl } from 'components/Intl';
import ButtonLink from 'components/ButtonLink';
import { LIST_STAFF_REQUEST, REMOVE_STAFF_REQUEST, CREATE_STAFF_REQUEST } from 'redux/constants';
import NotificationCard from 'components/NotificationCard';
import StaffCard from './components/StaffCard';
import AddStaffModal from './components/AddStaffModal';

class Staff extends Component {
  static propTypes = {
    listStaffs: PropTypes.func.isRequired,
    formatMessage: PropTypes.func.isRequired,
    staffs: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.oneOfType([
          PropTypes.string, PropTypes.number,
        ]),
      }),
    ),
    createStaff: PropTypes.func.isRequired,
    removeStaff: PropTypes.func.isRequired,
    staffsRequesting: PropTypes.bool.isRequired,
    createStaffRequesting: PropTypes.bool.isRequired,
    removeStaffRequesting: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    staffs: [
      {
        userId: '12345',
      },
    ],
  }

  state = { createModal: false };

  componentDidMount() {
    const { listStaffs } = this.props;
    listStaffs();
  }

  componentWillReceiveProps({ createStaffRequesting, removeStaffRequesting }) {
    const { listStaffs } = this.props;
    if (!createStaffRequesting && this.props.createStaffRequesting) {
      listStaffs();
    }
    if (!removeStaffRequesting && this.props.removeStaffRequesting) {
      listStaffs();
    }
  }

  onSearch = () => {
    const { listStaffs } = this.props;
    listStaffs();
  }

  toggleCreateModal = () => this.setState({ createModal: !this.state.createModal })

  render() {
    const {
      formatMessage,
      staffs,
      createStaff,
      removeStaff,
      staffsRequesting,
      createStaffRequesting,
      removeStaffRequesting,
    } = this.props;
    console.log(this.props.staffs);
    const { createModal } = this.state;
    const staffsCount = formatMessage('{count} {count, plural, one {staff} other {staffs}}', { count: staffsRequesting ? '--' : staffs.length });
    const ghost = staffsRequesting || createStaffRequesting || removeStaffRequesting;
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem><a href="/staff">{formatMessage('Staff')}</a></BreadcrumbItem>
          <ButtonLink className="no-border">
            {staffsCount}
          </ButtonLink>
          <ButtonLink className="no-border" handleClick={this.toggleCreateModal} icon="fa fa-plus">
            {formatMessage('Add Staff')}
          </ButtonLink>
        </Breadcrumb>
        <div className="content-list">
          {
            !ghost && !staffs.length ? (
              <NotificationCard
                icon="folder"
                title={formatMessage('There is no data.')}
                description={formatMessage('You can create one if you want.')}
              />
            ) : (
              <Row>
                {
                staffs.map((item, index) => (
                  <Col xs="12" sm="6" md="4" key={index}>
                    <StaffCard data={item} remove={removeStaff} />
                  </Col>
                ))
              }
              </Row>
            )
          }
        </div>
        <AddStaffModal
          isOpen={createModal}
          toggle={this.toggleCreateModal}
          className="primary"
          onSave={createStaff}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { staffs, staffsRequesting, createStaffRequesting, removeStaffRequesting } = state.toJS().staff;
  return {
    staffs,
    staffsRequesting,
    createStaffRequesting,
    removeStaffRequesting,
  };
}

const mapDispatchToProps = dispatch => ({
  listStaffs: () => dispatch({ type: LIST_STAFF_REQUEST }),
  removeStaff: staffId => dispatch({ type: REMOVE_STAFF_REQUEST, payload: { staffId } }),
  createStaff: user => dispatch({ type: CREATE_STAFF_REQUEST, payload: { user } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Staff));

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap';
import { injectIntl } from 'components/Intl';
import ButtonLink from 'components/ButtonLink';
import { LIST_STUDENTS_REQUEST, REMOVE_STUDENTS_REQUEST, CREATE_STUDENTS_REQUEST } from 'redux/constants';
import NotificationCard from 'components/NotificationCard';
import StudentCard from './components/StudentCard';
import AddStudentModal from './components/AddStudentModal';

class Students extends Component {
  static propTypes = {
    listStudents: PropTypes.func.isRequired,
    formatMessage: PropTypes.func.isRequired,
    students: PropTypes.arrayOf(
      PropTypes.shape({
        userId: PropTypes.oneOfType([
          PropTypes.string, PropTypes.number,
        ]),
      }),
    ),
    createStudent: PropTypes.func.isRequired,
    removeStudent: PropTypes.func.isRequired,
    studentsRequesting: PropTypes.bool.isRequired,
    createStudentRequesting: PropTypes.bool.isRequired,
    removeStudentRequesting: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    students: [
      {
        userId: '12345',
      },
    ],
  }

  state = { createModal: false };

  componentDidMount() {
    const { listStudents } = this.props;
    listStudents();
  }

  componentWillReceiveProps({ createStudentRequesting, removeStudentRequesting }) {
    const { listStudents } = this.props;
    if (!createStudentRequesting && this.props.createStudentRequesting) {
      listStudents();
    }
    if (!removeStudentRequesting && this.props.removeStudentRequesting) {
      listStudents();
    }
  }

  onSearch = () => {
    const { listStudents } = this.props;
    listStudents();
  }

  toggleCreateModal = () => this.setState({ createModal: !this.state.createModal })

  render() {
    const {
      formatMessage,
      students,
      createStudent,
      removeStudent,
      studentsRequesting,
      createStudentRequesting,
      removeStudentRequesting,
    } = this.props;
    console.log(this.props.students);
    const { createModal } = this.state;
    const studentsCount = formatMessage('{count} {count, plural, one {student} other {students}}', { count: studentsRequesting ? '--' : students.length });
    const ghost = studentsRequesting || createStudentRequesting || removeStudentRequesting;
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem><a href="/students">{formatMessage('Students')}</a></BreadcrumbItem>
          <ButtonLink className="no-border">
            {studentsCount}
          </ButtonLink>
          <ButtonLink className="no-border" handleClick={this.toggleCreateModal} icon="fa fa-plus">
            {formatMessage('Add Student')}
          </ButtonLink>
        </Breadcrumb>
        <div className="content-list">
          {
            !ghost && !students.length ? (
              <NotificationCard
                icon="folder"
                title={formatMessage('There is no data.')}
                description={formatMessage('You can create one if you want.')}
              />
            ) : (
              <Row>
                {
                students.map((item, index) => (
                  <Col xs="12" sm="6" md="4" key={index}>
                    <StudentCard data={item} remove={removeStudent} />
                  </Col>
                ))
              }
              </Row>
            )
          }
        </div>
        <AddStudentModal
          isOpen={createModal}
          toggle={this.toggleCreateModal}
          className="primary"
          onSave={createStudent}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { students, studentsRequesting, createStudentRequesting, removeStudentRequesting } = state.toJS().students;
  return {
    students,
    studentsRequesting,
    createStudentRequesting,
    removeStudentRequesting,
  };
}

const mapDispatchToProps = dispatch => ({
  listStudents: () => dispatch({ type: LIST_STUDENTS_REQUEST }),
  removeStudent: studentId => dispatch({ type: REMOVE_STUDENTS_REQUEST, payload: { studentId } }),
  createStudent: user => dispatch({ type: CREATE_STUDENTS_REQUEST, payload: { user } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Students));

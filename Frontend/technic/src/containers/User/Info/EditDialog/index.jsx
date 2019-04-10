import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { fetchOne, update } from '../../../../store/actions/user';

import Dialog from '../../../../components/Dialog';
import Form from '../Form';

class UserInfoEditDialog extends Component {
  componentDidMount = () => {
    const { loadData } = this.props;
    loadData();
  };

  handleDialogClose = () => {
    const { history } = this.props;
    history.goBack();
  };

  render = () => {
    const {
      onSubmit,
      data: { user }
    } = this.props;

    return (
      <>
        <Dialog
          title="Изменить информацию о пользователе"
          onClose={this.handleDialogClose}
          open
          fullWidth
        >
          <Form
            onSubmit={onSubmit}
            initialValues={user}
            submitButtonTitle="Изменить"
          />
        </Dialog>
      </>
    );
  };
}

const mapStateToProps = state => {
  const { user } = state;

  return { data: { user } };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    onSuccess,
    match: {
      params: { userId }
    }
  } = ownProps;

  return {
    onSubmit: async user => {
      try {
        await dispatch(update(userId, user));
        const { history } = ownProps;
        onSuccess('Информация о пользователе успешно изменена');
        history.goBack();
      } catch (err) {
        console.log(err);
      }
    },
    loadData: async () => {
      try {
        await dispatch(fetchOne(userId));
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserInfoEditDialog);

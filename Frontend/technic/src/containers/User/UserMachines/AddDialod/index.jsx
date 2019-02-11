import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { add } from '../../../../store/actions/machines';

import Dialog from '../../../../components/Dialog';
import Form from '../Form';

class UserMachinesAddDialog extends Component {
  handleDialogClose = () => {
    const { history } = this.props;
    history.goBack();
  };

  render = () => {
    const { onSubmit } = this.props;

    return (
      <>
        <Dialog
          title="Добавить технику"
          onClose={this.handleDialogClose}
          open
          fullWidth
        >
          <Form onSubmit={onSubmit} />
        </Dialog>
      </>
    );
  };
}

const mapStateToProps = state => ({
  isSuccess: state.common.machines.isSuccess,
  isFetching: state.common.machines.isFetching
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const { onSuccess } = ownProps;

  return {
    onSubmit: async (machine) => {
      try {
        await dispatch(add(machine));
        const { history } = ownProps;
        onSuccess('Техника успешно добавлена');
        history.goBack();
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
)(UserMachinesAddDialog);

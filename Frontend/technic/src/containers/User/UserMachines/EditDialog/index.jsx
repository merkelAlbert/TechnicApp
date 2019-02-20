import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { update, fetchOne } from '../../../../store/actions/machines';

import Dialog from '../../../../components/Dialog';
import Form from '../Form';

class UserMachinesEditDialog extends Component {
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
      data: { machine }
    } = this.props;

    return (
      <>
        <Dialog
          title="Изменить технику"
          onClose={this.handleDialogClose}
          open
          fullWidth
        >
          <Form
            onSubmit={onSubmit}
            initialValues={machine}
            submitButtonTitle="Изменить"
          />
        </Dialog>
      </>
    );
  };
}

const mapStateToProps = state => {
  const { isFetching, error } = state.common.machines;
  const { active: machine = {} } = state.machines;
  machine.machineTypeId = machine.type && machine.type.id;

  return { data: { machine }, isFetching, error };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    onSuccess,
    match: {
      params: { machineId }
    }
  } = ownProps;

  return {
    onSubmit: async machine => {
      try {
        await dispatch(update(machineId, machine));
        const { history } = ownProps;
        onSuccess('Техника успешно изменена');
        history.goBack();
      } catch (err) {
        console.log(err);
      }
    },
    loadData: async () => {
      try {
        await dispatch(fetchOne(machineId));
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
)(UserMachinesEditDialog);

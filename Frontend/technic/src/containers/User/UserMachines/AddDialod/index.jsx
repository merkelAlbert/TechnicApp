import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addMachine } from '../../../../store/actions/machines';

import Dialog from '../../../../components/Dialog';
import Form from '../Form';

class UserMachinesAddDialog extends Component {

  handleDialogClose = () => {
    const { history } = this.props;
    console.log(this.props);
    history.goBack();
  }

  render = () => {
    const { onSubmit } = this.props;
    return (
      <Dialog title="Добавить технику" onClose={this.handleDialogClose} open={true}>
        <Form onSubmit={onSubmit} />
      </Dialog>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    onSubmit: async (machine) => {
      try {
        await dispatch(addMachine(machine));
        const { history } = ownProps;
        history.goBack();
      }
      catch (err) {
        console.log(err);
      }
    }
  };
}

export default compose(
  withRouter,
  connect(null, mapDispatchToProps),
)(UserMachinesAddDialog);

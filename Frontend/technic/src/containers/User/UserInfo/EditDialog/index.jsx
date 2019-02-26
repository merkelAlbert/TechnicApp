import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Dialog from '../../../../components/Dialog';
import Form from '../Form';

class UserInfoEditDialog extends Component {
  // componentDidMount = () => {
  //   const { loadData } = this.props;
  //   loadData();
  // };

  handleDialogClose = () => {
    const { history } = this.props;
    history.goBack();
  };

  render = () => {
    const { onSubmit } = this.props;

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
            // initialValues={user}
            submitButtonTitle="Изменить"
          />
        </Dialog>
      </>
    );
  };
}

const mapStateToProps = state => {
  // const { isFetching, error } = state.common.machines;
  // const { active: machine = {} } = state.machines;
  // machine.machineTypeId = machine.type && machine.type.id;
  // return { data: { machine }, isFetching, error };
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
        // await dispatch(update(machineId, machine));
        const { history } = ownProps;
        onSuccess('Информация о пользователе успешно изменена');
        history.goBack();
      } catch (err) {
        console.log(err);
      }
    }
    // loadData: async () => {
    //   try {
    //     await dispatch(fetchOne(machineId));
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  };
};

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(UserInfoEditDialog);

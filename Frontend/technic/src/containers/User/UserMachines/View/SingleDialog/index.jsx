import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dialog from '../../../../../components/Dialog';
import Loader from '../../../../../components/Loader';

import { fetchOne } from '../../../../../store/actions/machines';
import { IMAGES } from '../../../../../utils/api';

import './style.scss';

class UserMachinesSingleDialog extends Component {
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
      data: { machine },
      isFetching,
      error
    } = this.props;

    return (
      <Dialog
        title="Просмотр техники"
        open
        onClose={this.handleDialogClose}
        fullWidth
      >
        <Loader isFetching={isFetching} error={error}>
          <div className="single-dialog-content">
            <div className="single-dialog-content__images">
              {machine.imagesIds &&
                machine.imagesIds.map(machineId => (
                  <img
                    className="single-dialog-content__image"
                    src={`${IMAGES}${machineId}`}
                    alt={machine.name}
                  />
                ))}
            </div>
            <p>
              <span className="single-dialog-content__section-title">
                Название:
              </span>{' '}
              {machine.name}
            </p>
            <p>
              <span className="single-dialog-content__section-title">
                Тип:
              </span>{' '}
              {machine.type}
            </p>
            <p className="single-dialog-content__section-title">
              Характеристики:{' '}
            </p>
            <ul>
              {machine.specifications &&
                machine.specifications.map(specification => (
                  <li key={specification.id}>
                    {specification.name}: {specification.value}
                  </li>
                ))}
            </ul>
            <p className="single-dialog-content__section-title">Описание: </p>
            <p className="single-dialog-content__description">
              {machine.description}
            </p>
          </div>
        </Loader>
      </Dialog>
    );
  };
}

const mapStateToProps = state => {
  const { isFetching, error } = state.common.machines;
  const { active: machine = {} } = state.machines;

  return { data: { machine }, isFetching, error };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    match: {
      params: { machineId }
    }
  } = ownProps;

  return {
    loadData: async () => {
      try {
        await dispatch(fetchOne(machineId));
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserMachinesSingleDialog);

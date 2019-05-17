import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchAll } from '../../../../store/actions/companies';

import Loader from '../../../../components/Loader';

import './style.scss';

const HomeCompaniesView = ({ isFetching, error, loadData }) => {
  useEffect(() => {
    loadData();
  }, []);
  return <Loader isFetching={isFetching} error={error} />;
};

const mapStateToProps = state => {
  const { list: companies = [] } = state.companies;
  const { isFetching, error } = state.common.companies;

  return { data: { companies }, isFetching, error };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadData: async () => {
      try {
        await dispatch(fetchAll());
      } catch (err) {
        console.log(err);
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeCompaniesView);

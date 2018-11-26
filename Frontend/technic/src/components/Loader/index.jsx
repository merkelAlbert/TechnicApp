import React from 'react';
import Spinner from '@material-ui/core/CircularProgress';

const Loader = ({ isFetching, color, children }) => (
  <>
    {isFetching ? <Spinner color={color} /> : children}
  </>
);

export default Loader;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from 'react-bootstrap';

const MainContainer = styled.div`
  flex: 1;
  background-color: #fff;
  padding-top: 20px;
  padding-bottom: 30px;
`

const MainGrid = ({ children, ...props }) => (
  <MainContainer>
    <Grid {...props} >
      {children}
    </Grid>
  </MainContainer>
)

MainGrid.propTypes = {
  children: PropTypes.node,
};

export default MainGrid

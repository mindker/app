import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  color: black;
  gap: 2rem;
  flex-direction: ${(props) => (props.direction == 'row' ? 'row' : 'column')};
`;

const DashboardLayout = ({ children, direction }) => {
  return <StyledDiv direction={direction}>{children}</StyledDiv>;
};

export default DashboardLayout;

import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  height: 100vh;
  width: 100vw;
  flex-direction: ${(props) => (props.direction == 'row' ? 'row' : 'column')};
`;

const HomeLayout = ({ children, direction }) => {
  return <StyledDiv direction={direction}>{children}</StyledDiv>;
};

export default HomeLayout;

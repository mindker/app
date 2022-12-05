import React from 'react';
import styled from 'styled-components';

/* import Footer from '../../components/Footer/Footer'; */
import Header from '../../components/Header/Header';
import Content from '../../components/Header/content';
const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
 /*  background-color: aquamarine; */
  color: black;
  gap: 2rem;
  flex-direction: ${(props) => (props.direction == 'row' ? 'row' : 'column')};
`;

const HomeLayout = ({ children, direction }) => {
  return (
    <StyledDiv direction={direction}>
      <Header />
      <Content />
      {children}
      {/* <Footer /> */}
    </StyledDiv>
  );
};

export default HomeLayout;

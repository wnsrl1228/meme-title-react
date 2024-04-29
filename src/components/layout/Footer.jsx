import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: gainsboro;
  color: #333;
  padding: 60px;
  text-align: center;
  margin-top: 100px;
`;

const Footer = () => {
  return (
    <StyledFooter>
        <p>&copy; 2024 짤 제목. All rights reserved.</p>
    </StyledFooter>
  );
};

export default Footer;
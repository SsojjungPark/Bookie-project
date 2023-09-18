import styled from '@emotion/styled';

const Footer = () => {
  return (
    <FooterContainer>
      <CopyRight>&copy; 2023. Sojung Park. All rights reserved.</CopyRight>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1f1f1f;
  margin-top: 100px;
`;

const CopyRight = styled.span`
  width: 1200px;
  color: var(--white-color);
  text-align: center;
  font-size: 14px;
`;

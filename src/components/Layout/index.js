//React
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

//Components
import Header from 'components/Header';

function Layout({ children }) {

  const location = useLocation();

  const handleChangeColor = (value) => {
    switch (value) {
      case '/':
      case '/signup/email':
      case '/signup/wallet':
        return '#FFFFFF';

      default:
        return '#F5F5F5';
    }
  };

  return (
    <Container backgroundColor={handleChangeColor(location.pathname)}>
      <HeaderContainer>
        <Header />
      </HeaderContainer>

      <BodyWrapper>
        {children}
      </BodyWrapper>
    </Container>
  )
}

export default Layout

const Container = styled.div`
  width: 100vw;
  background-color: ${props => props.backgroundColor};
  overflow: hidden;
  display: flex;
  flex-flow: column;
  align-items: center;
`

const HeaderContainer = styled.header`
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #F0F0F0;
  background: #FFFFFF;
  display: flex;
  justify-content: center;
  position: fixed !important;
  top: 0;
  z-index: 1;
`

const BodyWrapper = styled.div`
  margin-top: 48px;
  width: 100%;
  max-width: 640px;
  height: 100%;
  min-height: calc(100vh - 48px);
  display: flex;
  flex-flow: column;
`
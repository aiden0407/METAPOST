//React
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

//Components
import Header from 'components/Header';
import Footer from 'components/Footer';
import ReportPopup from 'components/Popup/ReportPopup';

function Layout({ children }) {

  const location = useLocation();
  const { state: { isReportPopupOpened } } = useContext(AppContext);

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

  const handleFooter = (value) => {
    switch (value) {
      case '/':
      case '/signup/email':
      case '/signup/wallet':
      case '/profile/settings':
        return false;

      default:
        return true;
    }
  };

  return (
    <>
      <Container backgroundColor={handleChangeColor(location.pathname)}>
        <HeaderContainer>
          <Header />
        </HeaderContainer>

        <BodyWrapper>
          {children}
        </BodyWrapper>

        {
          handleFooter(location.pathname)
          && <FooterContainer>
            <Footer />
          </FooterContainer>
        }
      </Container>

      {
        isReportPopupOpened && <ReportPopup />
      }
    </>
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
  position: fixed;
  top: 0;
  left: 0;
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

const FooterContainer = styled.footer`
  margin-top: 64px;
  width: 100%;
  height: 270px;
  background: #FFFFFF;
  display: flex;
  justify-content: center;
`
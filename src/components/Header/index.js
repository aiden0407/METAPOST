//React
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { FlexBox } from 'components/Flex';

//Assets
import mainLogo from 'assets/icons/main_logo.svg';
import search from 'assets/icons/search.svg';
import iconExample1 from 'assets/icons/icon_example_1.png';

function Header() {

  const navigate = useNavigate();
  const location = useLocation();
  const { state: { login }, dispatch } = useContext(AuthContext);
  const [isToggleOpened, setIsToggleOpened] = useState(false);

  useEffect(() => {
    const storedLoginData = localStorage.getItem('login');

    switch (location.pathname) {
      case '/':
        if (storedLoginData) {
          dispatch({ type: 'LOGIN' });
          navigate('/home', { replace: true });
        }
        break;

      case '/signup/email':
      case '/signup/wallet':
        break;

      default:
        if (storedLoginData) {
          dispatch({ type: 'LOGIN' });
        } else {
          navigate('/', { replace: true });
        }
        break;
    }
  }, [location.pathname, dispatch, navigate]);

  function handleNavigateHome() {
    if (login) {
      navigate('/home');
    } else {
      navigate('/');
    }
  }

  function handleNavigateJoin() {
    navigate('/');
  }

  function handleTogglOpen() {
    setIsToggleOpened(!isToggleOpened);
  }

  function handleMyProfile() {
    setIsToggleOpened(false);
    navigate('/profile')
  }

  function handleCommunity() {
    setIsToggleOpened(false);
    navigate('/community')
  }

  function handleLogOut() {
    localStorage.removeItem('login');
    dispatch({ type: 'LOGOUT' });
    setIsToggleOpened(false);
    navigate('/');
  }

  return (
    <HeaderWrapper>
      <HeaderLogo src={mainLogo} onClick={() => handleNavigateHome()} />
      <FlexBox />
      <SearchIcon src={search} />
      {
        login
          ? <ProfileIcon src={iconExample1} onClick={() => handleTogglOpen()} />
          : <SignUpButton onClick={() => handleNavigateJoin()}>
            <Text B1 medium color="#FFFFFF">Join</Text>
          </SignUpButton>
      }
      {
        isToggleOpened &&
        <ToggleMenu>
          <StyledText B1 medium color={COLOR.N700} onClick={() => handleMyProfile()}>My Profile</StyledText>
          <StyledText B1 medium color={COLOR.N700} onClick={() => handleCommunity()}>Community Ranking</StyledText>
          <StyledText B1 medium color={COLOR.N700} onClick={() => handleLogOut()}>Log out</StyledText>
        </ToggleMenu>
      }
    </HeaderWrapper>
  )
}

export default Header

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 640px;
  height: 100%;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  position: relative;
`

const HeaderLogo = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
`

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`

const ProfileIcon = styled.img`
  margin-left: 16px;
  width: 32px;
  height: 32px;
  cursor: pointer;
`

const SignUpButton = styled.div`
  margin-left: 16px;
  width: 64px;
  height: 100%;
  border-radius: 4px;
  background: ${COLOR.BLUE1};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ToggleMenu = styled.div`
  position: absolute;
  top: 52px;
  right: 8px;
  width: 172px;
  height: 114px;
  padding: 12px 16px;
  background-color: #FFFFFF;
  border: 1px solid ${COLOR.N400};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledText = styled(Text)`
  user-select: none;
  cursor: pointer;
`
//React
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "context/AuthContext";
import { AppContext } from "context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

//Components
import { COLOR } from "constants/design";
import { Text } from "components/Text";
import { FlexBox } from "components/Flex";

//Assets
import mainLogo from "assets/icons/main_logo.svg";
import searchIcon from "assets/icons/search.svg";
import defaultProfile from "assets/icons/icon_default_profile.png";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: { loginData },
    dispatch,
  } = useContext(AuthContext);
  const {
    state: { isProfileToggleOpened },
    dispatch: appDispatch,
  } = useContext(AppContext);

  useEffect(() => {
    if (loginData) {
      if (location.pathname === "/login") {
        navigate("/", { replace: true });
      }
    } else {
      const localStorageData = localStorage.getItem("loginData");
      const sessionStorageData = sessionStorage.getItem("loginData");

      if (localStorageData) {
        const storedLoginData = JSON.parse(localStorageData);
        dispatch({
          type: "LOGIN",
          loginData: storedLoginData,
        });

        if (location.pathname === "/login") {
          navigate("/", { replace: true });
        }
      } else if (sessionStorageData) {
        const storedLoginData = JSON.parse(sessionStorageData);
        dispatch({
          type: "LOGIN",
          loginData: storedLoginData,
        });
        if (location.pathname === "/login") {
          navigate("/", { replace: true });
        }
      } else {
        switch (location.pathname) {
          case "/profile/settings":
          case "/community":
          case "/community/create":
          case "/community/settings":
            alert("You need to login");
            navigate("/login", { replace: true });
            break;

          default:
            break;
        }
      }
    }
  }, [location.pathname, dispatch, navigate, loginData]);

  function handleNavigateHome() {
    navigate("/");
    window.scrollTo({ top: 0 });
  }

  function handleNavigateSearch() {
    appDispatch({
      type: "OPEN_SEARCH_POPUP",
    });
  }

  function handleNavigateJoin() {
    navigate("/login");
  }

  function handleProfileMenu() {
    if (isProfileToggleOpened) {
      appDispatch({ type: "CLOSE_PROFILE_TOGGLE" });
    } else {
      appDispatch({ type: "OPEN_PROFILE_TOGGLE" });
    }
  }

  function handleMyProfile() {
    appDispatch({ type: "CLOSE_PROFILE_TOGGLE" });
    navigate("/profile");
    window.scrollTo({ top: 0 });
  }

  function handleCommunity() {
    appDispatch({ type: "CLOSE_PROFILE_TOGGLE" });
    navigate("/community/ranking");
    window.scrollTo({ top: 0 });
  }

  function handleLogOut() {
    localStorage.removeItem("loginData");
    sessionStorage.removeItem("loginData");
    for (const key in localStorage) {
      if (key.includes("-walletlink:https://www.walletlink.org:")) {
        localStorage.removeItem(key);
      }
      if (key.includes("wc@2:")) {
        localStorage.removeItem(key);
      }
      if (key.includes("wagmi.")) {
        localStorage.removeItem(key);
      }
    }
    dispatch({ type: "LOGOUT" });
    appDispatch({ type: "CLOSE_PROFILE_TOGGLE" });
    navigate("/login");
  }

  return (
    <HeaderWrapper>
      <HeaderLogo src={mainLogo} onClick={() => handleNavigateHome()} />
      <FlexBox />
      <SearchIcon src={searchIcon} onClick={() => handleNavigateSearch()} />
      {loginData ? (
        <ProfileIcon
          src={loginData.user.nft_thumbnail ?? defaultProfile}
          onClick={() => handleProfileMenu()}
        />
      ) : (
        <SignUpButton onClick={() => handleNavigateJoin()}>
          <Text B1 medium color="#FFFFFF">
            Join
          </Text>
        </SignUpButton>
      )}
      {isProfileToggleOpened && (
        <ToggleMenu>
          <StyledText
            B1
            medium
            color={COLOR.N700}
            onClick={() => handleMyProfile()}
          >
            My Profile
          </StyledText>
          <StyledText
            B1
            medium
            color={COLOR.N700}
            onClick={() => handleCommunity()}
          >
            Community Ranking
          </StyledText>
          <StyledText
            B1
            medium
            color={COLOR.N700}
            onClick={() => handleLogOut()}
          >
            Log out
          </StyledText>
        </ToggleMenu>
      )}
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: 640px;
  height: 100%;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  position: relative;
`;

const HeaderLogo = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;

const SearchIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ProfileIcon = styled.img`
  margin-left: 16px;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
`;

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
  background-color: #ffffff;
  border: 1px solid ${COLOR.N400};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledText = styled(Text)`
  user-select: none;
  cursor: pointer;
`;

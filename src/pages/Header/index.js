//React
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

//Assets
import logo from '../../assets/logo.png';
import profileMan from '../../assets/profile_man.jpeg';
import profileWoman from '../../assets/profile_woman.jpeg';

function Header() {

  const navigate = useNavigate();
  const sessionId = window.sessionStorage.getItem('member_id');
  const sessionName = window.sessionStorage.getItem('name');
  const sessionGender = window.sessionStorage.getItem('gender');

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginButtonClick = () => {
    navigate('/login');
  };

  return (
    <div class="header">
      <img class="logo" src={logo} alt="로고" onClick={handleLogoClick}/>
      {
        sessionId
          ? <div class="headerColumn">
            <img class="profile" src={sessionGender==='남성'?profileMan:profileWoman} alt="프로필" />
            <p>{sessionName}</p>
          </div>
          : <button class="login-button" onClick={handleLoginButtonClick}>로그인</button>
      }
    </div>
  );
}

export default Header;

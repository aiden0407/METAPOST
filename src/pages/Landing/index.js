//React
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

//components
import Header from '../Header';

//Assets
import landing from '../../assets/landing.jpeg';

function Landing() {

  const navigate = useNavigate();
  const sessionUserData = window.sessionStorage.getItem('member_id');

  const handleHomeButtonClick = () => {
    if (sessionUserData) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <Header />
      <div class="landingContainer">
        <img class="landingImage" src={landing} alt="랜딩 이미지" />
        <div class="landingColumn">
          <p class="landingTitle">"내 손 안의 트레이너!"</p>
          <p class="landingSubtitle">트레이너에게 Personal training을 받고 싶지만<br />너무 비싸고 시간적 여유도 없으시다구요?</p>
          <p class="landingSubtitle">더 가성비 좋고 효율적이게 관리받고 싶지 않으신가요?</p>
          <button class="landingHomeButton" onClick={handleHomeButtonClick}>받고 싶어요!</button>
        </div>
      </div>
    </>
  );
}

export default Landing;

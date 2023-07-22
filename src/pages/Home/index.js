//React
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

//components
import Header from '../Header';

function Home() {

  const navigate = useNavigate();

  const handleWorkoutButtonClick = () => {
    navigate('/workout');
  };

  const handleFoodButtonClick = () => {
    navigate('/food');
  };

  const handleFeedbackButtonClick = () => {
    navigate('/feedback');
  };

  return (
    <>
      <Header />
      <div class="homeContainer">
        <div class="homeMenuButton" onClick={handleWorkoutButtonClick}>
          <p class="homeTitle">운동</p>
          <p class="homeSubtitle">운동 자세를<br/>실시간으로 분석해드릴게요!</p>
        </div>

        <div class="homeMenuButton" onClick={handleFoodButtonClick}>
          <p class="homeTitle">식단</p>
          <p class="homeSubtitle">섭취한 식단의 영양성분을<br/>분석해드릴게요!</p>
        </div>

        <div class="homeMenuButton" onClick={handleFeedbackButtonClick}>
          <p class="homeTitle">Feedback</p>
          <p class="homeSubtitle">섭취하신 칼로리에 맞춰서<br/>소모해야 할 운동량을<br/>알려드릴게요!</p>
        </div>
      </div>
    </>
  );
}

export default Home;

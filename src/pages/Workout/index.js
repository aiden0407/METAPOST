//React
import React from 'react';
import './index.css';

//components
import Header from '../Header';

function Workout() {

  const sessionName = window.sessionStorage.getItem('name');
  const sessionGender = window.sessionStorage.getItem('gender');

  const handleWorkoutButtonClick = () => {
    //window.location.href = "http://healthtomize-ai.s3-website.ap-northeast-2.amazonaws.com/squat.html";
    window.location.href = `http://localhost:5500/squat.html?sessionName=${sessionName}&sessionGender=${sessionGender}`;
  };

  return (
    <>
      <Header />
      <div class="workoutContainer">
        <p class="workoutTitle">운동 분석</p>
        <p class="workoutSubtitle">데모 버전은 운동 수행 횟수 10회, 수행 운동은 스쿼트로 고정됩니다.<br />자세는 1.5초 이상 유지하시기 바랍니다.</p>
        <button class="workoutHomeButton" onClick={handleWorkoutButtonClick}>확인</button>
      </div>
    </>
  );
}

export default Workout;

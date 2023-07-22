//React
import React, { useState } from 'react';
import './index.css';

//components
import Header from '../Header';

function Feedback() {

  const memberId = window.sessionStorage.getItem('member_id');
  const [workout, setWorkout] = useState('');
  const [eat, setEat] = useState(formatNumber(Number(window.sessionStorage.getItem('kcal'))));
  const [result, setResult] = useState('');

  const handleWorkoutKcalChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setWorkout(numericValue);
  };

  const handleFeedbackButton1Click = () => {
    const feedback1 = document.getElementById('feedback-1');
    const feedback2 = document.getElementById('feedback-2');
    feedback1.style.display = 'none';
    feedback2.style.display = 'flex';
  };

  const handleFeedbackButton2Click = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('member_id', memberId);
    formData.append('used_calories', Number(workout));
    formData.append('food_calories', Number(eat));

    function generateBoundary() {
      return '----WebKitFormBoundary' + Math.random().toString(36).substring(2);
    }

    function formatFormData(formData, boundary) {
      const body = [];

      for (const [key, value] of formData.entries()) {
        body.push(`--${boundary}`);
        body.push(`Content-Disposition: form-data; name="${key}"`);
        body.push('');
        body.push(value);
      }

      body.push(`--${boundary}--`);

      return body.join('\r\n');
    }

    const boundary = generateBoundary();

    try {
      const response = await fetch('http://3.34.122.27:8080/foods/feedback/', {
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`
        },
        body: formatFormData(formData, boundary)
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.data);
        const feedback2 = document.getElementById('feedback-2');
        const feedback3 = document.getElementById('feedback-3');
        feedback2.style.display = 'none';
        feedback3.style.display = 'flex';
      } else {
        alert('칼로리를 다시 확인해주세요.');
      }
    } catch (error) {
      alert('요청에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  function formatNumber(value) {
    if (Number.isInteger(value)) {
      return value;
    } else if (typeof value === 'number') {
      return value.toFixed(1);
    } else {
      return value;
    }
  }

  return (
    <>
      <Header />
      <div class="feedbackContainer">
        <div id="feedback-1">
          <p class="feedbackTitle">Feedback</p>
          <p class="feedbackSubtitle">운동으로 소모한 칼로리에 맞춰서 섭취해야 할 영양정보를 알려드릴게요!</p>
          <button class="feedbackHomeButton" onClick={handleFeedbackButton1Click}>확인</button>
        </div>

        <div id="feedback-2">
          <div class="feedbackRow">
            <p class="feedbackText">운동으로 소모한 칼로리</p>
            <input
              type="text"
              value={workout}
              onChange={handleWorkoutKcalChange}
            />
            <p class="feedbackTextSmall">kcal</p>
          </div>
          <div class="feedbackRow">
            <p class="feedbackText">섭취한 칼로리</p>
            <input
              type="text"
              value={eat}
              readOnly
              style={{ fontWeight: '700', cursor: 'default'}}
            />
            <p class="feedbackTextSmall">kcal</p>
          </div>
          <button class="feedbackHomeButton" onClick={handleFeedbackButton2Click} style={{ background: '#518EFF', marginTop: 80 }}>시작 !</button>
        </div>

        <div id="feedback-3">
          <p class="feedbackTextLarge">분석한 결과입니다!</p>
          <div class="resultBox">
            <div class="resultRow">
              <p class="feedbackCategory">오늘 섭취한 칼로리</p>
              <p class="feedbackTextMedium">{result.food_calories}&nbsp;kcal</p>
            </div>
            <div class="resultRow">
              <p class="feedbackCategory">기초 대사량</p>
              <p class="feedbackTextMedium">{formatNumber(result.base_calories)}&nbsp;kcal</p>
            </div>
            <div class="resultRow">
              <p class="feedbackCategory">운동으로 소모한 칼로리</p>
              <p class="feedbackTextMedium">{result.used_calories}&nbsp;kcal</p>
            </div>
          </div>
          <p class="feedbackTextMedium">{result.status === 'much' ? '남은' : '부족한'} 칼로리는<span class="feedbackTextLarge">{result.calories} kcal</span>입니다!</p>
          {
            result.status === 'much'
              ? <p class="feedbackTextMedium" style={{ color: '#9C9C9C' }}>다음 운동을 통해 남은 칼로리를 소모할 수 있습니다</p>
              : <p class="feedbackTextMedium" style={{ color: '#9C9C9C' }}>다음 식품의 섭취를 통해 부족한 영양분을 섭취할 수 있습니다</p>
          }
          {
            result.status === 'much'
              ? <div class="recommandBox">
                <p class="feedbackTextMedium">스쿼트 {result.squat_m} 분</p>
                <p class="feedbackTextMedium">자전거 {result.bike_m} 분</p>
                <p class="feedbackTextMedium">푸쉬업 {result.pushup_m} 분</p>
                <p class="feedbackTextMedium">수영 {result.swim_m} 분</p>
                <p class="feedbackTextMedium">달리기 {result.run_m} 분</p>
              </div>
              : <div class="recommandBox">
                <p class="feedbackTextMedium">감자 {result.potato_ea} 개</p>
                <p class="feedbackTextMedium">삶은 계란 {result.egg_ea} 개</p>
                <p class="feedbackTextMedium">닭가슴살 {result.chest_ea} 개</p>
                <p class="feedbackTextMedium">바나나 {result.banana_ea} 개</p>
              </div>
          }
        </div>
      </div>
    </>
  );
}

export default Feedback;

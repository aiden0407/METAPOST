//React
import React, { useEffect, useState } from 'react';
import './index.css';

//components
import Header from '../Header';

function Food() {

  const [foodOptions, setFoodOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [gram, setGram] = useState('');
  const [result, setResult] = useState('');

  const handleGramChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setGram(numericValue);
  };

  useEffect(() => {
    fetchFoodOptions();
  }, []);

  const fetchFoodOptions = async () => {
    try {
      const response = await fetch('http://3.34.122.27:8080/foods/');
      if (response.ok) {
        const data = await response.json();
        setFoodOptions(data);
      } else {
        alert('요청에 실패하였습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('요청에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFoodButton1Click = () => {
    const food1 = document.getElementById('food-1');
    const food2 = document.getElementById('food-2');
    food1.style.display = 'none';
    food2.style.display = 'flex';
  };

  const handleFoodButton2Click = async (event) => {
    event.preventDefault();

    if (selectedOption && gram) {
      const formData = new FormData();
      formData.append('food_name', selectedOption);
      formData.append('serving_size', Number(gram));

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
        const response = await fetch('http://3.34.122.27:8080/foods/estimate/', {
          method: 'POST',
          headers: {
            'Content-Type': `multipart/form-data; boundary=${boundary}`
          },
          body: formatFormData(formData, boundary)
        });

        if (response.ok) {
          const data = await response.json();
          setResult(data.data);
          const savedKcal = Number(window.sessionStorage.getItem('kcal'));
          window.sessionStorage.setItem('kcal', Number(savedKcal+(data.data.calories * data.data.rate)));
          const food2 = document.getElementById('food-2');
          const food3 = document.getElementById('food-3');
          food2.style.display = 'none';
          food3.style.display = 'flex';
        } else {
          alert('음식 양을 다시 확인해주세요.');
        }
      } catch (error) {
        alert('요청에 실패하였습니다. 다시 시도해주세요.');
      }
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

  const handleFoodButton3Click = () => {
    const food3 = document.getElementById('food-3');
    const food2 = document.getElementById('food-2');
    food3.style.display = 'none';
    food2.style.display = 'flex';
  };

  return (
    <>
      <Header />
      <div class="foodContainer">
        <div id="food-1">
          <p class="foodTitle">식단 분석</p>
          <p class="foodSubtitle">먹은 음식을 입력하면 섭취한 영양 정보를 분석해드릴게요!</p>
          <button class="foodHomeButton" onClick={handleFoodButton1Click}>확인</button>
        </div>

        <div id="food-2">
          <p class="foodSubtitle">먹은 음식을 리스트에서 골라주시고,<br />먹은 음식의 양을 적어주세요!</p>

          <div class="selectRow">
            <span class="foodTextMedium" style={{ marginRight: 20 }}>먹은 음식:</span>
            <select value={selectedOption} onChange={handleOptionChange}>
              <option value="">먹은 음식을 선택해 주세요</option>
              {foodOptions.map((option) => (
                <option key={option.food_name} value={option.food_name}>
                  {option.food_name}
                </option>
              ))}
            </select>
          </div>

          <div class="selectRow" style={{ marginTop: -80 }}>
            <span class="foodTextMedium" style={{ marginRight: 20 }}>음식 양:</span>
            <input
              type="text"
              value={gram}
              onChange={handleGramChange}
            />
            <span class="foodTextMedium" style={{ marginLeft: 10 }}>g</span>
          </div>

          <button class="foodHomeButton" onClick={handleFoodButton2Click} style={{ background: '#518EFF' }}>분석하기</button>
        </div>

        <div id="food-3">
          <p class="foodTextLarge">분석한 결과입니다!</p>
          <div class="resultBox">
            <div class="foodResultRow">
              <p class="foodCategory">섭취한 음식</p>
              <p class="foodTextMedium">{result.food_name}</p>
            </div>
            <div class="foodResultRow">
              <p class="foodCategory">섭취량</p>
              <p class="foodTextMedium">{formatNumber(result.rate * 100)}&nbsp;g</p>
            </div>
            <div class="foodResultRow">
              <p class="foodCategory">칼로리</p>
              <p class="foodTextMedium">{formatNumber(result.calories * result.rate)}&nbsp;kcal</p>
            </div>
            <div class="foodResultRow">
              <p class="foodCategory">탄수화물</p>
              <p class="foodTextMedium">{formatNumber(result.carbon * result.rate)}&nbsp;g</p>
            </div>
            <div class="foodResultRow">
              <p class="foodCategory">단백질</p>
              <p class="foodTextMedium">{formatNumber(result.protein * result.rate)}&nbsp;g</p>
            </div>
            <div class="foodResultRow">
              <p class="foodCategory">지방</p>
              <p class="foodTextMedium">{formatNumber(result.fat * result.rate)}&nbsp;g</p>
            </div>
            <div class="foodResultRow">
              <p class="foodCategory">콜레스테롤</p>
              <p class="foodTextMedium">{formatNumber(result.cholesterol * result.rate)}&nbsp;g</p>
            </div>
          </div>
            <button class="foodHomeButton" onClick={handleFoodButton3Click} style={{ background: '#518EFF' }}>다른 음식 추가하기</button>
        </div>
      </div>
    </>
  );
}

export default Food;

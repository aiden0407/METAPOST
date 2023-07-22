//React
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Join() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [purpose, setPurpose] = useState('');

  const handleAgeChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    setAge(numericValue);
  };

  const handleJoin = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('member_id', id);
    formData.append('passwd', password);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('height', height);
    formData.append('weight', weight);
    formData.append('gender', gender);
    formData.append('purpose', purpose);
    formData.append('age', age);

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
      const response = await fetch('http://3.34.122.27:8080/members/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`
        },
        body: formatFormData(formData, boundary)
      });

      if (response.ok) {
        alert('회원가입이 완료되었습니다.');
        navigate('/login');
      } else {
        alert('가입 정보를 다시 확인해주세요.');
      }
    } catch (error) {
      alert('요청에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div class="joinContainer">
      <div class="joinInputContainer">
        <p class="joinInputContainerName">EMAIL</p>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div class="joinInputContainer">
        <p class="joinInputContainerName">ID</p>
        <input
          type="text"
          value={id}
          onChange={(event) => setId(event.target.value)}
        />
      </div>

      <div class="joinInputContainer">
        <p class="joinInputContainerName">Password</p>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <p class="pwPattern">최소 8자 이상(영문,숫자,특수문자(!,@,#,$,&,*) 포함)</p>
      </div>

      <div class="joinInputContainer">
        <p class="joinInputContainerName">이름</p>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div class="joinInputContainer">
        <p class="joinInputContainerName">나이</p>
        <div class="joinRow">
          <input
            type="text"
            value={age}
            onChange={handleAgeChange}
          />
          세
        </div>
      </div>

      <div class="joinInputContainer">
        <p class="joinInputContainerName">성별</p>
        <div class="joinButtonRow">
          <button
            class={gender === '여성' ? 'joinOptionButton selected' : 'joinOptionButton'}
            onClick={() => setGender('여성')}
          >
            여성
          </button>
          <button
            class={gender === '남성' ? 'joinOptionButton selected' : 'joinOptionButton'}
            onClick={() => setGender('남성')}
          >
            남성
          </button>
        </div>
      </div>

      <div class="joinInputContainer">
        <p class="joinInputContainerName">키</p>
        <div class="joinRow">
          <input
            type="number" step="any"
            value={height}
            onChange={(event) => setHeight(event.target.value)}
          />
          cm
        </div>
      </div>

      <div class="joinInputContainer">
        <p class="joinInputContainerName">몸무게</p>
        <div class="joinRow">
          <input
            type="number" step="any"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
          kg
        </div>
      </div>

      <div class="joinInputContainer">
        <p class="joinInputContainerName">목적</p>
        <div class="joinButtonRow">
          <button
            class={purpose === '증량' ? 'joinOptionButton selected' : 'joinOptionButton'}
            onClick={() => setPurpose('증량')}
          >
            증량
          </button>
          <button
            class={purpose === '감량' ? 'joinOptionButton selected' : 'joinOptionButton'}
            onClick={() => setPurpose('감량')}
          >
            감량
          </button>
        </div>
      </div>

      <div class="joinButtonContainer">
        <button class="joinButton" onClick={handleJoin}>회원가입</button>
      </div>
    </div>
  );
}

export default Join;

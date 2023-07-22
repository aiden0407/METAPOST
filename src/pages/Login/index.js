//React
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Login() {

  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('member_id', userId);
    formData.append('passwd', userPassword);

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
      const response = await fetch('http://3.34.122.27:8080/members/signin/', {
        method: 'POST',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`
        },
        body: formatFormData(formData, boundary)
      });

      if (response.ok) {
        const data = await response.json();
        window.sessionStorage.setItem('member_id', userId);
        window.sessionStorage.setItem('gender', data.member.gender);
        window.sessionStorage.setItem('name', data.member.name);
        navigate('/');
      } else {
        alert('아이디와 비밀번호를 다시 확인해주세요.');
      }
    } catch (error) {
      alert('요청에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  const handleJoin = () => {
    navigate('/join');
  };

  return (
    <div class="loginContainer">
      <p class="loginTitle">Health-tomize</p>

      <div class="loginInputContainer">
        <p class="loginInputContainerName">ID</p>
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
        <p class="loginInputContainerName">Password</p>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={userPassword}
          onChange={(event) => setUserPassword(event.target.value)}
        />
      </div>

      <div class="loginButtonContainer">
        <button class="loginButton" onClick={handleLogin}>로그인</button>
        <p class="loginJoinText" onClick={handleJoin}>회원가입</p>
      </div>
    </div>
  );
}

export default Login;

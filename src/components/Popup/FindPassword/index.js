//React
import { useState, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { BorderInput } from 'components/TextInput';
import { Row } from 'components/Flex';

//Api
import { findPassword } from 'apis/Login';


function FindPassword() {

  const { dispatch } = useContext(AppContext);
  const [email, setEmail] = useState('');

  const handleSend = async function () {
    if (!email.length) {
      alert('Email field is empty');
      return;
    }

    try {
      const response = await findPassword(email);
      alert('Email has been sent');
    } catch (error) {
      alert(error);
    }
  }

  const handlePopupClose = (event) => {
    if (event.target === event.currentTarget) {
      dispatch({ type: 'CLOSE_FIND_PASSWORD_POPUP' });
    }
  };

  return (
    <PopupContainer onClick={handlePopupClose}>
      <PopupBox>
        <Text B0 medium color={COLOR.N800}>Enter a registered e-mail</Text>
        <BorderInput
        type="text"
        placeholder="your@example.com"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        marginTop={16}
      />

      <StyledRow>
        <SendButton onClick={()=>handleSend()}>
          <Text B1 color={COLOR.N700}>Send</Text>
        </SendButton>
        <CloseButton onClick={()=>dispatch({ type: 'CLOSE_FIND_PASSWORD_POPUP' })} >
          <Text B1 color="#FFFFFF">Close</Text>
        </CloseButton>
      </StyledRow>
      </PopupBox>
    </PopupContainer>
  )
}

export default FindPassword

const PopupContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

const PopupBox = styled.div`
  width: 320px;
  padding: 16px;
  background-color: #FFFFFF;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  animation: popup-animation 0.2s ease-in-out;
  @keyframes popup-animation {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const StyledRow = styled(Row)`
  margin-top: 16px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 4px;
`;


const SendButton = styled.div`
  width: 80px;
  height: 40px;
  border-radius: 4px;
  background: ${COLOR.N400};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CloseButton = styled.div`
  width: 80px;
  height: 40px;
  border-radius: 4px;
  background: ${COLOR.BLUE1};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
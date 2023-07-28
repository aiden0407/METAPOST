//React
import { useState, useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { BorderInput } from 'components/TextInput';
import { Row, RelativeWrapper } from 'components/Flex';

//Api
import { emailAuthSend, emailAuthCheck, userNameCheck, registerByEmail } from 'apis/SignUp';

//Assets
import arrowNextIcon from 'assets/icons/arrow_next.svg';
import passwordEyeIcon from 'assets/icons/password_eye.svg';
import walletIcon from 'assets/icons/wallet.svg';

import defaultProfile from 'assets/icons/icon_default_profile.png';
import metaMaskIcon from 'assets/icons/icon_metamask.png';
import coinbaseIcon from 'assets/icons/icon_coinbase.png';
import walletConnectIcon from 'assets/icons/icon_walletconnect.png';
import nftIcon from 'assets/icons/icon_nft.png';

function SignUpEmail() {

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [step, setStep] = useState('Basic info');

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isEmailAuthChecked, setIsEmailAuthChecked] = useState(false);

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [userName, setUserName] = useState('');
  const [isToggleOpened, setIsToggleOpened] = useState(false);
  const [walletAdress, setWalletAdress] = useState();
  const [nftId, setNftId] = useState();

  const handleEmailAuthSend = async function () {
    if(email.length){
      try {
        const response = await emailAuthSend(email);
        setCode(response.data.code.toString());
      } catch (error) {
        alert(error);
      }
    } else {
      alert('Email field is empty');
    }
  }

  const handleEmailAuthCheck = async function () {
    try {
      const response = await emailAuthCheck(email, code);
      alert(response.data);
      if(response.data==="Authentication is complete."){
        setIsEmailAuthChecked(true);
      }
    } catch (error) {
      alert(error);
    }
  }

  function handleContinue() {
    if(!isEmailAuthChecked){
      alert('Email is not verified');
      return ;
    }
    if(password!==passwordConfirm || !password){
      alert('Passwords do not match');
      return ;
    }
    setStep('Profile Setting');
  }

  function handleConnectWallet() {
  }

  const checkUserNameAvailability = async function () {
    try {
      const response = await userNameCheck(userName);
      return response.data;
    } catch (error) {
      alert(error);
    }
  }

  const handleDone = async function () {
    try {
      const nicknameAlreadyUsed = await checkUserNameAvailability();
  
      if (!nicknameAlreadyUsed) {
        const response = await registerByEmail(email, password, userName, walletAdress, nftId);

        dispatch({
          type: 'LOGIN',
          loginData: response.data
        });
        sessionStorage.setItem('loginData', JSON.stringify(response.data));
        
        navigate('/', { replace: true });
      } else {
        alert('The user name is already in use');
      }
    } catch (error) {
      if(error?.uid){
        alert(error?.uid[0]);
      }
      if(error?.nickname){
        alert(error?.nickname[0]);
      }
    }
  }

  return (
    <LoginContainer>
      <Text H3 bold>Sign up</Text>
      <Row marginTop={16}>
        <IndexIconFilled><Text B1 medium color="#FFFFFF">1</Text></IndexIconFilled>
        <Text B1 medium color={COLOR.N700} marginLeft={8}>Basic info</Text>
        <Image src={arrowNextIcon} width={20} marginLeft={8} />
        {
          step === 'Basic info'
            ? <IndexIcon><Text B1 medium color={COLOR.N600}>2</Text></IndexIcon>
            : <IndexIconFilled style={{ marginLeft: 8 }}><Text B1 medium color="#FFFFFF">2</Text></IndexIconFilled>
        }
        <Text B1 medium color={COLOR.N700} marginLeft={8}>Profile Setting</Text>
      </Row>

      {
        step === 'Basic info'
          ? (<>
            <Text B1 medium color={COLOR.N700} marginTop={32}>E-mail</Text>
            <Row marginTop={8}>
              <BorderInput
                type="text"
                placeholder="your@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <SmallButton onClick={()=>handleEmailAuthSend()}><Text B1 medium color={COLOR.N800}>Send</Text></SmallButton>
            </Row>

            <Text B1 medium color={COLOR.N700} marginTop={24}>Confirm Code</Text>
            <Row marginTop={8}>
              <BorderInput
                type="text"
                placeholder="code"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                }}
              />
              <SmallButton onClick={()=>handleEmailAuthCheck()}><Text B1 medium color={COLOR.N800}>Done</Text></SmallButton>
            </Row>

            <Text B1 medium color={COLOR.N700} marginTop={24}>Password</Text>
            <RelativeWrapper>
              <BorderInput
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                marginTop={8}
              />
              <StyledImage src={passwordEyeIcon} width={24} onClick={() => setShowPassword(!showPassword)} />
            </RelativeWrapper>

            <Text B1 medium color={COLOR.N700} marginTop={24}>Confirm Password</Text>
            <RelativeWrapper>
              <BorderInput
                type={showPasswordConfirm ? 'text' : 'password'}
                value={passwordConfirm}
                onChange={(event) => {
                  setPasswordConfirm(event.target.value);
                }}
                marginTop={8}
              />
              <StyledImage src={passwordEyeIcon} width={24} onClick={() => setShowPasswordConfirm(!showPasswordConfirm)} />
            </RelativeWrapper>

            <NextButton onClick={() => handleContinue()}>
              <Text B1 bold color={COLOR.N700}>Continue</Text>
            </NextButton>
          </>)
          : (<>
            <CenterWrapper>
              <Image src={defaultProfile} width={80} borderRadius="6px" />
              <Text B1 medium color={COLOR.N700} marginTop={userName ? 12 : 26}>{userName}</Text>
            </CenterWrapper>

            <Text B1 medium color={COLOR.N700} marginTop={40}>Wallet</Text>
            {
              isToggleOpened
                ? <ToggleMenu>
                  <StyledRow onClick={() => handleConnectWallet()}>
                    <Image src={metaMaskIcon} width={24} />
                    <Text B1 medium marginLeft={8}>MetaMask</Text>
                  </StyledRow>
                  <StyledRow onClick={() => handleConnectWallet()}>
                    <Image src={coinbaseIcon} width={24} />
                    <Text B1 medium marginLeft={8}>Coinbase Wallet</Text>
                  </StyledRow>
                  <StyledRow onClick={() => handleConnectWallet()}>
                    <Image src={walletConnectIcon} width={24} />
                    <Text B1 medium marginLeft={8}>WalletConnect</Text>
                  </StyledRow>
                </ToggleMenu>
                : <ConnectWalletButton onClick={() => setIsToggleOpened(true)}>
                  <Text H5 bold color="#FFFFFF">Connect</Text>
                </ConnectWalletButton>
            }

            <Text B1 medium color={COLOR.N700} marginTop={16}>User name</Text>
            <BorderInput
              type="text"
              placeholder="user name"
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
              marginTop={8}
            />

            <Row marginTop={16}>
              <Text B1 medium color={COLOR.N700}>Profile Image</Text>
              <Image src={nftIcon} width={20} marginLeft={6} />
            </Row>
            <ProfileImageSelectBox>
              <Image src={walletIcon} width={24} />
              <Text B1 center color={COLOR.N700} marginTop={8}>Please connect your NFT wallet{'\n'}and make it a profile image.</Text>
            </ProfileImageSelectBox>

            <CenterWrapper>
            <Row marginTop={8}>
              <CheckBox type="checkbox" />
              <Text B1 medium color={COLOR.N700} marginLeft={8}>I agree to the&nbsp;</Text>
              <StyledText B1 medium color={COLOR.N700}>Terms and Conditions</StyledText>
            </Row>
            </CenterWrapper>

            <NextButton onClick={() => handleDone()}>
              <Text B1 bold color={COLOR.N700}>Done</Text>
            </NextButton>
          </>)
      }
    </LoginContainer>
  );
}

export default SignUpEmail;

const LoginContainer = styled.div`
  width: 100%;
  padding: 24px 24px 80px 24px;
  display: flex;
  flex-direction: column;
`

const IndexIconFilled = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${COLOR.BLUE1};
  display: flex;
  justify-content: center;
  align-items: center;
`

const IndexIcon = styled.div`
  margin-left: 8px;
  width: 20px;
  height: 20px;
  border: 1px solid ${COLOR.N600};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SmallButton = styled.div`
  margin-left: 8px;
  width: 117px; //width: 80px; 하면 제대로 적용 안됨
  height: 48px;
  border-radius: 6px;
  background-color: ${COLOR.N400};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const NextButton = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 48px;
  border: 1px solid ${COLOR.N400};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledImage = styled(Image)`
  position: absolute;
  top: 20px;
  right: 12px;
  cursor: pointer;
`

const CenterWrapper = styled.div`
  margin-top: 32px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ConnectWalletButton = styled.div`
  margin-top: 8px;
  width: 100%;
  height: 48px;
  border-radius: 6px;
  background: ${COLOR.BLUE1};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ToggleMenu = styled.div`
  margin-top: 8px;
  width: 100%;
  height: 144px;
  padding: 12px 16px;
  background-color: #FFFFFF;
  border: 1px solid ${COLOR.N400};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledRow = styled(Row)`
  cursor: pointer;
`

const ProfileImageSelectBox = styled.div`
  margin-top: 8px;
  width: 100%;
  height: 176px;
  border-radius: 6px;
  background-color: ${COLOR.N400};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  border: 4px solid ${COLOR.N600};
  border-radius: 4px;
  cursor: pointer;
`

const StyledText = styled(Text)`
  cursor: pointer;
  border-bottom: 1px solid ;
`
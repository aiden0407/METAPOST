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
import { Row, FlexBox, DividingLine } from 'components/Flex';

//Api
import { loginByEmail } from 'apis/Login';

//Assets
import etheriumIcon from 'assets/icons/icno_etherium.png';
import metaMaskIcon from 'assets/icons/icon_metamask.png';
import coinbaseIcon from 'assets/icons/icon_coinbase.png';
import walletConnectIcon from 'assets/icons/icon_walletconnect.png';

function Login() {

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRememberChecked, setIsRememberChecked] = useState(false);
  const [isWalletClicked, setIsWalletClicked] = useState(false);

  const handleSignIn = async function () {
    if (!email.length) {
      alert('Email field is empty');
      return;
    }
    if (!password.length) {
      alert('Password field is empty');
      return;
    }

    try {
      const response = await loginByEmail(email, password);
      dispatch({
        type: 'LOGIN',
        loginData: response.data
      });

      if (isRememberChecked) {
        localStorage.setItem('loginData', JSON.stringify(response.data));
      } else {
        sessionStorage.setItem('loginData', JSON.stringify(response.data));
      }

      navigate('/');

    } catch (error) {
      alert(error.실패);
    }
  }

  function handleWalletClick() {
    setIsWalletClicked(true);
  }

  function handleNavigateSignUpWallet() {
    navigate('/signup/wallet');
  }

  function handleNavigateSignUpEmail() {
    navigate('/signup/email');
  }

  return (
    <LoginContainer>
      <Text H3 bold>Welcome !</Text>

      <Text H5 medium color={COLOR.N700} marginTop={40}>E-mail</Text>
      <BorderInput
        type="text"
        placeholder="your@example.com"
        value={email}
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        marginTop={8}
      />
      <Text H5 medium color={COLOR.N700} marginTop={16}>Password</Text>
      <BorderInput
        type="password"
        placeholder="your password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            handleSignIn();
          }
        }}
        marginTop={8}
      />

      <Row marginTop={24}>
        <CheckBox
          type="checkbox"
          checked={isRememberChecked}
          onChange={(event) => {
            setIsRememberChecked(event.target.checked);
          }}
        />
        <Text H5 medium color={COLOR.N700} marginLeft={8}>Remember me</Text>
        <FlexBox />
        <SignInButton onClick={() => handleSignIn()}>
          <Text B0 medium color={COLOR.BLUE1}>Sign in</Text>
        </SignInButton>
      </Row>

      <DividingLine marginTop={25} />

      {
        isWalletClicked
          ? <ToggleMenu>
            <StyledRow onClick={() => handleNavigateSignUpWallet()}>
              <Image src={metaMaskIcon} width={24} />
              <Text B1 medium marginLeft={8}>MetaMask</Text>
            </StyledRow>
            <StyledRow onClick={() => handleNavigateSignUpWallet()}>
              <Image src={coinbaseIcon} width={24} />
              <Text B1 medium marginLeft={8}>Coinbase Wallet</Text>
            </StyledRow>
            <StyledRow onClick={() => handleNavigateSignUpWallet()}>
              <Image src={walletConnectIcon} width={24} />
              <Text B1 medium marginLeft={8}>WalletConnect</Text>
            </StyledRow>
          </ToggleMenu>
          : <ConnectWalletButton onClick={() => handleWalletClick()}>
            <Row>
              <Image src={etheriumIcon} width={20} />
              <Text H5 bold color="#FFFFFF" marginLeft={4}>Connect with Wallet</Text>
            </Row>
          </ConnectWalletButton>
      }

      <Row marginTop={24}>
        <StyledText B1 medium color={COLOR.N700}>Forgot password?</StyledText>
        <FlexBox />
        <Text B1 medium color={COLOR.N700}>Need an account?</Text>
        <StyledText B1 medium color={COLOR.BLUE1} marginLeft={6} onClick={() => handleNavigateSignUpEmail()}>Sign up</StyledText>
      </Row>

    </LoginContainer>
  );
}

export default Login;

const LoginContainer = styled.div`
  width: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
`

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  border: 4px solid ${COLOR.N600};
  border-radius: 4px;
  cursor: pointer;
`

const SignInButton = styled.div`
  width: 98px;
  height: 40px;
  border-radius: 6px;
  background: ${COLOR.N400};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ConnectWalletButton = styled.div`
  margin-top: 24px;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  background: ${COLOR.BLUE1};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ToggleMenu = styled.div`
  margin-top: 24px;
  width: 100%;
  height: 144px;
  padding: 12px 16px;
  background-color: #FFFFFF;
  border: 1px solid ${COLOR.N400};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const StyledRow = styled(Row)`
  cursor: pointer;
`

const StyledText = styled(Text)`
  cursor: pointer;
  border-bottom: 1px solid ;
`
//React
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { AppContext } from 'context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

//Web3
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import { useWeb3Modal } from '@web3modal/react'
import { useAccount } from 'wagmi'

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { BorderInput } from 'components/TextInput';
import { Row, FlexBox, DividingLine } from 'components/Flex';

//Api
import { loginByEmail, loginByWallet } from 'apis/Login';

//Assets
import etheriumIcon from 'assets/icons/icno_etherium.png';
import metaMaskIcon from 'assets/icons/icon_metamask.png';
import coinbaseIcon from 'assets/icons/icon_coinbase.png';
import walletConnectIcon from 'assets/icons/icon_walletconnect.png';

function Login() {

  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useContext(AuthContext);
  const { dispatch: appDispatch } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRememberChecked, setIsRememberChecked] = useState(false);
  const [isWalletClicked, setIsWalletClicked] = useState(false);

  useEffect(() => {
    for (const key in localStorage) {
      if (key.includes("-walletlink:https://www.walletlink.org:")) {
        localStorage.removeItem(key);
      }
      if (key.includes("wc@2:")) {
        localStorage.removeItem(key);
      }
      if (key.includes("wagmi.")) {
        localStorage.removeItem(key);
      }
    }
  }, [location]);

  function handleWalletClick() {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobileDevice) {
      handleWalletConnect();
    } else {
      setIsWalletClicked(true);
    }
  }

  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount()
  function handleWalletConnect() {
    if(!isConnected){
      open();
    }
  }
  useEffect(() => {
    if(isConnected) {
      handleSignInByWallet(address);
    }
  }, [isConnected]);

  async function connectWallet() {
    let web3Modal = new Web3Modal({
      cacheProvider: false,
    });

    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      if (accounts) handleSignInByWallet(accounts[0]);
    } catch (error) {
      if (error === 'Modal closed by user') {
        alert('To use this wallet, extension must be installed');
      }
      console.log(error);
    }
  }

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

  const handleSignInByWallet = async function (address) {
    try {
      const response = await loginByWallet(address);
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
      navigate(`/signup/wallet?wallet_address=${address}`);
    }
  }

  function handleFindPassword() {
    appDispatch({ type: 'OPEN_FIND_PASSWORD_POPUP' });
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

      <DividingLine marginTop={25} color={COLOR.N600} />

      {
        isWalletClicked
          ? <ToggleMenu>
            <StyledRow onClick={connectWallet}>
              <Image src={metaMaskIcon} width={24} />
              <Text B1 medium marginLeft={8}>MetaMask</Text>
            </StyledRow>
            <StyledRow onClick={connectWallet}>
              <Image src={coinbaseIcon} width={24} />
              <Text B1 medium marginLeft={8}>Coinbase Wallet</Text>
            </StyledRow>
            <StyledRow onClick={() => handleWalletConnect()}>
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
        <StyledText B1 medium color={COLOR.N700} onClick={() => handleFindPassword()} >Forgot password?</StyledText>
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
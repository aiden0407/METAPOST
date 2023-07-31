//React
import { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from 'context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { BorderInput } from 'components/TextInput';
import { Row } from 'components/Flex';

//Api
import { nftCheckByWallet, userNameCheck, registerByWallet } from 'apis/SignUp';

//Assets
import copyIcon from 'assets/icons/copy.svg';
import profileIcon from 'assets/icons/profile.svg';
import defaultProfile from 'assets/icons/icon_default_profile.png';
import nftIcon from 'assets/icons/icon_nft.png';

function SignUpWallet() {

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const walletAdress = searchParams.get('wallet_address');

  const { dispatch } = useContext(AuthContext);
  const [nftData, setNftData] = useState();
  const [userName, setUserName] = useState('');
  const [profile, setProfile] = useState();
  const [agreePolicy, setAgreePolicy] = useState(false);

  useEffect(() => {
    if(walletAdress){
      initSignUpWallet();
    }else{
      alert('Invalid access');
      window.history.back();
    }
  }, [walletAdress]);

  const initSignUpWallet = async function () {
    try {
      const response = await nftCheckByWallet(walletAdress);
      setNftData(response);
    } catch (error) {
      alert(error);
    }
  };

  function maskWalletAddress(walletAddress) {
    const maskedAddress = walletAddress?.replace(/^(.{8}).+(.{4})$/, '$1...$2');
    return maskedAddress;
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
    if(!userName.length){
      alert('Please enter your nickname');
      return ;
    }

    if(!agreePolicy){
      alert('You did not agree to the terms and conditions');
      return ;
    }

    try {
      const nicknameAlreadyUsed = await checkUserNameAvailability();
  
      if (!nicknameAlreadyUsed) {
        const response = await registerByWallet(walletAdress, userName, profile);

        dispatch({
          type: 'LOGIN',
          loginData: response.data
        });
        sessionStorage.setItem('loginData', JSON.stringify(response.data));
        
        navigate('/', { replace: true });
        window.scrollTo({ top: 0 });

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

  if(!walletAdress){
    return ;
  }

  return (
    <LoginContainer>
      <Text H3 bold>Complete Sign up</Text>

      <CenterWrapper>
        <Image src={profile ?? defaultProfile} width={80} borderRadius="6px" />
        <Text B1 medium color={COLOR.N700} marginTop={userName ? 12 : 26}>{userName}</Text>
      </CenterWrapper>

      <Text B1 medium color={COLOR.N700} marginTop={40}>Wallet</Text>
      <WalletAdressBox>
        <Row>
          <Text B1 medium color={COLOR.N700}>{maskWalletAddress(walletAdress)}</Text>
          <StyledImage src={copyIcon} width={16} marginLeft={8} />
        </Row>
      </WalletAdressBox>

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
        <Image src={profileIcon} width={24} />
        <Text B1 center color={COLOR.N700} marginTop={8}>You don’t have any NFTs in your wallet.</Text>
      </ProfileImageSelectBox>

      <CenterWrapper>
        <Row marginTop={8}>
          <CheckBox
            type="checkbox"
            checked={agreePolicy}
            onChange={(event) => {
              setAgreePolicy(event.target.checked);
            }}
          />
          <Text B1 medium color={COLOR.N700} marginLeft={8}>I agree to the&nbsp;</Text>
          <StyledText B1 medium color={COLOR.N700}
            onClick={() => {
              window.open('/terms', '_blank');
            }}
          >
            Terms and Conditions
          </StyledText>
        </Row>
      </CenterWrapper>

      <NextButton onClick={() => handleDone()}>
        <Text B1 bold color={COLOR.N700}>Done</Text>
      </NextButton>
    </LoginContainer>
  );
}

export default SignUpWallet;

const LoginContainer = styled.div`
  width: 100%;
  padding: 24px 24px 80px 24px;
  display: flex;
  flex-direction: column;
`

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

const WalletAdressBox = styled.div`
  margin-top: 8px;
  width: 100%;
  height: 48px;
  border-radius: 6px;
  background: ${COLOR.N400};
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
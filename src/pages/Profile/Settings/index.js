//React
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { BorderInput } from 'components/TextInput';
import { Row } from 'components/Flex';

//Api
import { getMyProfileData, editUserData } from 'apis/Profile';

//Assets
import walletIcon from 'assets/icons/wallet.svg';
import copyIcon from 'assets/icons/copy.svg';
import nftIcon from 'assets/icons/icon_nft.png';
import defaultProfile from 'assets/icons/icon_default_profile.png';

function ProfileSettings() {

  const navigate = useNavigate();
  const { state: { loginData }, dispatch } = useContext(AuthContext);

  const [userData, setUserData] = useState();
  const [userName, setUserName] = useState();
  const [description, setDescription] = useState();

  const [walletAdress, setWalletAdress] = useState();
  const [nftId, setNftId] = useState();

  const [email, setEmail] = useState();
  const [code, setCode] = useState();
  const [isEmailAuthChecked, setIsEmailAuthChecked] = useState(false);

  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  useEffect(() => {
    if (loginData) {
      initUserProfile();
    }
  }, [loginData]);

  const initUserProfile = async function () {
    try {
      const response = await getMyProfileData(loginData.token.access);
      setUserData(response.data);
      setUserName(response.data.nickname);
      setDescription(response.data.description ?? '');
      setWalletAdress(response.data.wallet_address ?? undefined);
      setNftId(response.data.nft_id ?? undefined);
    } catch (error) {
      alert(error);
    }
  };

  const handleDone = async function () {
    if(password && !passwordConfirm){
      alert('Password confirmation field is Empty');
      return ;
    }

    if(!password && passwordConfirm){
      alert('Password field is Empty');
      return ;
    }

    if(password && passwordConfirm && password!==passwordConfirm){
      alert('Passwords do not match');
      return ;
    }

    try {
      const response = await editUserData(loginData.token.access, (isEmailAuthChecked ? email : undefined), password, (loginData.user.nickname === userName ? undefined : userName ), (loginData.user.wallet_address === walletAdress ? undefined : walletAdress ), nftId, description);
      dispatch({
        type: 'PROFILE_UPDATE',
        profileData: response.data
      });
      const localStorageData = localStorage.getItem('loginData');
      if (localStorageData) {
        localStorage.setItem('loginData', JSON.stringify(response.data));
      } else {
        sessionStorage.setItem('loginData', JSON.stringify(response.data));
      }
      navigate('/profile');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      alert(error);
    }
  };

  if (!userData) {
    return null;
  }

  return (
    <ProfileContainer>
      <Text H4 bold color={COLOR.N1000} marginTop={12} marginLeft={12}>User setting</Text>

      <ProfileBox>
        <Image src={userData.nft_thumbnail ?? defaultProfile} width={80} borderRadius="4px" />
        <Text B1 medium color={COLOR.N700} marginTop={12}>{userData.nickname}</Text>
        <Row marginTop={9}>
          <Image src={nftIcon} width={16} />
          <Text B1 medium color={COLOR.N800} marginLeft={4}>{userData.nft_name}</Text>
        </Row>
      </ProfileBox>

      <ContentBox>
        <Text H5 bold color={COLOR.N1000}>User name</Text>
        <BorderInput
          type="text"
          placeholder={userData.nickname}
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          marginTop={16}
          style={{ fontSize: '14px' }}
        />
      </ContentBox>

      <ContentBox>
        <Row>
          <Text Text H5 bold color={COLOR.N1000}>Profile Image</Text>
          <Image src={nftIcon} width={20} marginLeft={4} />
        </Row>
        <ProfileImageSelectBox>
          <Image src={walletIcon} width={24} />
          <Text B1 center color={COLOR.N700} marginTop={8}>Please connect your NFT wallet{'\n'}and make it a profile image.</Text>
        </ProfileImageSelectBox>
      </ContentBox>

      <ContentBox>
        <Row>
          <Text Text H5 bold color={COLOR.N1000}>Description</Text>
          <Text Text B2 medium color={COLOR.N600} marginLeft={24}>{description?.length ?? 0}/300</Text>
        </Row>
        <DescriptionInput
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxlength="300"
        />
      </ContentBox>

      <ContentBox>
        <Text Text H5 bold color={COLOR.N1000}>Wallet</Text>
        <WalletAdressBox>
          <Row>
            <Text B1 medium color={COLOR.N700}>0x12r45... 6HJ9</Text>
            <StyledImage src={copyIcon} width={16} marginLeft={8} />
          </Row>
        </WalletAdressBox>
      </ContentBox>

      {
        !loginData.user?.uid
        && <ContentBox>
          <Text Text H5 bold color={COLOR.N1000}>E-mail</Text>
          <Row marginTop={16}>
            <BorderInput
              type="text"
              placeholder="your@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              style={{ fontSize: '15px', fontWeight: '400' }}
            />
            <SmallButton><Text B1 medium color={COLOR.N800}>Send</Text></SmallButton>
          </Row>

          <Text B1 medium color={COLOR.N700} marginTop={16}>Confirmation Code</Text>
          <Row marginTop={16}>
            <BorderInput
              type="text"
              placeholder="code"
              value={code}
              onChange={(event) => {
                setCode(event.target.value);
              }}
              style={{ fontSize: '15px', fontWeight: '400' }}
            />
            <SmallButton><Text B1 medium color={COLOR.N800}>Confirm</Text></SmallButton>
          </Row>
        </ContentBox>
      }

      <ContentBox>
        <Text Text H5 bold color={COLOR.N1000}>Password</Text>
        <BorderInput
          type='password'
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          marginTop={16}
          style={{ fontSize: '15px', fontWeight: '400' }}
        />

        <Text B1 medium color={COLOR.N700} marginTop={16}>Confirmation</Text>
        <BorderInput
          type='password'
          value={passwordConfirm}
          onChange={(event) => {
            setPasswordConfirm(event.target.value);
          }}
          marginTop={16}
          style={{ fontSize: '15px', fontWeight: '400' }}
        />
      </ContentBox>

      <DoneButton onClick={() => handleDone()}>
        <Text H5 bold color="#FFFFFF">Done</Text>
      </DoneButton>
    </ProfileContainer>
  );
}

export default ProfileSettings;

const ProfileContainer = styled.div`
  width: 100%;
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ProfileBox = styled.div`
  margin-top: 12px;
  width: 100%;
  padding: 12px 0px;
  background-color: #FFFFFF;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContentBox = styled.div`
  width: 100%;
  padding: 16px;
  background-color: #FFFFFF;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`

const ProfileImageSelectBox = styled.div`
  margin-top: 16px;
  width: 100%;
  height: 176px;
  border-radius: 6px;
  background-color: ${COLOR.N400};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const DescriptionInput = styled.textarea`
  margin-top: 16px;
  width: 100%;
  height: 210px;
  padding: 12px;
  background-color:${COLOR.N400};
  border-radius: 6px;
  font-size: 14px;
`

const WalletAdressBox = styled.div`
  margin-top: 16px;
  width: 100%;
  height: 48px;
  border-radius: 6px;
  background: ${COLOR.N400};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SmallButton = styled.div`
  margin-left: 8px;
  width: 150px; //width: 96px; 하면 제대로 적용 안됨
  height: 48px;
  border-radius: 6px;
  background-color: ${COLOR.N400};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const DoneButton = styled.div`
  margin: 8px;
  width: calc(100% - 16px);
  height: 40px;
  background-color: ${COLOR.BLUE1};
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledImage = styled(Image)`
  cursor: pointer;
`
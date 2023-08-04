//React
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';
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
import { Row } from 'components/Flex';

//Api
import { nftCheckByWallet, emailAuthSend, emailAuthCheck } from 'apis/SignUp';
import { getMyProfileData, editUserData } from 'apis/Profile';

//Assets
import walletIcon from 'assets/icons/wallet.svg';
import copyIcon from 'assets/icons/copy.svg';
import profileIcon from 'assets/icons/profile.svg';

import nftIcon from 'assets/icons/icon_nft.png';
import metaMaskIcon from 'assets/icons/icon_metamask.png';
import coinbaseIcon from 'assets/icons/icon_coinbase.png';
import walletConnectIcon from 'assets/icons/icon_walletconnect.png';
import defaultProfile from 'assets/icons/icon_default_profile.png';

function ProfileSettings() {

  const navigate = useNavigate();
  const { state: { loginData }, dispatch } = useContext(AuthContext);

  const [userData, setUserData] = useState();
  const [userName, setUserName] = useState();
  const [description, setDescription] = useState();

  const [isToggleOpened, setIsToggleOpened] = useState(false);
  const [walletAdress, setWalletAdress] = useState();
  const [nftData, setNftData] = useState();
  const [profile, setProfile] = useState();

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
      setDescription(response.data.description ?? undefined);
      setWalletAdress(response.data.wallet_address ?? undefined);
      const nft = {
        id: response.data.nft_id,
        thumbnail: response.data.nft_thumbnail,
        title: response.data.nft_name,
      }
      setProfile(response.data.nft_id ? nft : undefined);
    } catch (error) {
      alert(error);
    }
  };

  function handleWalletClick() {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobileDevice) {
      handleWalletConnect();
    } else {
      setIsToggleOpened(true);
    }
  }

  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount()
  function handleWalletConnect() {
    if (!isConnected) {
      open();
    }
  }
  useEffect(() => {
    if (isConnected) {
      setWalletAdress(address);
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
      if (accounts) setWalletAdress(accounts[0]);
    } catch (error) {
      if (error === 'Modal closed by user') {
        alert('To use this wallet, extension must be installed');
      }
      console.log(error);
    }
  }

  useEffect(() => {
    if (walletAdress) {
      getNFT();
    }
  }, [walletAdress]);

  const getNFT = async function () {
    try {
      const response = await nftCheckByWallet(walletAdress);
      setNftData(response.data);
    } catch (error) {
      alert(error);
    }
  };

  async function handleCopyWalletAdress() {
    try {
      await navigator.clipboard.writeText(walletAdress);
      alert("Wallet adress has been copied to the clipboard");
    } catch (err) {
      console.error(err);
    }
  }

  function maskWalletAddress(walletAddress) {
    const maskedAddress = walletAddress?.replace(/^(.{8}).+(.{4})$/, '$1...$2');
    return maskedAddress;
  }

  const handleEmailAuthSend = async function () {
    if (email.length) {
      try {
        await emailAuthSend(email);
        alert('A verification email has been sent');
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
      if (response.data === "Authentication is complete.") {
        setIsEmailAuthChecked(true);
      }
    } catch (error) {
      alert(error);
    }
  }

  const handleDone = async function () {
    if (email && !isEmailAuthChecked) {
      alert('Email is not verified');
      return;
    }
    if (password && !passwordConfirm) {
      alert('Password confirmation field is Empty');
      return;
    }
    if (!password && passwordConfirm) {
      alert('Password field is Empty');
      return;
    }
    if (password && passwordConfirm && password !== passwordConfirm) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await editUserData(loginData.token.access, (loginData.user.uid === email ? undefined : email), password, (loginData.user.nickname === userName ? undefined : userName), (loginData.user.wallet_address === walletAdress ? undefined : walletAdress), (loginData.user.nft_id === profile?.id ? undefined : profile?.id), (loginData.user.description === description ? undefined : description));
      dispatch({
        type: 'PROFILE_UPDATE',
        profileData: response.data
      });

      const newLoginData = loginData;
      newLoginData.user = response.data;

      const localStorageData = localStorage.getItem('loginData');
      if (localStorageData) {
        localStorage.setItem('loginData', JSON.stringify(newLoginData));
      } else {
        sessionStorage.setItem('loginData', JSON.stringify(newLoginData));
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
        <Image src={profile?.thumbnail ?? defaultProfile} width={80} borderRadius="4px" />
        <Text B1 medium color={COLOR.N700} marginTop={12}>{userData.nickname}</Text>
        {
          profile && <Row marginTop={8}>
            <Image src={nftIcon} width={16} />
            <Text B1 medium color={COLOR.N800} marginLeft={4}>{profile?.title}</Text>
          </Row>
        }
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
        {
          walletAdress
            ? nftData?.length
              ? <ProfileImageSelectBox>
                {
                  nftData.map((item) =>
                    <ProfileImage
                      key={`nft_${item.id}`}
                      src={item.thumbnail}
                      selected={item.id === profile?.id}
                      onClick={() => setProfile(item)}
                    />
                  )
                }
              </ProfileImageSelectBox>
              : <ProfileImageBlankBox>
                <Image src={profileIcon} width={24} />
                <Text B1 center color={COLOR.N700} marginTop={8}>You don’t have any NFTs in your wallet.</Text>
              </ProfileImageBlankBox>
            : <ProfileImageNoticeBox>
              <Image src={walletIcon} width={24} />
              <Text B1 center color={COLOR.N700} marginTop={8}>Please connect your NFT wallet{'\n'}and make it a profile image.</Text>
            </ProfileImageNoticeBox>
        }
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
        {
          walletAdress
            ? <WalletAdressBox>
              <Row>
                <Text B1 medium color={COLOR.N700}>{maskWalletAddress(walletAdress)}</Text>
                <PointerImage src={copyIcon} width={16} marginLeft={8} onClick={() => handleCopyWalletAdress()} />
              </Row>
            </WalletAdressBox>
            : isToggleOpened
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
                <Text H5 bold color="#FFFFFF">Connect</Text>
              </ConnectWalletButton>
        }
      </ContentBox>

      <ContentBox>
        <Text Text H5 bold color={COLOR.N1000}>E-mail</Text>
        <Row marginTop={16}>
          <BorderInput
            type="text"
            placeholder={loginData.user.uid}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            style={{ fontSize: '15px', fontWeight: '400' }}
          />
          <SmallButton onClick={() => handleEmailAuthSend()}><Text B1 medium color={COLOR.N800}>Send</Text></SmallButton>
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
          <SmallButton onClick={() => handleEmailAuthCheck()}><Text B1 medium color={COLOR.N800}>Confirm</Text></SmallButton>
        </Row>
      </ContentBox>

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

const ProfileImageNoticeBox = styled.div`
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

const ProfileImageSelectBox = styled.div`
  margin-top: 8px;
  width: 100%;
  height: 176px;
  padding: 8px;
  border-radius: 6px;
  background-color: ${COLOR.N400};
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  overflow-y: scroll;
`

const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 4px;
  border: ${(props) => props.selected ? `3px solid ${COLOR.BLUE1}` : `3px solid  transparent`};
  cursor: pointer;
`

const ProfileImageBlankBox = styled.div`
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

const DescriptionInput = styled.textarea`
  margin-top: 16px;
  width: 100%;
  height: 210px;
  padding: 12px;
  background-color:${COLOR.N400};
  border-radius: 6px;
  font-size: 14px;
`

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

const PointerImage = styled(Image)`
  cursor: pointer;
`

const StyledRow = styled(Row)`
  cursor: pointer;
`
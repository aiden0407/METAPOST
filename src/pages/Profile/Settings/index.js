//React
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { BorderInput } from 'components/TextInput';
import { Row } from 'components/Flex';

//Assets
import walletIcon from 'assets/icons/wallet.svg';
import copyIcon from 'assets/icons/copy.svg';

import nftIcon from 'assets/icons/icon_nft.png';
import iconExample1 from 'assets/icons/icon_example_1.png';

function ProfileSettings() {

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  return (
    <ProfileContainer>
      <Text H4 bold color={COLOR.N1000} marginTop={12} marginLeft={12}>User setting</Text>

      <ProfileBox>
        <Image src={iconExample1} width={80} borderRadius="4px" />
        <Text B1 medium color={COLOR.N700} marginTop={12}>MynameisJungu</Text>
        <Row marginTop={9}>
          <Image src={nftIcon} width={16} />
          <Text B1 medium color={COLOR.N800} marginLeft={4}>BAYC #5263</Text>
        </Row>
      </ProfileBox>

      <ContentBox>
        <Text H5 bold color={COLOR.N1000}>User name</Text>
        <BorderInput
          type="text"
          placeholder="MynameisJungu"
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
          <Text Text B2 medium color={COLOR.N600} marginLeft={24}>{description.length}/300</Text>
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

      <ContentBox>
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

      <ContentBox>
        <Text Text H5 bold color={COLOR.N1000}>Password</Text>
        <BorderInput
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          marginTop={16}
          style={{ fontSize: '15px', fontWeight: '400' }}
        />

        <Text B1 medium color={COLOR.N700} marginTop={16}>Confirm Password</Text>
        <BorderInput
          type={showPasswordConfirm ? 'text' : 'password'}
          value={passwordConfirm}
          onChange={(event) => {
            setPasswordConfirm(event.target.value);
          }}
          marginTop={16}
          style={{ fontSize: '15px', fontWeight: '400' }}
        />
      </ContentBox>

      <DoneButton>
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
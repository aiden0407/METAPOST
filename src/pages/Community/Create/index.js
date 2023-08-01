//React
import { useState, useContext, useRef } from 'react';
import { AuthContext } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { BorderInput } from 'components/TextInput';
import { Row, Column } from 'components/Flex';

//Api
import { uploadImage } from 'apis/Home';
import { createCommunity } from 'apis/Community';

//Assets
import addIcon from 'assets/icons/add.svg';

function CommunityCreate() {

  const navigate = useNavigate();
  const { state: { loginData } } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState();
  const [logo, setLogo] = useState();
  const [banner, setBanner] = useState();
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const handleLogoInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handlePostLogoImage(file);
    }
  };
  const handlePostLogoImage = async function (file) {
    try {
      const response = await uploadImage(loginData.token.access, 'community', file);
      setLogo(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const handleBannerInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handlePostBannerImage(file);
    }
  };
  const handlePostBannerImage = async function (file) {
    try {
      const response = await uploadImage(loginData.token.access, 'community', file);
      setBanner(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const handleCreate = async function () {
    if (!name.length) {
      alert('Name field is empty');
      return;
    }
    if (!logo) {
      alert('The logo image needs to be uploaded');
      return;
    }

    try {
      await createCommunity(loginData.token.access, name, description, logo, banner);
      alert('Community has been created');
      navigate('/profile');
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <CommunityCreateContainer>
      <TitleBox>
        <Text H4 bold>Create a community</Text>
        <Row marginTop={16}>
          <IndexIconFilled><Text B1 medium color="#FFFFFF">1</Text></IndexIconFilled>
          <Text B1 medium color={COLOR.N700} marginLeft={8}>Set up</Text>
        </Row>
        <Text B1 color={COLOR.N700} marginTop={16}>Being a Manager and Running a community.<br />We supports you.</Text>
      </TitleBox>

      <Column marginTop={16} gap={4}>
        <ContentBox>
          <Text H5 bold>Community name</Text>
          <Text B0 color={COLOR.N700} marginTop={8}>The name cannot be changed.</Text>
          <BorderInput
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            marginTop={16}
          />
        </ContentBox>

        <ContentBox>
          <Text H5 bold>Logo Image</Text>
          <Text B0 color={COLOR.N700} marginTop={8}>A image recommends a 1:1 ratio.</Text>
          <LogoRatioParent>
            <RatioChild onClick={() => logoInputRef.current.click()}>
              <input
                type="file"
                ref={logoInputRef}
                onChange={handleLogoInputChange}
                style={{ display: 'none'}}
              />
              {
                logo
                ?<Image src={logo} style={{width: '100%', height:'100%'}} />
                :<Image src={addIcon} width={24} />
              }
            </RatioChild>
          </LogoRatioParent>
        </ContentBox>

        <ContentBox>
          <Text H5 bold>Community banner</Text>
          <Text B0 color={COLOR.N700} marginTop={8}>Images recommends a 2:1 ratio.</Text>
          <BannerRatioParent>
            <RatioChild onClick={() => {
              if (banner) {
                setBanner();
                return;
              }
              bannerInputRef.current.click()
            }}>
              <input
                type="file"
                ref={bannerInputRef}
                onChange={handleBannerInputChange}
                style={{ display: 'none'}}
              />
              {
                banner
                ?<Image src={banner} style={{width: '100%', height:'100%'}} />
                :<Image src={addIcon} width={24} />
              }
            </RatioChild>
          </BannerRatioParent>
        </ContentBox>

        <ContentBox>
          <Text H5 bold>Description</Text>
          <Text B0 color={COLOR.N700} marginTop={8}>Please introduce your collection community.</Text>
          <DescriptionInput
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxlength="300"
          />
          <LengthText B2 color={COLOR.N600}>{description?.length ?? 0}/300</LengthText>
        </ContentBox>
      </Column>

      <CreateButtonWrapper>
        <CreateButton onClick={()=>handleCreate()}>
          <Text H5 bold color="#FFFFFF">Create</Text>
        </CreateButton>
      </CreateButtonWrapper>

    </CommunityCreateContainer>
  );
}

export default CommunityCreate;

const CommunityCreateContainer = styled.div`
  width: 100%;
  padding-bottom: 60px;
  display: flex;
  flex-direction: column;
`

const TitleBox = styled.div`
  width: 100%;
  padding: 16px;
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

const ContentBox = styled.div`
  position: relative;
  width: 100%;
  padding: 16px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
`

const LogoRatioParent = styled.div`
  margin-top: 16px;
  position: relative;
  width: 50%;
  height: 0;
  padding-bottom: 50%;
`

const BannerRatioParent = styled.div`
  margin-top: 16px;
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 50%;
`

const RatioChild = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 1px dashed ${COLOR.N600};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const DescriptionInput = styled.textarea`
  margin-top: 8px;
  width: 100%;
  height: 220px;
  padding: 12px;
  background-color:${COLOR.N400};
  border-radius: 6px;
  font-size: 14px;
`

const LengthText = styled(Text)`
  position: absolute;
  bottom: 28px;
  right: 32px;
`

const CreateButtonWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  padding: 0 8px;
`

const CreateButton = styled.div`
  width: 100%;
  height: 48px;
  background-color: ${COLOR.BLUE1};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
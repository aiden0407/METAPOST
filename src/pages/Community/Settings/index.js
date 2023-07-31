//React
import { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from 'context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row, Column } from 'components/Flex';

//Api
import { uploadImage } from 'apis/Home';
import { getCommunityInfo, getCommunityDetail, editCommunity, postCommunityVerification } from 'apis/Community';

//Assets
import addIcon from 'assets/icons/add.svg';
import verifiedIcon from 'assets/icons/verified.svg';
import defaultProfile from 'assets/icons/icon_default_profile.png';

function CommunitySettings() {

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const communityId = searchParams.get('community_id');

  const { state: { loginData } } = useContext(AuthContext);
  const [communityData, setCommunityData] = useState();
  const [isCommunityOfficial, setIsCommunityOfficial] = useState(undefined);
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState();
  const [banner, setBanner] = useState();
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  useEffect(() => {
    if (loginData) {
      initCommunityData();
    }
  }, [loginData]);

  const initCommunityData = async function () {
    try {
      const response = await getCommunityInfo(loginData.token.access, communityId, 'hot', 0);

      if(!response.data.owner){
        alert('You are not the owner of this community')
        window.history.back();
        return;
      }

      setCommunityData(response.data);
      setDescription(response.data.community.description);
      setLogo(response.data.community.logo_url);
      setBanner(response.data.community.banner_url);

      try {
        const response = await getCommunityDetail(loginData.token.access, communityId);
        setIsCommunityOfficial(response.data?.isOfficial);
      } catch (error) {
        alert(error);
      }

    } catch (error) {
      alert(error);
    }
  };



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

  const handleEdit = async function () {
    if (!description.length) {
      alert('Description field is empty');
      return;
    }

    try {
      await editCommunity(loginData.token.access, communityId, communityData.community.title, description, logo, banner);
      navigate(`/community?community_id=${communityId}`);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch (error) {
      alert(error);
    }
  };

  const handleVerificationSubmit = async function () {
    try {
      await postCommunityVerification(loginData.token.access, communityId);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const handleProfileImageError = (error) => {
    error.target.src = defaultProfile;
  }

  if (!communityData) {
    return null;
  }

  return (
    <CommunitySettingsContainer>
      <TitleBox>
        <Text H4 bold>Community Setting</Text>
        <Row marginTop={20}>
          <Image src={communityData.community.logo_url} width={32} height={32} borderRadius="4px" onError={handleProfileImageError} />
          <Text B1 medium color={COLOR.N800} marginLeft={8}>{communityData.community.title}</Text>
          {
            isCommunityOfficial && <Image src={verifiedIcon} width={16} marginLeft={4} />
          }
        </Row>
      </TitleBox>

      <Column marginTop={-4} gap={4}>
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
            <RatioChild onClick={() => bannerInputRef.current.click()}>
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
          <LengthText B2 color={COLOR.N600}>{description.length}/300</LengthText>
        </ContentBox>

        <ContentBox>
          <Row>
            <Text H5 bold>Official verification</Text>
            <Image src={verifiedIcon} width={16} marginLeft={4} />
          </Row>
          <Text B0 color={COLOR.N700} marginTop={8}>Request verification mark.</Text>
          <VerificationBox
            onClick={() => {
              if (isCommunityOfficial === undefined) {
                handleVerificationSubmit()
              }
            }}
            style={isCommunityOfficial === undefined ? { cursor: 'pointer' } : {}}
          >
            <Text H5 medium color={isCommunityOfficial === undefined ? COLOR.BLUE1 : COLOR.N800}>
              {
                isCommunityOfficial === undefined
                  ? 'Request'
                  : isCommunityOfficial
                    ? 'Verified'
                    : 'In progress...'
              }
            </Text>
            {
              isCommunityOfficial && <Image src={verifiedIcon} width={16} marginLeft={4} />
            }
          </VerificationBox>
        </ContentBox>
      </Column>

      <DoneButtonWrapper>
        <DoneButton onClick={() => handleEdit()}>
          <Text H5 bold color="#FFFFFF">Done</Text>
        </DoneButton>
      </DoneButtonWrapper>

    </CommunitySettingsContainer>
  );
}

export default CommunitySettings;

const CommunitySettingsContainer = styled.div`
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

const VerificationBox = styled.div`
  margin-top: 16px;
  width: 100%;
  height: 48px;
  background-color: ${COLOR.N400};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DoneButtonWrapper = styled.div`
  margin-top: 16px;
  width: 100%;
  padding: 0 8px;
`

const DoneButton = styled.div`
  width: 100%;
  height: 48px;
  background-color: ${COLOR.BLUE1};
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
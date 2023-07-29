//React
import { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row } from 'components/Flex';
import Preview from 'components/Preview';

//Api
import { getUserData } from 'apis/Profile';

//Assets
import settingIcon from 'assets/icons/setting.svg';
import arrowNextIcon from 'assets/icons/arrow_next.svg';
import verifiedIcon from 'assets/icons/verified.svg';
import nftIcon from 'assets/icons/icon_nft.png';
import defaultProfile from 'assets/icons/icon_default_profile.png';

function Profile() {

  const navigate = useNavigate();
  const { state: { loginData } } = useContext(AuthContext);
  const [userData, setUserData] = useState();
  const [isDescriptionOver2Lines, setIsDescriptionOver2Lines] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isCommunityExpanded, setIsCommunityExpanded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const lineHeight = parseInt(window.getComputedStyle(containerRef.current).lineHeight);
      const lineCount = containerHeight / lineHeight;
      setIsDescriptionOver2Lines(lineCount > 2);
    }
  }, [userData?.memo]);

  useEffect(() => {
    if(loginData){
      initUserProfile();
    }
  }, [loginData]);

  const initUserProfile = async function () {
    try {
      const response = await getUserData(loginData.token.access);
      setUserData(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const handleImageError = (error) => {
    error.target.src = defaultProfile;
  }

  if (!userData) {
    return null;
  }

  return (
    <ProfileContainer>
      <ProfileBox>
        <Image src={userData.nft_thumbnail ?? defaultProfile} width={80} borderRadius="4px" />
        <Text B1 medium color={COLOR.N700} marginTop={12}>{userData.nickname}</Text>
        <Row marginTop={9}>
          <Image src={nftIcon} width={16} />
          <Text B1 medium color={userData.nft_name ? COLOR.N800 : COLOR.N600} marginLeft={4}>{userData.nft_name ?? 'The NFT has not been registered yet'}</Text>
        </Row>
        <SettingImage src={settingIcon} width={20} onClick={() => {
          navigate(`/profile/settings`);
          window.scrollTo({ top: 0 });
        }} />
      </ProfileBox>

      <ProfileDescriptionContainer
        expanded={isDescriptionExpanded}
        ref={containerRef}
        style={!isDescriptionOver2Lines ? { display: 'flex', justifyContent: 'center' } : {}}
      >
        {userData.memo ?? 'Description does not exist'}
      </ProfileDescriptionContainer>
      <ExpandButton
        onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
        style={!isDescriptionOver2Lines ? { cursor: 'default', paddingBottom: '0px' } : {}}
      >
        {
          isDescriptionOver2Lines && <Row marginLeft={-10}>
            <Image src={arrowNextIcon} width={16} style={{ transform: isDescriptionExpanded ? "rotate(270deg)" : "rotate(90deg)" }} />
            <Text B3 color={COLOR.N600} marginLeft={2}>{isDescriptionExpanded ? 'Close' : 'View more'}</Text>
          </Row>
        }
      </ExpandButton>

      <Text B1 bold color={COLOR.N1000} marginTop={24} marginLeft={12}>My community</Text>
      {
        userData.communities.length
          ? <>
            <CommunityContainer expanded={isCommunityExpanded}>
              {
                userData.communities.map((item, index) => {
                  if(isCommunityExpanded){
                    return (
                      <Row key={`post_${item.id}`}>
                        <Image src={item.logo_url} width={24} height={24} borderRadius="4px" onError={handleImageError} />
                        <StyledText B2 color={COLOR.N800} marginLeft={8}>{item.title}</StyledText>
                        {
                          item.isOfficial && <Image src={verifiedIcon} width={16} marginLeft={4} />
                        }
                      </Row>
                    )
                  } else {
                    if (index < 5) {
                      return (
                        <Row key={`post_${item.id}`}>
                          <Image src={item.logo_url} width={24} height={24} borderRadius="4px" onError={handleImageError} />
                          <StyledText B2 color={COLOR.N800} marginLeft={8}>{item.title}</StyledText>
                          {
                            item.isOfficial && <Image src={verifiedIcon} width={16} marginLeft={4} />
                          }
                        </Row>
                      )
                    }
                  }
                })
              }
            </CommunityContainer>
            <ExpandButton
              onClick={() => {
                if (userData.communities.length > 5) {
                  setIsCommunityExpanded(!isCommunityExpanded);
                }
              }}
              style={userData.communities.length < 6 ? { cursor: 'default', paddingBottom: '4px' } : {}}
            >
              {
                userData.communities.length > 5 && <Row marginLeft={-10}>
                  <Image src={arrowNextIcon} width={16} style={{ transform: isCommunityExpanded ? "rotate(270deg)" : "rotate(90deg)" }} />
                  <Text B3 color={COLOR.N600} marginLeft={2}>{isCommunityExpanded ? 'Close' : 'View more'}</Text>
                </Row>
              }
            </ExpandButton>
          </>
          : <NoContentsWrapper>
            <Text H5 color={COLOR.N700} marginTop={32}>The registered community does not exist</Text>
          </NoContentsWrapper>
      }


      <Text B1 bold color={COLOR.N1000} marginTop={24} marginLeft={12}>Post history</Text>
      {
        userData.posts.length
          ? <ContentsWrapper>
            {
              userData.posts.map((item) =>
                <Preview
                  key={`post_${item.id}`}
                  postId={item.id}
                  profileImage={item.nft_thumbnail}
                  userId={item.user_nickname}
                  nftName={item.nft_title}
                  title={item.title}
                  image={item?.image}
                  long={item.liked_count}
                  short={item.disliked_count}
                  comment={item.comment_count}
                  communityName={item.community_name}
                  createdAt={item.created_at}
                />)
            }
          </ContentsWrapper>
          : <NoContentsWrapper>
            <Text H5 color={COLOR.N700} marginTop={32}>Post history does not exist</Text>
          </NoContentsWrapper>
      }

    </ProfileContainer>
  );
}

export default Profile;

const ProfileContainer = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
`

const ProfileBox = styled.div`
  position: relative;
  width: 100%;
  padding: 12px 0px;
  background-color: #FFFFFF;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SettingImage = styled(Image)`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
`

const ProfileDescriptionContainer = styled.div`
  margin-top: 4px;
  width: 100%;
  padding: 8px 12px 0px;
  background-color: #FFFFFF;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  font-size: 13px;
  line-height: 150%;
  color: ${COLOR.N700};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${props => (props.expanded ? 'unset' : '2')};
  overflow: hidden;
  text-overflow: ellipsis;
  transition: max-height 0.5s ease-in-out;
  max-height: ${props => (props.expanded ? '1000px' : '60px')};
`;

const CommunityContainer = styled.div`
  margin-top: 8px;
  width: 100%;
  padding: 12px 12px 0 12px;
  background-color: #FFFFFF;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  max-height: ${props => (props.expanded ? '1000px' : '172px')};
`;

const ExpandButton = styled.div`
  width: 100%;
  padding: 8px 0;
  background-color: #FFFFFF;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  padding: 8px 0px 0px 0px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const NoContentsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const StyledText = styled(Text)`
  cursor: pointer;
`
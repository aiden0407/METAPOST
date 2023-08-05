//React
import { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from 'context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row, FlexBox } from 'components/Flex';
import Preview from 'components/Preview';

//Api
import { getCommunityInfo, postCommunityJoin, postCommunityLeave } from 'apis/Community';

//Assets
import writeIcon from 'assets/icons/write.svg';
import arrowNextIcon from 'assets/icons/arrow_next.svg';
import verifiedIcon from 'assets/icons/verified.svg';
import settingIcon from 'assets/icons/setting.svg';

import fireActiveIcon from 'assets/icons/fire_active.svg';
import fireInactiveIcon from 'assets/icons/fire_inactive.svg';
import noticeActiveIcon from 'assets/icons/notice_active.svg';
import noticeInactiveIcon from 'assets/icons/notice_inactive.svg';
import newActiveIcon from 'assets/icons/new_active.svg';
import newInactiveIcon from 'assets/icons/new_inactive.svg';
import defaultCommunity from 'assets/icons/icon_default_community.png';
import defaultImage from 'assets/icons/icon_default_image.png';

function Community() {

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const communityId = searchParams.get('community_id');

  const { state: { loginData } } = useContext(AuthContext);
  const [communityData, setCommunityData] = useState();
  const [isCommunityOfficial, setIsCommunityOfficial] = useState(false);
  const [isDescriptionOver2Lines, setIsDescriptionOver2Lines] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      const containerHeight = containerRef.current.clientHeight;
      const lineHeight = parseInt(window.getComputedStyle(containerRef.current).lineHeight);
      const lineCount = containerHeight / lineHeight;
      setIsDescriptionOver2Lines(lineCount > 2);
    }
  }, [communityData?.description]);

  const [postData, setPostData] = useState([]);
  const [maxLength, setMaxLength] = useState();
  const [activeButton, setActiveButton] = useState('hot');
  const [pageIndex, setPageIndex] = useState(0);

  const [showButton, setShowButton] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      const windowHeight = window.innerHeight;
      const scrollYMax = documentHeight - windowHeight;
      const scrollY = window.scrollY;
      if (scrollYMax - scrollY < 270) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (loginData) {
      initCommunityData();
    }
  }, [loginData]);

  const initCommunityData = async function () {
    try {
      const response = await getCommunityInfo(loginData.token.access, communityId, activeButton, 0);
      setCommunityData(response.data);
      setIsCommunityOfficial(response.data?.isOfficial);
      setPostData(response.data.posts);
      setMaxLength(response.data.posts?.length);
    } catch (error) {
      alert(error);
    }
  };

  const handleActiveButtonChange = async function (type) {
    setActiveButton(type);
    setPageIndex(0);
    try {
      const response = await getCommunityInfo(loginData.token.access, communityId, type, 0);
      setPostData(response.data.posts);
      setMaxLength(response.data.posts?.length);
    } catch (error) {
      alert(error);
    }
  };

  function ExportFirstImage(htmlText) {
    const regex = /<img.*?src=['"](.*?)['"]/;
    const match = htmlText?.match(regex);
    if (match) {
      return match[1];
    }
  }

  const handleChangePaginationIndex = async function (index) {
    window.scrollTo({ top: 0 });
    setPageIndex(index);
    try {
      const response = await getCommunityInfo(loginData.token.access, communityId, activeButton, index * 20);
      setPostData(response.data.posts);
    } catch (error) {
      alert(error);
    }
  };

  function Pagination() {
    const paginationArray = [];
    const totalPageIndex = Math.floor((maxLength - 1) / 20);

    for (let ii = 0; ii <= totalPageIndex; ii++) {
      const pageRowIndex = Math.floor(ii / 5);
      if (!paginationArray[pageRowIndex]) {
        paginationArray[pageRowIndex] = [];
      }
      paginationArray[pageRowIndex].push(ii);
    }

    return (
      <Row marginTop={24} gap={8} style={{ width: "100%", justifyContent: "center" }}>
        <PageButton onClick={() => pageIndex > 0 && handleChangePaginationIndex(pageIndex - 1)}>
          <Image src={arrowNextIcon} width={24} style={{ transform: "scaleX(-1)", opacity: pageIndex === 0 && 0.4 }} />
        </PageButton>

        {
          paginationArray?.[Math.floor(pageIndex / 5)]?.map((item) =>
            <PageButton key={item} onClick={() => handleChangePaginationIndex(item)}>
              <Text B1 medium color={pageIndex === item ? COLOR.BLUE1 : COLOR.N600}>{item + 1}</Text>
            </PageButton>
          )
        }

        <PageButton onClick={() => pageIndex < totalPageIndex && handleChangePaginationIndex(pageIndex + 1)}>
          <Image src={arrowNextIcon} width={24} style={{ opacity: pageIndex === totalPageIndex && 0.4 }} />
        </PageButton>
      </Row>
    )
  }

  function handleCommunitySettings() {
    navigate(`/community/settings?community_id=${communityId}`);
    window.scrollTo({ top: 0 });
  }

  const handleJoin = async function () {
    try {
      await postCommunityJoin(loginData.token.access, communityId);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const handleLeave = async function () {
    try {
      await postCommunityLeave(loginData.token.access, communityId);
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const handleProfileImageError = (error) => {
    error.target.src = defaultCommunity;
  }

  const handleBannerImageError = (error) => {
    error.target.src = defaultImage;
  }

  if (!communityData) {
    return null;
  }

  return (
    <CommunityContainer>
      <WriteButton show={showButton} onClick={() => {
        navigate(`/write`);
        window.scrollTo({ top: 0 });
      }}>
        <Image src={writeIcon} width={24} />
      </WriteButton>

      <BodyWrapper>

        <Row>
          <Image src={communityData.community.logo_url} width={32} height={32} borderRadius="4px" onError={handleProfileImageError} />
          <CommunityName H5 bold color={COLOR.N1000} marginLeft={8}>{communityData.community.title}</CommunityName>
          {
            isCommunityOfficial && <Image src={verifiedIcon} width={16} marginLeft={4} />
          }
          <FlexBox />
          {
            communityData.owner && <SettingImage src={settingIcon} width={20} onClick={() => handleCommunitySettings()} />
          }
        </Row>

        {
          (communityData.owner || communityData.joined)
          ? <JoinButton onClick={() => handleLeave()}>
            <Text B1 medium color="#FFFFFF">Leave</Text>
          </JoinButton>
          :<JoinButton onClick={() => handleJoin()}>
          <Text B1 medium color="#FFFFFF">Join</Text>
        </JoinButton>
        }

        <RatioParent>
          <RatioChild>
            <Image src={communityData.community.banner_url ?? defaultImage} borderRadius="4px" style={{ width: '100%', height: '100%', zIndex: 1 }} onError={handleBannerImageError} />
          </RatioChild>
        </RatioParent>

        <DescriptionContainer
          expanded={isDescriptionExpanded}
          ref={containerRef}
          style={!communityData.community.description ? { display: 'flex', justifyContent: 'center' } : {}}
        >
          {communityData.community.description ?? 'Description does not exist'}
        </DescriptionContainer>
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

        <Row gap={4} marginTop={16}>
        <MenuButton active={activeButton === 'hot'} onClick={() => handleActiveButtonChange('hot')}>
            <Row>
              <Image src={activeButton === 'hot' ? fireActiveIcon : fireInactiveIcon} width={14} />
              <Text P2 color={activeButton === 'hot' ? COLOR.N200 : COLOR.N600} marginLeft={4}>HOT</Text>
            </Row>
          </MenuButton>
          <MenuButton active={activeButton === 'notice'} onClick={() => handleActiveButtonChange('notice')}>
            <Row>
              <Image src={activeButton === 'notice' ? noticeActiveIcon : noticeInactiveIcon} width={14} />
              <Text P2 color={activeButton === 'notice' ? COLOR.N200 : COLOR.N600} marginLeft={4}>NOTICE</Text>
            </Row>
          </MenuButton>
          <MenuButton active={activeButton === 'new'} onClick={() => handleActiveButtonChange('new')}>
            <Row>
              <Image src={activeButton === 'new' ? newActiveIcon : newInactiveIcon} width={14} />
              <Text P2 color={activeButton === 'new' ? COLOR.N200 : COLOR.N600} marginLeft={4}>NEW</Text>
            </Row>
          </MenuButton>
        </Row>

        {
          postData && <ContentsWrapper>
            {
              postData.map((item, index) => {
                if (index < 20) {
                  return (
                    <Preview
                      key={`post_${item.id}`}
                      postId={item.id}
                      profileImage={item.nft_thumbnail}
                      userId={item.nickname}
                      nftName={item.nft_title}
                      title={item.title}
                      image={ExportFirstImage(item?.description)}
                      long={item.liked_count}
                      short={item.disliked_count}
                      comment={item.comment_count}
                      communityName={item.community_title}
                      createdAt={item.created_at}
                    />
                  )
                }
              })
            }
          </ContentsWrapper>
        }

        <Pagination />

      </BodyWrapper>
    </CommunityContainer>
  );
}

export default Community;

const CommunityContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const WriteButton = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 50px;
  height: 50px;
  background-color: ${COLOR.RED1};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  opacity: ${props => (props.show ? 1 : 0)};
  transition: opacity 0.3s ease;
`

const CommunityName = styled(Text)`
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
`

const JoinButton = styled.div`
  margin-top: 8px;
  width: 100%;
  height: 32px;
  background-color: ${COLOR.BLUE1};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const RatioParent = styled.div`
  margin-top: 8px;
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
`

const DescriptionContainer = styled.div`
  margin-top: 8px;
  width: 100%;
  padding: 8px 12px 0px;
  background-color: #FFFFFF;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
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

const ExpandButton = styled.div`
  width: 100%;
  padding: 8px 0;
  background-color: #FFFFFF;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const BodyWrapper = styled.div`
  width: 100%;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
`

const MenuButton = styled.div`
  padding: 8px 10px;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? COLOR.N950 : 'transparent')};
  cursor: pointer;
`

const ContentsWrapper = styled.div`
  width: 100%;
  padding: 8px 0px 0px 0px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const PageButton = styled.div`
  width: 32px;
  height: 32px;
  background-color: #FFFFFF;
  border: 1px solid ${COLOR.N400};
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const SettingImage = styled(Image)`
  cursor: pointer;
`
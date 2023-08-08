//React
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row } from 'components/Flex';
import Preview from 'components/Preview';

//Api
import { getMainPost, getMainPostLength } from 'apis/Home';

//Assets
import fireActiveIcon from 'assets/icons/fire_active.svg';
import fireInactiveIcon from 'assets/icons/fire_inactive.svg';
import followActiveIcon from 'assets/icons/follow_active.svg';
import followInactiveIcon from 'assets/icons/follow_inactive.svg';
import newActiveIcon from 'assets/icons/new_active.svg';
import newInactiveIcon from 'assets/icons/new_inactive.svg';
import arrowNext from 'assets/icons/arrow_next.svg';
import writeIcon from 'assets/icons/write.svg';

import mainBanner1 from 'assets/images/main_banner1.png';

function Main() {

  const navigate = useNavigate();
  const [mainData, setMainData] = useState();
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
    initMainPost();
  }, []);

  const initMainPost = async function () {
    try {
      const response = await getMainPost(activeButton, 0);
      setMainData(response.data);

      try {
        const response = await getMainPostLength(activeButton);
        setMaxLength(response.data.post_count);
      } catch (error) {
        alert(error);
      }

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

  const handleActiveButtonChange = async function (type) {
    setActiveButton(type);
    setPageIndex(0);
    try {
      const response = await getMainPost(type, 0);
      setMainData(response.data);

      try {
        const response = await getMainPostLength(type);
        setMaxLength(response.data.post_count);
      } catch (error) {
        alert(error);
      }

    } catch (error) {
      alert(error);
    }
  };

  const handleChangePaginationIndex = async function (index) {
    try {
      const response = await getMainPost(activeButton, index);
      setMainData(response.data);
      setPageIndex(index);
      window.scrollTo({ top: 0 });
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
          <Image src={arrowNext} width={24} style={{ transform: "scaleX(-1)", opacity: pageIndex === 0 && 0.4 }} />
        </PageButton>

        {
          paginationArray?.[Math.floor(pageIndex / 5)]?.map((item) =>
            <PageButton key={item} onClick={() => handleChangePaginationIndex(item)}>
              <Text B1 medium color={pageIndex === item ? COLOR.BLUE1 : COLOR.N600}>{item + 1}</Text>
            </PageButton>
          )
        }

        <PageButton onClick={() => pageIndex < totalPageIndex && handleChangePaginationIndex(pageIndex + 1)}>
          <Image src={arrowNext} width={24} style={{ opacity: (pageIndex === totalPageIndex || totalPageIndex <= 0 ) && 0.4 }} />
        </PageButton>
      </Row>
    )
  }

  return (
    <HomeContainer>
      <WriteButton show={showButton} onClick={() => {
        navigate(`/write`);
        window.scrollTo({ top: 0 });
      }}>
        <Image src={writeIcon} width={24} />
      </WriteButton>

      <RatioParent>
        <RatioChild>
          <Image src={mainBanner1} style={{ width: '100%', height: '100%', zIndex: 1 }} />
        </RatioChild>
      </RatioParent>

      <BodyWrapper>
        <Row gap={4}>
          <MenuButton active={activeButton === 'hot'} onClick={() => handleActiveButtonChange('hot')}>
            <Row>
              <Image src={activeButton === 'hot' ? fireActiveIcon : fireInactiveIcon} width={14} />
              <Text P2 color={activeButton === 'hot' ? COLOR.N200 : COLOR.N600} marginLeft={4}>HOT</Text>
            </Row>
          </MenuButton>
          <MenuButton active={activeButton === 'follow'} onClick={() => handleActiveButtonChange('follow')}>
            <Row>
              <Image src={activeButton === 'follow' ? followActiveIcon : followInactiveIcon} width={14} />
              <Text P2 color={activeButton === 'follow' ? COLOR.N200 : COLOR.N600} marginLeft={4}>FOLLOW</Text>
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
          mainData && <ContentsWrapper>
            {
              mainData.map((item, index) => {
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
    </HomeContainer>
  );
}

export default Main;

const HomeContainer = styled.div`
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

const RatioParent = styled.div`
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

const BodyWrapper = styled.div`
  width: 100%;
  padding: 16px 8px 0px 8px;
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
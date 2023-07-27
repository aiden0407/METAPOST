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

//Assets
import fireActiveIcon from 'assets/icons/fire_active.svg';
import fireInactiveIcon from 'assets/icons/fire_inactive.svg';
import followInactiveIcon from 'assets/icons/follow_inactive.svg';
import newInactiveIcon from 'assets/icons/new_inactive.svg';
import arrowNext from 'assets/icons/arrow_next.svg';
import writeIcon from 'assets/icons/write.svg';

import mainBanner1 from 'assets/images/main_banner1.png';
import defaultProfile from 'assets/icons/icon_default_profile.png';
import iconExample1 from 'assets/icons/icon_example_1.png';
import iconExample2 from 'assets/icons/icon_example_2.png';
import iconExample3 from 'assets/icons/icon_example_3.png';

function Home() {

  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('HOT');
  const [pageIndex, setPageIndex] = useState(1);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // 페이지 스크롤 위치를 확인하여 버튼의 표시 여부를 결정
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (windowHeight - scrollY < 270) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }
    };

    // 스크롤 이벤트를 리스닝
    window.addEventListener('scroll', handleScroll);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          <MenuButton active={activeButton === 'HOT'} onClick={() => setActiveButton('HOT')}>
            <Row>
              <Image src={activeButton === 'HOT' ? fireActiveIcon : fireInactiveIcon} width={14} />
              <Text B1 bold color={activeButton === 'HOT' ? COLOR.N200 : COLOR.N600} marginLeft={4}>HOT</Text>
            </Row>
          </MenuButton>
          <MenuButton active={activeButton === 'FOLLOW'} onClick={() => setActiveButton('FOLLOW')}>
            <Row>
              <Image src={followInactiveIcon} width={14} />
              <Text B1 bold color={activeButton === 'FOLLOW' ? COLOR.N200 : COLOR.N600} marginLeft={4}>FOLLOW</Text>
            </Row>
          </MenuButton>
          <MenuButton active={activeButton === 'NEW'} onClick={() => setActiveButton('NEW')}>
            <Row>
              <Image src={newInactiveIcon} width={14} />
              <Text B1 bold color={activeButton === 'NEW' ? COLOR.N200 : COLOR.N600} marginLeft={4}>NEW</Text>
            </Row>
          </MenuButton>
        </Row>

        <ContentsWrapper>
          <Preview
            postId={"1"}
            profileImage={iconExample2}
            userId={"ReallyGood"}
            nftName={"Bored Ape Yacht Club #3261"}
            title={"글 제목 입니다."}
            long={32}
            short={8}
            comment={6}
            communityName={"Community name"}
            createdAt={"2023-07-22T16:48:00Z"}
          />
          <Preview
            postId={"2"}
            profileImage={iconExample1}
            userId={"Rhoncus"}
            nftName={"NFT name"}
            title={"글 제목 입니다."}
            image={iconExample3}
            long={32}
            short={8}
            comment={6}
            communityName={"Community name"}
            createdAt={"2023-07-19T16:48:00Z"}
          />
          <Preview
            postId={"3"}
            profileImage={iconExample2}
            userId={"ReallyGood"}
            nftName={"Bored Ape Yacht Club #3261"}
            title={"글 제목 입니다."}
            long={32}
            short={8}
            comment={6}
            communityName={"Community name"}
            createdAt={"2023-07-16T16:48:00Z"}
          />
          <Preview
            postId={"4"}
            profileImage={defaultProfile}
            userId={"ReallyGood"}
            nftName={"Bored Ape Yacht Club #3261"}
            title={"글 제목 입니다."}
            long={32}
            short={8}
            comment={6}
            communityName={"Community name"}
            createdAt={"2023-07-16T16:48:00Z"}
          />
          <Preview
            postId={"5"}
            profileImage={iconExample2}
            userId={"ReallyGood"}
            nftName={"Bored Ape Yacht Club #3261"}
            title={"글 제목 입니다."}
            long={32}
            short={8}
            comment={6}
            communityName={"Community name"}
            createdAt={"2023-07-16T16:48:00Z"}
          />
        </ContentsWrapper>

        <Row marginTop={24} gap={8} style={{ width: "100%", justifyContent: "center" }}>
          <PageButton onClick={() => pageIndex>1 && setPageIndex(pageIndex - 1)}>
            <Image src={arrowNext} width={24} style={{transform: "scaleX(-1)", opacity: pageIndex===1 && 0.4}} />
          </PageButton>

          <PageButton onClick={() => setPageIndex(1)}>
            <Text B1 medium color={pageIndex === 1 ? COLOR.BLUE1 : COLOR.N600}>1</Text>
          </PageButton>
          <PageButton onClick={() => setPageIndex(2)}>
            <Text B1 medium color={pageIndex === 2 ? COLOR.BLUE1 : COLOR.N600}>2</Text>
          </PageButton>
          <PageButton onClick={() => setPageIndex(3)}>
            <Text B1 medium color={pageIndex === 3 ? COLOR.BLUE1 : COLOR.N600}>3</Text>
          </PageButton>
          <PageButton onClick={() => setPageIndex(4)}>
            <Text B1 medium color={pageIndex === 4 ? COLOR.BLUE1 : COLOR.N600}>4</Text>
          </PageButton>
          <PageButton onClick={() => setPageIndex(5)}>
            <Text B1 medium color={pageIndex === 5 ? COLOR.BLUE1 : COLOR.N600}>5</Text>
          </PageButton>

          <PageButton onClick={() => pageIndex<5 && setPageIndex(pageIndex + 1)}>
            <Image src={arrowNext} width={24} style={{opacity: pageIndex===5 && 0.4}} />
          </PageButton>
        </Row>
      </BodyWrapper>
    </HomeContainer>
  );
}

export default Home;

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
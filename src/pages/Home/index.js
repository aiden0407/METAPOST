//React
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row } from 'components/Flex';
import Post from 'components/Post';

//Assets
import mainBanner1 from 'assets/images/main_banner1.png';
import fireActive from 'assets/icons/fire_active.svg';
import followInactive from 'assets/icons/follow_inactive.svg';
import newInactive from 'assets/icons/new_inactive.svg';
import arrowNext from 'assets/icons/arrow_next.svg';

import defaultProfile from 'assets/icons/default_profile.png';
import iconExample1 from 'assets/icons/icon_example_1.png';
import iconExample2 from 'assets/icons/icon_example_2.png';
import iconExample3 from 'assets/icons/icon_example_3.png';

function Home() {

  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('HOT');
  const [pageIndex, setPageIndex] = useState(1);

  return (
    <HomeContainer>
      <RatioParent>
        <RatioChild>
          <Image src={mainBanner1} style={{ width: '100%', height: '100%', zIndex: 1 }} />
        </RatioChild>
      </RatioParent>

      <BodyWrapper>
        <Row gap={4}>
          <MenuButton active={activeButton === 'HOT'} onClick={() => setActiveButton('HOT')}>
            <Row>
              <Image src={fireActive} width={14} />
              <Text B1 bold color={activeButton === 'HOT' ? COLOR.N200 : COLOR.N600} marginLeft={4}>HOT</Text>
            </Row>
          </MenuButton>
          <MenuButton active={activeButton === 'FOLLOW'} onClick={() => setActiveButton('FOLLOW')}>
            <Row>
              <Image src={followInactive} width={14} />
              <Text B1 bold color={activeButton === 'FOLLOW' ? COLOR.N200 : COLOR.N600} marginLeft={4}>FOLLOW</Text>
            </Row>
          </MenuButton>
          <MenuButton active={activeButton === 'NEW'} onClick={() => setActiveButton('NEW')}>
            <Row>
              <Image src={newInactive} width={14} />
              <Text B1 bold color={activeButton === 'NEW' ? COLOR.N200 : COLOR.N600} marginLeft={4}>NEW</Text>
            </Row>
          </MenuButton>
        </Row>

        <ContentsWrapper>
          <Post
            profileImage={iconExample2}
            userId={"ReallyGood"}
            nftName={"Bored Ape Yacht Club #3261"}
            title={"글 제목 입니다."}
            like={32}
            dislike={8}
            comments={6}
            communityName={"Community name"}
            createdAt={"2023-07-22T16:48:00Z"}
          />
          <Post
            profileImage={iconExample1}
            userId={"Rhoncus"}
            nftName={"NFT name"}
            title={"글 제목 입니다."}
            image={iconExample3}
            like={32}
            dislike={8}
            comments={6}
            communityName={"Community name"}
            createdAt={"2023-07-19T16:48:00Z"}
          />
          <Post
            profileImage={iconExample2}
            userId={"ReallyGood"}
            nftName={"Bored Ape Yacht Club #3261"}
            title={"글 제목 입니다."}
            like={32}
            dislike={8}
            comments={6}
            communityName={"Community name"}
            createdAt={"2023-07-16T16:48:00Z"}
          />
          <Post
            profileImage={defaultProfile}
            userId={"ReallyGood"}
            nftName={"Bored Ape Yacht Club #3261"}
            title={"글 제목 입니다."}
            like={32}
            dislike={8}
            comments={6}
            communityName={"Community name"}
            createdAt={"2023-07-16T16:48:00Z"}
          />
          <Post
            profileImage={iconExample2}
            userId={"ReallyGood"}
            nftName={"Bored Ape Yacht Club #3261"}
            title={"글 제목 입니다."}
            like={32}
            dislike={8}
            comments={6}
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
//React
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row, FlexBox } from 'components/Flex';

//Api
import { getCommunityRanking } from 'apis/Community';

//Assets
import arrowNextIcon from 'assets/icons/arrow_next.svg';
import defaultCommunity from 'assets/icons/icon_default_community.png';

function CommunityRanking() {

  const navigate = useNavigate();
  const [rankingData, setRankingData] = useState([]);
  const [maxLength, setMaxLength] = useState();
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    initRankingData();
  }, []);

  const initRankingData = async function () {
    try {
      const response = await getCommunityRanking(0);
      setRankingData(response.data);
      setMaxLength(response.data.length);
    } catch (error) {
      alert(error);
    }
  };

  const handleChangePaginationIndex = async function (index) {
    setPageIndex(index);
    try {
      const response = await getCommunityRanking(index * 15);
      setRankingData(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const handleImageError = (error) => {
    error.target.src = defaultCommunity;
  }

  function Pagination() {
    const paginationArray = [];
    const totalPageIndex = Math.floor((maxLength - 1) / 15);

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

  return (
    <CommunityRankingContainer>

      <Row>
        <Text P1 color={COLOR.N1000}>COMMUNITY RANKING</Text>
        <FlexBox />
        <CreateButton onClick={() => navigate('/community/create')}>
          <Text B1 medium color="#FFFFFF">Create</Text>
        </CreateButton>
      </Row>

      <RankingHeader>
        <RankingNumberWrapper>
          <Text B3 color="#FFFFFF">#</Text>
        </RankingNumberWrapper>
        <Text B3 color="#FFFFFF">Collection name</Text>
        <FlexBox />
        <MemberNumberWrapper>
          <Text B3 color="#FFFFFF">Members</Text>
        </MemberNumberWrapper>
      </RankingHeader>
      {
        rankingData.map((item, index) => {
          if ((rankingData.length < 15 && index === rankingData.length - 1) || (rankingData.length >= 15 && index === 14)) {
            return (
              <RankingBottom
                key={`community_${item.id}`}
                onClick={() => {
                  navigate(`/community?community_id=${item.id}`);
                  window.scrollTo({ top: 0 });
                }}
              >
                <RankingNumberWrapper>
                  <Text B3 color={COLOR.N600}>{index+1}</Text>
                </RankingNumberWrapper>
                <Image src={item.logo_url} width={24} height={24} borderRadius="4px" onError={handleImageError} />
                <Text B2 medium color={COLOR.N800} marginLeft={10}>{item.title}</Text>
                <FlexBox />
                <MemberNumberWrapper>
                  <Text B2 color={COLOR.N700}>{(item.participant_count+1).toLocaleString()}</Text>
                </MemberNumberWrapper>
              </RankingBottom>
            )
          }
          if (index < 14) {
            return (
              <RankingBody
                key={`community_${item.id}`}
                onClick={() => {
                  navigate(`/community?community_id=${item.id}`);
                  window.scrollTo({ top: 0 });
                }}
              >
                <RankingNumberWrapper>
                  <Text B3 color={COLOR.N600}>{index+1}</Text>
                </RankingNumberWrapper>
                <Image src={item.logo_url} width={24} height={24} borderRadius="4px" onError={handleImageError} />
                <Text B2 medium color={COLOR.N800} marginLeft={10}>{item.title}</Text>
                <FlexBox />
                <MemberNumberWrapper>
                  <Text B2 color={COLOR.N700}>{item.participant_count.toLocaleString()}</Text>
                </MemberNumberWrapper>
              </RankingBody>
            )
          }
        })
      }

      <Pagination />

    </CommunityRankingContainer>
  );
}

export default CommunityRanking;

const CommunityRankingContainer = styled.div`
  width: 100%;
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
`

const CreateButton = styled.div`
  width: 68px;
  height: 34px;
  background-color: ${COLOR.RED1};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const RankingHeader = styled.div`
  margin-top: 16px;
  width: 100%;
  height: 32px;
  background-color: ${COLOR.BLUE1};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  display: flex;
  align-items: center;
`

const RankingBody = styled.div`
  width: 100%;
  height: 40px;
  background-color: #FFFFFF;
  border-bottom: 1px solid ${COLOR.N400};
  display: flex;
  align-items: center;
  cursor: pointer;
`

const RankingBottom = styled.div`
  width: 100%;
  height: 40px;
  background-color: #FFFFFF;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const RankingNumberWrapper = styled.div`
  width: 34px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const MemberNumberWrapper = styled.div`
  width: 72px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
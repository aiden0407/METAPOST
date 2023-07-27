//React
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row } from 'components/Flex';
import Preview from 'components/Preview';

//Assets
import settingIcon from 'assets/icons/setting.svg';
import arrowNextIcon from 'assets/icons/arrow_next.svg';

import nftIcon from 'assets/icons/icon_nft.png';
import iconExample1 from 'assets/icons/icon_example_1.png';
import iconExample3 from 'assets/icons/icon_example_3.png';

function Profile() {

  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const profileDescription = 'Massa praesent sed tincidunt sed nunc ut mi. Sagittis imperdiet tempor sit eget vitae id nullam libero pharetra. Neque ut mattis vitae id suspendisse tempus ipsum bibendum ac. Pulvinar id magna eget ac posuere ultrices facilisis condimentum.';

  return (
    <ProfileContainer>
      <ProfileBox>
        <Image src={iconExample1} width={80} borderRadius="4px" />
        <Text B1 medium color={COLOR.N700} marginTop={12}>MynameisJungu</Text>
        <Row marginTop={9}>
          <Image src={nftIcon} width={16} />
          <Text B1 medium color={COLOR.N800} marginLeft={4}>BAYC #5263</Text>
        </Row>
        <SettingImage src={settingIcon} width={20} onClick={() => {
          navigate(`/profile/settings`);
          window.scrollTo({ top: 0 });
        }} />
      </ProfileBox>

      <ProfileDescriptionContainer expanded={expanded}>
        {profileDescription}
      </ProfileDescriptionContainer>
      <ExpandButton onClick={() => setExpanded(!expanded)}>
        <Row marginLeft={-10}>
          <Image src={arrowNextIcon} width={16} style={{ transform: expanded ? "rotate(270deg)" : "rotate(90deg)" }} />
          <Text B3 color={COLOR.N600} marginLeft={2}>{expanded ? 'Close' : 'View more'}</Text>
        </Row>
      </ExpandButton>

      <Text B1 bold color={COLOR.N1000} marginTop={24} marginLeft={12}>Post history</Text>
      <ContentsWrapper>
        <Preview
          postId={"1"}
          profileImage={iconExample1}
          userId={"MynameisJungu"}
          nftName={"BAYC #5263"}
          title={"글 제목 입니다."}
          long={32}
          short={8}
          comment={6}
          communityName={"CryptoPhunks"}
          createdAt={"2023-07-22T16:48:00Z"}
        />
        <Preview
          postId={"2"}
          profileImage={iconExample1}
          userId={"MynameisJungu"}
          nftName={"BAYC #5263"}
          title={"글 제목 입니다."}
          image={iconExample3}
          long={32}
          short={8}
          comment={6}
          communityName={"CryptoPhunks"}
          createdAt={"2023-07-19T16:48:00Z"}
        />
        <Preview
          postId={"3"}
          profileImage={iconExample1}
          userId={"MynameisJungu"}
          nftName={"BAYC #5263"}
          title={"글 제목 입니다."}
          long={32}
          short={8}
          comment={6}
          communityName={"CryptoPhunks"}
          createdAt={"2023-07-16T16:48:00Z"}
        />
      </ContentsWrapper>

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
//React
import { useEffect, useState, useContext } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row, Column, FlexBox } from 'components/Flex';
import Comment from 'components/Comment';

//Assets
import nft from 'assets/icons/nft.png';
import reportIcon from 'assets/icons/report.svg';
import longIcon from 'assets/icons/long.svg';
import shortIcon from 'assets/icons/short.svg';
import commentIcon from 'assets/icons/comment_black.svg';
import imageIcon from 'assets/icons/image.svg';

//import defaultProfile from 'assets/icons/default_profile.png';
import iconExample1 from 'assets/icons/icon_example_1.png';
import iconExample2 from 'assets/icons/icon_example_2.png';
import iconExample3 from 'assets/icons/icon_example_3.png';

function Post() {

  const postDetailExample = {
    "model": "post.post",
    "pk": 3,
    "fields": {
      "title": "test post2 UPDATE",
      "description": "test description",
      "type": "normal",
      "user_id": 2,
      "community_id": 1,
      "created_at": "2023-07-19T13:48:00Z",
      "updated_at": "2023-07-19T16:48:00Z",

      profileImage: iconExample1,
      userId: "Rhoncus",
      nftName: "NFT name",
      image: iconExample3,
      text: "Lorem ipsum dolor sit amet consectetur. Sit ut nisl eu commodo id imperdiet augue mi nisi. Placerat in vehicula neque lacus. Amet duis vel praesent suscipit urna malesuada velit aenean fringilla. Dictum sit id senectus urna cursus fringilla id congue diam. In cursus in eget sit eu urna. Ultricies consequat at dictum pellentesque tortor. Eget mauris elit faucibus et in. Sit tortor netus mi imperdiet. In nunc duis volutpat eu ipsum scelerisque vestibulum aliquet cursus. Sed semper aliquam est nulla tellus massa sed. Sit tortor consequat egestas sed diam dolor eu tellus. Nulla pellentesque viverra arcu vitae blandit dui. Porttitor mi ultricies arcu tortor sit. gravida senectus",
      long: 32,
      short: 8,
      comment: 6,
      view: 1562,
      communityName: "Community name"
    }
  }
  const { dispatch } = useContext(AppContext);
  const [postDetail, setPostDetail] = useState(postDetailExample);
  const [writtenComment, setWrittenComment] = useState('');
  

  function formatDateTime(dateTimeString) {
    const formattedDate = new Date(dateTimeString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour12: false,
      hour: '2-digit',
      minute: "numeric",
    });
    const dateArray = formattedDate.split(", ");
    return dateArray[0] + ', ' + dateArray[1] + ' ' + dateArray[2];
  }

  function formatNumber(number) {
    if (number >= 1e12) {
      // 숫자가 1조 이상이면 T로 표현
      return (number / 1e12).toFixed(1) + 'T';
    } else if (number >= 1e9) {
      // 숫자가 10억 이상이면 B로 표현
      return (number / 1e9).toFixed(1) + 'B';
    } else if (number >= 1e6) {
      // 숫자가 1백만 이상이면 M으로 표현
      return (number / 1e6).toFixed(1) + 'M';
    } else if (number >= 1e3) {
      // 숫자가 1천 이상이면 K로 표현
      return (number / 1e3).toFixed(1) + 'K';
    } else {
      // 숫자가 1천 미만이면 그대로 반환
      return number.toString();
    }
  }

  function handleReport(item) {
    dispatch({ type: 'OPEN_REPORT_POPUP' });
  }

  if (!postDetail) {
    return null;
  }

  return (
    <PostContainer>
      <CommunityBox>
        <Image src={postDetail.fields.profileImage} width={16} borderRadius="2px" />
        <Text B3 medium color={COLOR.N700} marginLeft={8}>{postDetail.fields.communityName}</Text>
      </CommunityBox>

      <TitleBox>
        <Text H5 bold color={COLOR.N900}>{postDetail.fields.title}</Text>
      </TitleBox>

      <ContentBox>
        <Row style={{ width: "100%" }}>
          <Text B3 color={COLOR.N600}>{formatDateTime(postDetail.fields.created_at)}</Text>
          <FlexBox />
          <Text B2 color={COLOR.N600}>{formatNumber(postDetail.fields.view)}&nbsp;views</Text>
          <StyledImage src={reportIcon} width={16} marginLeft={8} onClick={()=>handleReport()} />
        </Row>

        <Row marginTop={18} style={{ width: "100%" }}>
          <Image src={postDetail.fields.profileImage} width={33} borderRadius="4px" />
          <Column marginLeft={8} gap={4}>
            <Text B2 medium color={COLOR.N700}>{postDetail.fields.userId}</Text>
            <Row>
              <Image src={nft} width={16} />
              <Text B3 medium color={COLOR.N700} marginLeft={4}>{postDetail.fields.nftName}</Text>
            </Row>
          </Column>
        </Row>

        {
          postDetail.fields.image && <Image src={postDetail.fields.image} style={{ width: "100%" }} borderRadius="6px" marginTop={16} />
        }
        <Text B0 color={COLOR.N800} marginTop={16}>{postDetail.fields.text}</Text>

        <Row marginTop={48} gap={8} style={{ width: "100%", justifyContent: "center" }}>
          <LongShortButton>
            <Image src={longIcon} width={16} />
            <Text B2 medium color={COLOR.N700}>Long</Text>
            <Text B2 medium color={COLOR.N600}>{postDetail.fields.long}</Text>
          </LongShortButton>
          <LongShortButton>
            <Image src={shortIcon} width={16} />
            <Text B2 medium color={COLOR.N700}>Short</Text>
            <Text B2 medium color={COLOR.N600}>{postDetail.fields.short}</Text>
          </LongShortButton>
        </Row>
      </ContentBox>

      <CommentBox>
        <Row>
          <Image src={commentIcon} width={16} />
          <Text B2 medium color={COLOR.N800} marginLeft={8}>All Commnet</Text>
          <Text B2 medium color={COLOR.N700} marginLeft={8}>{postDetail.fields.comment}</Text>
        </Row>

        <CommentWriteBox>
          <CommentInput
            value={writtenComment}
            onChange={(e) => setWrittenComment(e.target.value)}
          />

          <Row marginTop={8}>
            <PostImageButton>
              <Image src={imageIcon} width={16} />
            </PostImageButton>
            <FlexBox />
            <PostButton>
              <Text B2 medium color={COLOR.N700}>Comment</Text>
            </PostButton>
          </Row>
        </CommentWriteBox>

        <CommentWrittenBox>
          <Comment
            profileImage={iconExample2}
            userId={"JunGGu"}
            nftName={"Bored Ape Yacht Club #3261"}
            text={"찬성합니다."}
            like={32}
            dislike={8}
            createdAt={"2023-07-26T16:48:00Z"}
          />
          <Comment
            profileImage={iconExample2}
            userId={"User name"}
            nftName={"NFT name"}
            text={"반대합니다."}
            image={iconExample3}
            like={32}
            dislike={8}
            createdAt={"2023-07-22T16:48:00Z"}
          />
        </CommentWrittenBox>

      </CommentBox>
    </PostContainer>
  );
}

export default Post;

const PostContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const CommunityBox = styled.div`
  width: 100%;
  padding: 16px 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const TitleBox = styled.div`
  width: 100%;
  height: 46px;
  padding: 0px 12px;
  background-color: #FFFFFF;
  border: 1px solid ${COLOR.N400};
  border-radius: 4px;
  display: flex;
  align-items: center;
`

const ContentBox = styled.div`
  margin-top: 8px;
  width: 100%;
  padding: 16px 16px 56px 16px;
  background-color: #FFFFFF;
  border: 1px solid ${COLOR.N400};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LongShortButton = styled.div`
  padding: 8px 12px;
  background-color: ${COLOR.N200};
  border: 1px solid ${COLOR.N400};
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`

const CommentBox = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
`

const CommentWriteBox = styled.div`
  margin-top: 8px;
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
`

const CommentInput = styled.textarea`
  width: 100%;
  height: 62px;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid ${COLOR.N400};
  font-size: 14px;
`

const PostImageButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 2px;
  border: 1px solid ${COLOR.N400};
  background-color: ${COLOR.N200};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const PostButton = styled.div`
  padding: 8.5px 18px;
  border-radius: 2px;
  border: 1px solid ${COLOR.N400};
  background-color: ${COLOR.N200};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const CommentWrittenBox = styled.div`
  margin-top: 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const StyledImage = styled(Image)`
  cursor: pointer;
`
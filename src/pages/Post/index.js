//React
import { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from 'context/AuthContext';
import { AppContext } from 'context/AppContext';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row, Column, FlexBox } from 'components/Flex';
import Comment from 'components/Comment';

//Api
import { getPostDetail, postComment, uploadImage } from 'apis/Home';

//Assets
import nftIcon from 'assets/icons/icon_nft.png';
import reportIcon from 'assets/icons/report.svg';
import longIcon from 'assets/icons/long.svg';
import shortIcon from 'assets/icons/short.svg';
import commentIcon from 'assets/icons/comment_black.svg';
import imageIcon from 'assets/icons/image.svg';
import defaultProfile from 'assets/icons/icon_default_profile.png';

function Post() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get('post_id');

  const { state: { loginData } } = useContext(AuthContext);
  const { dispatch } = useContext(AppContext);
  const [postDetail, setPostDetail] = useState();
  const [comment, setComment] = useState('');
  const [mediaUrl, setMediaUrl] = useState();
  const fileInputRef = useRef(null);

  useEffect(() => {
    initPostDetail();
  }, []);

  const initPostDetail = async function () {
    try {
      const response = await getPostDetail(postId);
      response.data.comments.reverse();
      setPostDetail(response.data);
    } catch (error) {
      alert(error);
    }
  };

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

  const handlePostComment = async function (commentId) {
    if(loginData){
      try {
        await postComment(loginData.token.access, postId, commentId, comment, mediaUrl);
        const response = await getPostDetail(postId);
        response.data.comments.reverse();
        setPostDetail(response.data);
        setComment('');
      } catch (error) {
        alert(error);
      }
    } else {
      alert('You need to login');
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      handlePostCommentImage(file);
    }
  };

  const handlePostCommentImage = async function (file) {
    if(loginData){
      try {
        const response = await uploadImage(loginData.token.access, 'comment', file);
        setMediaUrl(response.data);
      } catch (error) {
        alert(error);
      }
    } else {
      alert('You need to login');
    }
  };

  function handleReport() {
    dispatch({
      type: 'OPEN_REPORT_POPUP',
      subject: 'post',
      id: postId
    });
  }

  if (!postDetail) {
    return null;
  }

  return (
    <PostContainer>
      <CommunityBox>
        <Image src={postDetail.detail[0]?.community_image} width={16} borderRadius="2px" />
        <Text B3 medium color={COLOR.N700} marginLeft={8}>{postDetail.detail[0].community_title}</Text>
      </CommunityBox>

      <TitleBox>
        <Text H5 bold color={COLOR.N900}>{postDetail.detail[0].title}</Text>
      </TitleBox>

      <ContentBox>
        <Row style={{ width: "100%" }}>
          <Text B3 color={COLOR.N600}>{formatDateTime(postDetail.detail[0].created_at)}</Text>
          <FlexBox />
          <Text B2 color={COLOR.N600}>{formatNumber(postDetail.detail[0]?.view ?? 0)}&nbsp;views</Text>
          <StyledImage src={reportIcon} width={16} marginLeft={8} onClick={()=>handleReport()} />
        </Row>

        <Row marginTop={18} style={{ width: "100%" }}>
          <Image src={postDetail.detail[0]?.nft_thumbnail ?? defaultProfile} width={33} borderRadius="4px" />
          <Column marginLeft={8} gap={4}>
            <Text B2 medium color={COLOR.N700}>{postDetail.detail[0].nickname}</Text>
            <Row>
              <Image src={nftIcon} width={16} />
              <Text B3 medium color={COLOR.N700} marginLeft={4}>{postDetail.detail[0].nft_title}</Text>
            </Row>
          </Column>
        </Row>

        {
          postDetail.detail[0]?.image && <Image src={postDetail.detail[0].image} style={{ width: "100%" }} borderRadius="6px" marginTop={16} />
        }
        <Text B0 color={COLOR.N800} marginTop={16}>{postDetail.detail[0]?.description}</Text>

        <Row marginTop={48} gap={8} style={{ width: "100%", justifyContent: "center" }}>
          <LongShortButton>
            <Image src={longIcon} width={16} />
            <Text B2 medium color={COLOR.N700}>Long</Text>
            <Text B2 medium color={COLOR.N600}>{postDetail.detail[0].liked_count}</Text>
          </LongShortButton>
          <LongShortButton>
            <Image src={shortIcon} width={16} />
            <Text B2 medium color={COLOR.N700}>Short</Text>
            <Text B2 medium color={COLOR.N600}>{postDetail.detail[0].disliked_count}</Text>
          </LongShortButton>
        </Row>
      </ContentBox>

      <CommentBox>
        <Row>
          <Image src={commentIcon} width={16} />
          <Text B2 medium color={COLOR.N800} marginLeft={8}>All Commnet</Text>
          <Text B2 medium color={COLOR.N700} marginLeft={8}>{postDetail.comments.length}</Text>
        </Row>

        <CommentWriteBox>
          <CommentInput
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Row marginTop={8}>
            <PostImageButton onClick={() => fileInputRef.current.click()}>
              <FileInput
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
              />
              <Image src={imageIcon} width={16} />
            </PostImageButton>
            <FlexBox />
            <PostButton onClick={()=>handlePostComment()}>
              <Text B2 medium color={COLOR.N700}>Comment</Text>
            </PostButton>
          </Row>
        </CommentWriteBox>

        <CommentWrittenBox>
          {
            postDetail.comments.map((item) =>
              <Comment
                key={`comment_${item.id}`}
                postId={postId}
                commentId={item.id}
                profileImage={item.nft_thumbnail}
                userId={item.nickname}
                nftName={item.nft_title}
                text={item.text}
                image={item.media_url}
                like={item?.liked_count ?? 0}
                dislike={item?.disliked_count ?? 0}
                createdAt={item.created_at}
                depth={item.depth}
              />)
          }
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

const FileInput = styled.input`
  display: none;
`;

const StyledImage = styled(Image)`
  cursor: pointer;
`
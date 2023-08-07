//React
import { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from 'context/AuthContext';
import { AppContext } from 'context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row, Column, FlexBox, DividingLine } from 'components/Flex';
import Comment from 'components/Comment';
import 'react-quill/dist/quill.snow.css';

//Api
import { getPostDetail, likedPost, postComment, uploadImage } from 'apis/Home';

//Assets
import nftIcon from 'assets/icons/icon_nft.png';
import nftNoneIcon from 'assets/icons/icon_nft_none.png';
import moreIcon from 'assets/icons/more.svg';
import editIcon from 'assets/icons/edit.svg';
import reportIcon from 'assets/icons/report.svg';
import longIcon from 'assets/icons/long.svg';
import shortIcon from 'assets/icons/short.svg';
import commentIcon from 'assets/icons/comment_black.svg';
import imageIcon from 'assets/icons/image.svg';
import arrowNext from 'assets/icons/arrow_next.svg';
import defaultProfile from 'assets/icons/icon_default_profile.png';
import defaultCommunity from 'assets/icons/icon_default_community.png';

function Post() {

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get('post_id');

  const { state: { loginData } } = useContext(AuthContext);
  const { dispatch } = useContext(AppContext);
  const [postDetail, setPostDetail] = useState();
  const [maxLength, setMaxLength] = useState();
  const [pageIndex, setPageIndex] = useState(0);

  const [isToggleOpened, setIsToggleOpened] = useState(false);
  const [isPostLiked, setIsPostLiked] = useState();

  const [comment, setComment] = useState();
  const [mediaUrl, setMediaUrl] = useState();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (postId) {
      initPostDetail();
    }
  }, []);

  function commentSort(commentsArray) {
    const comments = commentsArray;
    let depth0Comments = [];
    let depth1Comments = [];
    let depth2Comments = [];
    for (const comment of comments) {
      if (comment.depth === 0) {
        depth0Comments.push(comment);
      }
      if (comment.depth === 1) {
        depth1Comments.push(comment);
      }
      if (comment.depth === 2) {
        depth2Comments.push(comment);
      }
    }

    for (const depth0 of depth0Comments) {
      for (const depth1 of depth1Comments) {
        if (depth1.parent_id === depth0.id) {
          depth0Comments.splice(depth0Comments.indexOf(depth0Comments.find(c => c.id === depth0.id)) + 1, 0, depth1);
        }
      }
    }
    for (const depth0 of depth0Comments) {
      for (const depth2 of depth2Comments) {
        if (depth2.parent_id === depth0.id) {
          depth0Comments.splice(depth0Comments.indexOf(depth0Comments.find(c => c.id === depth0.id)) + 1, 0, depth2);
        }
      }
    }

    return depth0Comments;
  }

  const initPostDetail = async function () {
    try {
      const response = await getPostDetail(postId, 0);
      response.data.comments = commentSort(response.data.comments);
      setPostDetail(response.data);
      setMaxLength(response.data.commnet_count);
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

  function handleEditPost() {
    navigate(`/write?post_id=${postId}`);
    window.scrollTo({ top: 0 });
  }

  function handleReport() {
    dispatch({
      type: 'OPEN_REPORT_POPUP',
      subject: 'post',
      id: postId
    });
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

  function linkifyUrls(inputText) {
    const urlPattern = /((https?:\/\/|www\.)[^\s<>]+)/g;
    const parser = new DOMParser();
    const doc = parser.parseFromString(inputText, 'text/html');

    const paragraphs = doc.querySelectorAll('p');

    paragraphs.forEach((paragraph) => {
      // 이미지나 iframe 태그가 있는 경우 건너뜁니다.
      if (paragraph.querySelector('img, iframe')) {
        return;
      }

      const paragraphText = paragraph.innerHTML;
      const linkedText = paragraphText.replace(urlPattern, (url) => {
        // URL이 'http://' 또는 'https://'로 시작하지 않으면 'http://'를 추가합니다.
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
          url = 'http://' + url;
        }
        return `<a href="${encodeURI(url)}" target="_blank">${url}</a>`;
      });

      paragraph.innerHTML = linkedText;
    });

    return doc.body.innerHTML;
  }

  const handleLikedPost = async function (liked) {
    if (loginData) {
      try {
        await likedPost(loginData.token.access, postId, liked);
        setIsPostLiked(liked);
      } catch (error) {
        alert(error);
      }
    } else {
      alert('You need to login');
      navigate('/login');
    }
  };

  const handlePostComment = async function () {
    if (loginData) {
      if (!comment) {
        alert('Comment field is empty');
        return;
      }

      try {
        await postComment(loginData.token.access, postId, undefined, comment, mediaUrl);
        setMediaUrl();
        const response = await getPostDetail(postId, 0);
        response.data.comments = commentSort(response.data.comments);
        setPostDetail(response.data);
        setMaxLength(response.data.commnet_count);
        setComment('');
      } catch (error) {
        alert(error);
      }
    } else {
      alert('You need to login');
      navigate('/login');
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
      if (file) {
        handlePostCommentImage(file);
      }
  };

  const handlePostCommentImage = async function (file) {
    try {
      const response = await uploadImage(loginData.token.access, 'comment', file);
      setMediaUrl(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const handleChangePaginationIndex = async function (index) {
    setPageIndex(index);
    try {
      const response = await getPostDetail(postId, index);
      response.data.comments = commentSort(response.data.comments);
      setPostDetail(response.data);
      setMaxLength(response.data.commnet_count);
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

  const handleProfileImageError = (error) => {
    error.target.src = defaultCommunity;
  }

  if (!postDetail) {
    return null;
  }

  return (
    <PostContainer onClick={()=>{
      if(isToggleOpened){
        setIsToggleOpened(false)
      }
    }}>
      <CommunityBox>
        {
          postDetail.detail[0].community_title
          && <Row
            onClick={() => {
              if (postDetail.detail[0]?.community_id) {
                navigate(`/community?community_id=${postDetail.detail[0]?.community_id}`)
              }
            }}
            style={{ maxWidth: '100%', cursor: 'pointer' }}
          >
            <Image src={postDetail.detail[0]?.community_logo_url ?? defaultCommunity} width={16} borderRadius="2px" onError={handleProfileImageError} />
            <Text B3 medium color={COLOR.N700} marginLeft={8} style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>{postDetail.detail[0].community_title}</Text>
          </Row>
        }
      </CommunityBox>

      <TitleBox>
        <Text H5 bold color={COLOR.N900} style={{width: '100%', overflow: 'hidden', textOverflow: 'ellipsis'}}>{postDetail.detail[0].title}</Text>
      </TitleBox>

      <ContentBox>
        <Row style={{ width: '100%', position: 'relative' }}>
          <Text B3 color={COLOR.N600}>{formatDateTime(postDetail.detail[0].created_at)}</Text>
          <FlexBox />
          <Text B2 color={COLOR.N600}>{formatNumber(Math.round(postDetail.detail[0].viewer_count / 2))}&nbsp;views</Text>
          <StyledImage src={moreIcon} width={16} marginLeft={8} onClick={() => setIsToggleOpened(true)} />
          {
            isToggleOpened && <ToggleBox>
              {
                postDetail.detail[0].nickname === loginData?.user?.nickname && (<>
                  <StyledRow marginLeft={8} onClick={()=>handleEditPost()}>
                    <Image src={editIcon} width={14} />
                    <Text B3 color={COLOR.N700} marginLeft={8}>Edit</Text>
                  </StyledRow>
                  <DividingLine color={COLOR.N400} />
                </>)
              }
              <StyledRow marginLeft={8} onClick={()=>handleReport()}>
                <Image src={reportIcon} width={14} />
                <Text B3 color={COLOR.N700} marginLeft={8}>Report</Text>
              </StyledRow>
            </ToggleBox>
          }
        </Row>

        <Row marginTop={18}>
          <Row
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (postDetail.detail[0]?.user_id === loginData.user.id) {
                navigate(`/profile`)
              } else {
                navigate(`/profile?profile_id=${postDetail.detail[0]?.user_id}`)
              }
            }}
          >
            <Image src={postDetail.detail[0]?.nft_thumbnail ?? defaultProfile} width={33} borderRadius="4px" />
            <Column marginLeft={8} gap={4}>
              <Text B2 medium color={COLOR.N700}>{postDetail.detail[0].nickname}</Text>
              <Row>
                <Image src={postDetail.detail[0].nft_title ? nftIcon : nftNoneIcon} width={16} />
                {
                  postDetail.detail[0].nft_title
                    ? <Text B3 medium color={COLOR.N700} marginLeft={4}>{postDetail.detail[0].nft_title}</Text>
                    : <Text B3 medium color={COLOR.N600} marginLeft={4}>None</Text>
                }
              </Row>
            </Column>
          </Row>
        </Row>

        <DescriptionBox className="view ql-editor" dangerouslySetInnerHTML={{ __html: linkifyUrls(postDetail.detail[0]?.description) }} />

        <Row marginTop={48} gap={8} style={{ width: "100%", justifyContent: "center" }}>
          <LongShortButton onClick={()=>handleLikedPost(true)}>
            <Image src={longIcon} width={16} />
            <Text B2 medium color={COLOR.N700}>Long</Text>
            <LongShortCount B2 medium color="#26CA5E">{isPostLiked===true ? postDetail.detail[0].liked_count + 1 : postDetail.detail[0].liked_count}</LongShortCount>
          </LongShortButton>
          <LongShortButton onClick={()=>handleLikedPost(false)}>
            <Image src={shortIcon} width={16} />
            <Text B2 medium color={COLOR.N700}>Short</Text>
            <LongShortCount B2 medium color={COLOR.BLUE1}>{isPostLiked===false ? postDetail.detail[0].disliked_count + 1 : postDetail.detail[0].disliked_count}</LongShortCount>
          </LongShortButton>
        </Row>
      </ContentBox>

      <CommentBox>
        <Row>
          <Image src={commentIcon} width={16} />
          <Text B2 medium color={COLOR.N800} marginLeft={8}>All Comments</Text>
          <Text B2 medium color={COLOR.N700} marginLeft={8}>{maxLength ?? 0}</Text>
        </Row>

        <CommentWriteBox>
          {
            mediaUrl && <Image src={mediaUrl} style={{width: '100%'}} />
          }
          <CommentInput
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <Row marginTop={8}>
            <PostImageButton
              onClick={() => {
                if (loginData) {
                  if(mediaUrl){
                    setMediaUrl();
                  }else{
                    fileInputRef.current.click()
                  }
                } else {
                  alert('You need to login');
                  navigate('/login');
                }
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                style={{ display: 'none'}}
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
                userId={item.user_id}
                userName={item.nickname}
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

      <Pagination />

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
  padding: 12px;
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
`

const ToggleBox = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 96px;
  padding: 7px 0;
  background-color: #FFFFFF;
  border: 1px solid ${COLOR.N400};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 7px;
`

const DescriptionBox = styled.div`
  margin-top: 16px;
  width: 100%;
  padding: 0;
  background-color: transparent;
  border-radius: 0px;
  img {
    max-width: 100%;
  }
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

const LongShortCount = styled(Text)`
  width: 20px;
  text-align: center;
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

const StyledImage = styled(Image)`
  cursor: pointer;
`

const StyledRow = styled(Row)`
  cursor: pointer;
`
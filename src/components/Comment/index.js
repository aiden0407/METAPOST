//React
import { useState, useContext, useRef } from 'react';
import { AuthContext } from 'context/AuthContext';
import { AppContext } from 'context/AppContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row, Column, FlexBox } from 'components/Flex';

//Api
import { likedComment, postComment, uploadImage } from 'apis/Home';

//Assets
import nftIcon from 'assets/icons/icon_nft.png';
import nftNoneIcon from 'assets/icons/icon_nft_none.png';
import likeIcon from 'assets/icons/like.svg';
//import likeColorIcon from 'assets/icons/like_color.svg';
import dislikeIcon from 'assets/icons/dislike.svg';
//import dislikeColorIcon from 'assets/icons/dislike_color.svg';
import commentIcon from 'assets/icons/comment.svg';
import reportIcon from 'assets/icons/report.svg';
import imageIcon from 'assets/icons/image.svg';
import defaultProfile from 'assets/icons/icon_default_profile.png';

function Comment({ postId, commentId, profileImage, userId, nftName, text, image, like, dislike, createdAt, depth }) {

    const navigate = useNavigate();
    const { state: { loginData } } = useContext(AuthContext);
    const { dispatch } = useContext(AppContext);
    const [isCommentOpend, setIsCommentOpend] = useState(false);
    const [comment, setComment] = useState();
    const [mediaUrl, setMediaUrl] = useState();
    const fileInputRef = useRef(null);

    function getTimeDifference(time) {
        const currentDate = new Date();
        const targetDate = new Date(time);
        const timeDifference = currentDate - targetDate;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days}d`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else if (minutes > 0) {
            return `${minutes}m`;
        } else {
            return `${seconds}s`;
        }
    }

    const handleLikedComment = async function (liked) {
        if (loginData) {
            try {
                await likedComment(loginData.token.access, commentId, liked);
                window.location.reload();
            } catch (error) {
                alert(error);
            }
        } else {
            alert('You need to login');
            navigate('/login');
        }
    };

    function handleReport() {
        dispatch({
            type: 'OPEN_REPORT_POPUP',
            subject: 'comment',
            id: commentId
        });
    }

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

      const handlePostComment = async function () {
        if(!comment) {
            alert('Comment field is empty');
            return;
        }

        try {
            await postComment(loginData.token.access, postId, commentId, comment, mediaUrl);
            window.location.reload();
        } catch (error) {
            alert(error);
        }
      };

    return (
        <PostBox depth={depth}>
            <Row>
                <Image src={profileImage ?? defaultProfile} width={33} borderRadius="4px" />
                <Column marginLeft={8} gap={4} style={{ width: "100%" }}>
                    <Row style={{ width: "100%" }}>
                        <Text B2 medium color={COLOR.N700}>{userId}</Text>
                        <FlexBox />
                        <Text B3 medium color={COLOR.N600}>{getTimeDifference(createdAt)}</Text>
                    </Row>
                    <Row>
                        <Image src={nftName ? nftIcon : nftNoneIcon} width={16} />
                        {
                            nftName
                                ? <Text B3 medium color={COLOR.N700} marginLeft={4}>{nftName}</Text>
                                : <Text B3 medium color={COLOR.N600} marginLeft={4}>None</Text>
                        }
                    </Row>

                </Column>
            </Row>

            {
                image && <Image src={image} style={{ width: "100%" }} marginTop={6} />
            }
            <Text B1 color={COLOR.N800} marginTop={8}>{text}</Text>

            <Row marginTop={8} gap={8}>
                <StyledRow gap={4} onClick={()=>handleLikedComment(true)}>
                    <Image src={likeIcon} width={12} />
                    <Text B4 medium color={COLOR.N700}>{like}</Text>
                </StyledRow>
                <StyledRow gap={4} onClick={()=>handleLikedComment(false)}>
                    <Image src={dislikeIcon} width={12} marginTop={1} />
                    <Text B4 medium color={COLOR.N700}>{dislike}</Text>
                </StyledRow>
                <StyledRow
                    gap={4}
                    onClick={() => {
                        if (loginData) {
                            setIsCommentOpend(!isCommentOpend);
                        } else {
                            alert('You need to login');
                            navigate('/login');
                        }
                    }}
                >
                    <Image src={commentIcon} width={12} marginTop={2} />
                    <Text B4 medium color={COLOR.N600}>Comment</Text>
                </StyledRow>
                <StyledImage src={reportIcon} width={14} onClick={() => handleReport()} />
            </Row>

            {
                isCommentOpend && <>
                    {
                        mediaUrl && <Image src={mediaUrl} style={{ width: '100%' }} marginTop={10} />
                    }
                    <CommentInput
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Row marginTop={8}>
                        <PostImageButton onClick={() => {
                            if (mediaUrl) {
                                setMediaUrl();
                            } else {
                                fileInputRef.current.click()
                            }
                        }}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileInputChange}
                                style={{ display: 'none' }}
                            />
                            <Image src={imageIcon} width={16} />
                        </PostImageButton>
                        <FlexBox />
                        <PostButton onClick={() => handlePostComment()}>
                            <Text B2 medium color={COLOR.N700}>Comment</Text>
                        </PostButton>
                    </Row>
                </>
            }

        </PostBox>
    )
}

export default Comment

const PostBox = styled.div`
  width: 100%;
  padding: 8px;
  padding-left: ${(props) => (props.depth > 0) && `${8 + props.depth * 24}px`};
  background-color: #FFFFFF;
  border-bottom: 1px dashed ${COLOR.N400};
  display: flex;
  flex-flow: column;
`

const CommentInput = styled.textarea`
  margin-top: 16px;
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

const StyledRow = styled(Row)`
  cursor: pointer;
`

const StyledImage = styled(Image)`
  cursor: pointer;
`
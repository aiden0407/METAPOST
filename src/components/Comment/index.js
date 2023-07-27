//React
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row, Column, FlexBox } from 'components/Flex';

//Assets
import nftIcon from 'assets/icons/icon_nft.png';
import likeIcon from 'assets/icons/like.svg';
//import likeColorIcon from 'assets/icons/like_color.svg';
import dislikeIcon from 'assets/icons/dislike.svg';
//import dislikeColorIcon from 'assets/icons/dislike_color.svg';
import commentIcon from 'assets/icons/comment.svg';
import reportIcon from 'assets/icons/report.svg';

function Comment({ profileImage, userId, nftName, text, image, like, dislike, createdAt }) {

    const { dispatch } = useContext(AppContext);

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

    function handleReport(item) {
        dispatch({ type: 'OPEN_REPORT_POPUP' });
    }

    return (
        <PostBox>
            <Row>
                <Image src={profileImage} width={33} borderRadius="4px" />
                <Column marginLeft={8} gap={4} style={{ width: "100%" }}>
                    <Row style={{ width: "100%" }}>
                        <Text B2 medium color={COLOR.N600}>{userId}</Text>
                        <FlexBox />
                        <Text B3 medium color={COLOR.N600}>{getTimeDifference(createdAt)}</Text>
                    </Row>
                    <Row>
                        <Image src={nftIcon} width={16} />
                        <Text B3 medium color={COLOR.N600} marginLeft={4}>{nftName}</Text>
                    </Row>
                </Column>
            </Row>

            <Text B1 color={COLOR.N800} marginTop={8}>{text}</Text>
            {/* {
                image && <Image src={image} style={{ width: "100%" }} borderRadius="4px" marginTop={10} />
            } */}

            <Row marginTop={8} gap={8}>
                <StyledRow gap={4}>
                    <Image src={likeIcon} width={12} />
                    <Text B4 medium color={COLOR.N700}>{like}</Text>
                </StyledRow>
                <StyledRow gap={4}>
                    <Image src={dislikeIcon} width={12} marginTop={1} />
                    <Text B4 medium color={COLOR.N700}>{dislike}</Text>
                </StyledRow>
                <StyledRow gap={4}>
                    <Image src={commentIcon} width={12} marginTop={2} />
                    <Text B4 medium color={COLOR.N600}>Comment</Text>
                </StyledRow>
                <StyledImage src={reportIcon} width={14} onClick={()=>handleReport()} />
            </Row>
        </PostBox>
    )
}

export default Comment

const PostBox = styled.div`
  width: 100%;
  padding: 8px;
  background-color: #FFFFFF;
  border-bottom: 1px dashed ${COLOR.N400};
  display: flex;
  flex-flow: column;
`

const StyledRow = styled(Row)`
  cursor: pointer;
`

const StyledImage = styled(Image)`
  cursor: pointer;
`
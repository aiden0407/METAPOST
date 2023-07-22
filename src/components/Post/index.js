//React
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row, Column, FlexBox } from 'components/Flex';

//Assets
import nft from 'assets/icons/nft.png';
import long from 'assets/icons/long.svg';
import short from 'assets/icons/short.svg';
import comment from 'assets/icons/comment.svg';

function Post({ profileImage, userId, nftName, title, image, like, dislike, comments, communityName, createdAt }) {

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

    return (
        <PostBox>
            <Row>
                <Image src={profileImage} width={33} borderRadius="4px" />
                <Column marginLeft={8} gap={4} style={{ width: "100%" }}>
                    <Row style={{ width: "100%" }}>
                        <Text B2 medium color={COLOR.N700}>{userId}</Text>
                        <FlexBox />
                        <Text B3 medium color={COLOR.N600}>{getTimeDifference(createdAt)}</Text>
                    </Row>
                    <Row>
                        <Image src={nft} width={16} />
                        <Text B3 medium color={COLOR.N700} marginLeft={4}>{nftName}</Text>
                    </Row>
                </Column>
            </Row>

            <Text B1 medium color={COLOR.N800} marginTop={10}>{title}</Text>
            {
                image && <Image src={image} style={{ width: "100%" }} borderRadius="8px" marginTop={10} />
            }

            <Row marginTop={10} gap={8}>
                <IconBox>
                    <Image src={long} width={12} />
                    <Text B3 medium color={COLOR.N700} marginLeft={2}>{like}</Text>
                </IconBox>
                <IconBox>
                    <Image src={short} width={12} />
                    <Text B3 medium color={COLOR.N700} marginLeft={2}>{dislike}</Text>
                </IconBox>
                <IconBox>
                    <Image src={comment} width={12} />
                    <Text B3 medium color={COLOR.N700} marginLeft={2}>{comments}</Text>
                </IconBox>
                <Text B3 medium color={COLOR.N600}>{communityName}</Text>
            </Row>
        </PostBox>
    )
}

export default Post

const PostBox = styled.div`
  width: 100%;
  padding: 14px 16px 10px 16px;
  background-color: #FFFFFF;
  border: 1px solid ${COLOR.N400};
  border-radius: 5px;
  display: flex;
  flex-flow: column;
  cursor: pointer;
`

const IconBox = styled.div`
  padding: 4px;
  background-color: ${COLOR.N400};
  border-radius: 2px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
`
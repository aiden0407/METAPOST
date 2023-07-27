//React
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';

//Assets
import iconExample5 from 'assets/icons/icon_example_5.png';

function Post() {

  const noticeText = `Effective June 16, 2023. Last Revised June 16, 2023

  At Metapost, we believe that privacy is a right. We want to empower our users to be the masters of their identity. In this privacy policy, we want to help you understand how and why Metapost, Inc. (“Metapost,” "we” or "us”) collects, uses, and shares information about you when you use our sites, mobile apps(planned), widgets, and other online products and services (collectively, the "Services") or when you otherwise interact with us or receive a communication from us.
  We collect minimal information that can be used to identify you by default. If you want to just browse, you don't need an account. If you want to create an account to participate in a community, we don't require you to give us your real name. We don't automatically track your precise location. You can share as much or as little about yourself as you want. You can create multiple accounts, update information as you see fit, or ask us to delete your information.
  Any data we collect is used primarily to provide our services, which are focused on allowing people to come together and form communities, the vast majority of which are public. If you have questions about how we use your data, you can always ask us for more information.`

  return (
    <PostContainer>
      <CommunityBox>
        <Image src={iconExample5} width={16} borderRadius="2px" />
        <Text B3 medium color={COLOR.N700} marginLeft={8}>METAPOST</Text>
      </CommunityBox>

      <TitleBox>
        <Text H5 bold color={COLOR.N900}>[Metapost] Notice</Text>
      </TitleBox>

      <ContentBox>
        <Text B3 color={COLOR.N600}>Dec 20, 2023 12:43</Text>

        <Text B0 color={COLOR.N800} marginTop={16}>{noticeText}</Text>
      </ContentBox>
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
`
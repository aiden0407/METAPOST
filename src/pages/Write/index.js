//React
import { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from 'context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row, FlexBox, Box } from 'components/Flex';

//Api
import { getPostDetail, uploadImage, writePost, editPost } from 'apis/Home';
import { getMyCommunityList } from 'apis/Community';

//Assets
import arrowNextIcon from 'assets/icons/arrow_next.svg';
import alignLeftIcon from 'assets/icons/align_left.svg';
import alignLeftColorIcon from 'assets/icons/align_left_color.svg';
import alignCenterIcon from 'assets/icons/align_center.svg';
import alignCenterColorIcon from 'assets/icons/align_center_color.svg';
import alignRightIcon from 'assets/icons/align_right.svg';
import alignRightColorIcon from 'assets/icons/align_right_color.svg';
import imageIcon from 'assets/icons/image.svg';
import youtubeIcon from 'assets/icons/youtube.svg';
import emojiIcon from 'assets/icons/emoji.svg';
import defaultProfile from 'assets/icons/icon_default_profile.png';

function Write() {

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get('post_id');

  const { state: { loginData } } = useContext(AuthContext);
  const [communityData, setCommunityData] = useState();
  const [isToggleOpened, setIsToggleOpened] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState();
  const [isNoticeChecked, setNoticeChecked] = useState(false);
  const [title, setTitle] = useState('');
  const [alignOption, setAlignOption] = useState('left');
  const [description, setDescription] = useState('');
  const [mediaUrl, setMediaUrl] = useState();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (loginData) {
      initWrite();
    }
  }, [loginData]);

  const initWrite = async function () {
    try {
      const response = await getMyCommunityList(loginData.token.access);
      setCommunityData(response.data);
      if (response.data.length) {
        setSelectedCommunity(response.data[0]);
      }

      if(postId){
        initEdit(response.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  const initEdit = async function (communityList) {
    try {
      const response = await getPostDetail(postId);
      setSelectedCommunity();
      for (const community of communityList) {
        if(community.fields.title === response.data.detail[0].community_title){
          setSelectedCommunity(community);
          break ;
        }
      }
      setTitle(response.data.detail[0].title);
      setDescription(response.data.detail[0].description);
    } catch (error) {
      alert(error);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handlePostImage(file);
    }
  };

  const handlePostImage = async function (file) {
    try {
      const response = await uploadImage(loginData.token.access, 'post', file);
      setMediaUrl(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const handleDone = async function () {
    if (!title.length) {
      alert('Title field is empty');
      return;
    }

    if (!description.length) {
      alert('Description field is empty');
      return;
    }

    if (postId) {
      try {
        await editPost(loginData.token.access, postId, (isNoticeChecked ? 'notice' : 'normal'), title, description);
        navigate(`/post?post_id=${postId}`);
        window.scrollTo({ top: 0 });
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        await writePost(loginData.token.access, selectedCommunity?.pk, (isNoticeChecked ? 'notice' : 'normal'), title, description);
        navigate('/');
        window.scrollTo({ top: 0 });
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleImageError = (error) => {
    error.target.src = defaultProfile;
  }

  return (
    <WriteContainer>
      <ToggleButton
        onClick={() => {
          if (communityData?.length && !postId) {
            setIsToggleOpened(!isToggleOpened)
          }
        }}
        style={postId ? {cursor: 'default'} : {}}
      >
        {
          selectedCommunity
            ? <Image src={selectedCommunity.fields?.logo_url} width={24} onError={handleImageError} />
            : <Box width={24} height={24} />
        }
        {
          communityData?.length
            ? <Text B3 medium color={COLOR.N1000} marginLeft={8}>{selectedCommunity?.fields?.title ?? 'None'}</Text>
            : <Text B3 medium color={COLOR.N600} marginLeft={8}>Community not found</Text>
        }
        <FlexBox />
        {
          communityData?.length && !postId
            ? <Image src={arrowNextIcon} width={24} style={{ transform: "rotate(90deg)" }} />
            : null
        }
        {
          isToggleOpened
          && <ToggleMenu>
            <StyledRow
              onClick={() => {
                setSelectedCommunity();
                setIsToggleOpened(!isToggleOpened);
              }}>
              <Box width={24} height={24} />
              <Text B3 medium color={selectedCommunity?.fields?.title ? COLOR.N700 : '#000000'} marginLeft={8}>None</Text>
            </StyledRow>

            {communityData.map((item) =>
              <StyledRow
                key={`community_${item.pk}`}
                onClick={() => {
                  setSelectedCommunity(item);
                  setIsToggleOpened(!isToggleOpened);
                }}>
                <Image src={item?.fields?.logo_url} width={24} height={24} onError={handleImageError} />
                <Text B3 medium color={selectedCommunity?.fields?.title === item.fields.title ? '#000000' : COLOR.N700} marginLeft={8}>{item.fields.title}</Text>
              </StyledRow>)
            }
          </ToggleMenu>
        }
      </ToggleButton>

      <WriteBox>
        {
          selectedCommunity?.fields?.owner_id === loginData?.user?.id
          && <NoticeRow>
            <CheckBox
              checked={isNoticeChecked}
              onChange={(event) => {
                setNoticeChecked(event.target.checked);
              }}
            />
            <Text B1 medium color={COLOR.N1000} marginLeft={8}>Notice</Text>
          </NoticeRow>
        }

        <TitleInput
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <Row gap={8}>
          <OptionButton on={alignOption === 'left'} onClick={() => setAlignOption('left')}>
            <Image src={alignOption === 'left' ? alignLeftColorIcon : alignLeftIcon} width={20} />
          </OptionButton>
          <OptionButton on={alignOption === 'center'} onClick={() => setAlignOption('center')}>
            <Image src={alignOption === 'center' ? alignCenterColorIcon : alignCenterIcon} width={20} />
          </OptionButton>
          <OptionButton on={alignOption === 'right'} onClick={() => setAlignOption('right')}>
            <Image src={alignOption === 'right' ? alignRightColorIcon : alignRightIcon} width={20} />
          </OptionButton>
          <OptionButton onClick={() => fileInputRef.current.click()}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
            />
            <Image src={imageIcon} width={20} />
          </OptionButton>
          <OptionButton>
            <Image src={youtubeIcon} width={20} />
          </OptionButton>
          <OptionButton>
            <Image src={emojiIcon} width={20} />
          </OptionButton>
        </Row>

        <DescriptionInput
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Please enter details.'
          style={{ textAlign: `${alignOption}` }}
        />
      </WriteBox>

      <DoneButton onClick={() => handleDone()}>
        <Text H5 bold color="#FFFFFF">Done</Text>
      </DoneButton>
    </WriteContainer>
  );
}

export default Write;

const WriteContainer = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
`

const ToggleButton = styled.div`
  margin-top: 16px;
  position: relative;
  width: 100%;
  padding: 8px;
  background-color: #FFFFFF;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ToggleMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow: scroll;
  padding: 7px;
  background-color: #FFFFFF;
  border: 1px solid ${COLOR.N400};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`;

const WriteBox = styled.div`
  margin-top: 8px;
  width: 100%;
  padding: 8px;
  background-color: #FFFFFF;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const NoticeRow = styled(Row)`
  width: 100%;
  height: 40px;
`

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
  border: 4px solid ${COLOR.N600};
  border-radius: 4px;
  cursor: pointer;
`

const TitleInput = styled.input`
  width: 100%;
  padding: 11px 12px;
  background-color: ${COLOR.N400};
  border-radius: 4px;
  font-size: 15px;
`

const OptionButton = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${COLOR.N400};
  border-radius: 4px;
  border: ${(props) => props.on ? `1px solid ${COLOR.BLUE2}` : 'none'};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const DescriptionInput = styled.textarea`
  width: 100%;
  height: 480px;
  padding: 12px;
  background-color:${COLOR.N400};
  border-radius: 4px;
  font-size: 15px;
`

const DoneButton = styled.div`
  margin-top: 8px;
  width: 100%;
  height: 40px;
  background-color: ${COLOR.BLUE1};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledRow = styled(Row)`
  cursor: pointer;
`
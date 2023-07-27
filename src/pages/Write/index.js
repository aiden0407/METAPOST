//React
import { useState } from 'react';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row, FlexBox } from 'components/Flex';

//Assets
import arrowNextIcon from 'assets/icons/arrow_next.svg';
import alignLeftColorIcon from 'assets/icons/align_left_color.svg';
import alignCenterIcon from 'assets/icons/align_center.svg';
import imageIcon from 'assets/icons/image.svg';
import youtubeIcon from 'assets/icons/youtube.svg';
import emojiIcon from 'assets/icons/emoji.svg';

import iconExample1 from 'assets/icons/icon_example_1.png';
import iconExample2 from 'assets/icons/icon_example_2.png';
import iconExample3 from 'assets/icons/icon_example_3.png';
import iconExample4 from 'assets/icons/icon_example_4.png';

function Write() {

  const [isToggleOpened, setIsToggleOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Clone X');
  const [selectedOptionImage, setSelectedOptionImage] = useState(iconExample4);
  const [title, setTitle] = useState('');
  const [optionIndex, setOptionIndex] = useState(0);
  const [postContent, setPostContent] = useState('');

  return (
    <WriteContainer>
      <ToggleButton onClick={() => setIsToggleOpened(!isToggleOpened)}>
        <Image src={selectedOptionImage} width={24} />
        <Text B3 medium color={COLOR.N1000} marginLeft={8}>{selectedOption}</Text>
        <FlexBox />
        <Image src={arrowNextIcon} width={24} style={{ transform: "rotate(90deg)" }} />
        {
          isToggleOpened
          && <ToggleMenu>
            <StyledRow onClick={() => {
              setSelectedOption('Clone X');
              setSelectedOptionImage(iconExample4);
              setIsToggleOpened(!isToggleOpened);
            }}>
              <Image src={iconExample4} width={24} />
              <Text B3 medium color={selectedOption === 'Clone X' ? '#000000' : COLOR.N700} marginLeft={8}>Clone X</Text>
            </StyledRow>

            <StyledRow onClick={() => {
              setSelectedOption('Community name1');
              setSelectedOptionImage(iconExample1);
              setIsToggleOpened(!isToggleOpened);
            }}>
              <Image src={iconExample1} width={24} />
              <Text B3 medium color={selectedOption === 'Community name1' ? '#000000' : COLOR.N700} marginLeft={8}>Community name1</Text>
            </StyledRow>

            <StyledRow onClick={() => {
              setSelectedOption('Community name2');
              setSelectedOptionImage(iconExample2);
              setIsToggleOpened(!isToggleOpened);
            }}>
              <Image src={iconExample2} width={24} />
              <Text B3 medium color={selectedOption === 'Community name2' ? '#000000' : COLOR.N700} marginLeft={8}>Community name2</Text>
            </StyledRow>

            <StyledRow onClick={() => {
              setSelectedOption('Community name3');
              setSelectedOptionImage(iconExample3);
              setIsToggleOpened(!isToggleOpened);
            }}>
              <Image src={iconExample3} width={24} />
              <Text B3 medium color={selectedOption === 'Community name3' ? '#000000' : COLOR.N700} marginLeft={8}>Community name3</Text>
            </StyledRow>

            <StyledRow onClick={() => {
              setSelectedOption('Community name4');
              setSelectedOptionImage(iconExample1);
              setIsToggleOpened(!isToggleOpened);
            }}>
              <Image src={iconExample1} width={24} />
              <Text B3 medium color={selectedOption === 'Community name4' ? '#000000' : COLOR.N700} marginLeft={8}>Community name4</Text>
            </StyledRow>

            <StyledRow onClick={() => {
              setSelectedOption('Community name5');
              setSelectedOptionImage(iconExample2);
              setIsToggleOpened(!isToggleOpened);
            }}>
              <Image src={iconExample2} width={24} />
              <Text B3 medium color={selectedOption === 'Community name5' ? '#000000' : COLOR.N700} marginLeft={8}>Community name5</Text>
            </StyledRow>

            <StyledRow onClick={() => {
              setSelectedOption('Community name6');
              setSelectedOptionImage(iconExample3);
              setIsToggleOpened(!isToggleOpened);
            }}>
              <Image src={iconExample3} width={24} />
              <Text B3 medium color={selectedOption === 'Community name6' ? '#000000' : COLOR.N700} marginLeft={8}>Community name6</Text>
            </StyledRow>
          </ToggleMenu>
        }
      </ToggleButton>

      <WriteBox>
        <NoticeRow>
          <CheckBox />
          <Text B1 medium color={COLOR.N1000} marginLeft={8}>Notice</Text>
        </NoticeRow>

        <TitleInput
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />

        <Row gap={8}>
          <OptionButton on={optionIndex === 0} onClick={() => setOptionIndex(0)}>
            <Image src={alignLeftColorIcon} width={20} />
          </OptionButton>
          <OptionButton on={optionIndex === 1} onClick={() => setOptionIndex(1)}>
            <Image src={alignCenterIcon} width={20} />
          </OptionButton>
          <OptionButton>
            <Image src={imageIcon} width={20} />
          </OptionButton>
          <OptionButton>
            <Image src={youtubeIcon} width={20} />
          </OptionButton>
          <OptionButton>
            <Image src={emojiIcon} width={20} />
          </OptionButton>
        </Row>

        <PostContentInput
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder='Please enter details.'
        />
      </WriteBox>

      <DoneButton>
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
`

const PostContentInput = styled.textarea`
  width: 100%;
  height: 480px;
  padding: 12px;
  background-color:${COLOR.N400};
  border: none;
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
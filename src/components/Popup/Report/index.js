//React
import { useState, useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { AppContext } from 'context/AppContext';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row, FlexBox } from 'components/Flex';

//Api
import { reportContents } from 'apis/Home';

//Assets
import reportIcon from 'assets/icons/report.svg';
import closeIcon from 'assets/icons/close.svg';
import menuDownIcon from 'assets/icons/menu_down.svg';

function ReportPopup() {

  const { state: { loginData } } = useContext(AuthContext);
  const { state: { reportData }, dispatch } = useContext(AppContext);
  const [isToggleOpened, setIsToggleOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Inappropriate contents');
  const [reportContent, setReportContent] = useState('');

  const submitReport = async function () {
    if(!loginData){
      alert('You need to login');
      return;
    }
    if (!reportContent.length) {
      alert('Description field is empty');
      return;
    }

    try {
      await reportContents(loginData.token.access, selectedOption, reportContent, reportData.id, reportData.subject);
      dispatch({ type: 'CLOSE_REPORT_POPUP' });
      alert('The report has been received');
    } catch (error) {
      alert(error);
    }
  };

  function handleReportClose() {
    dispatch({ type: 'CLOSE_REPORT_POPUP' });
  }

  return (
    <PopupContainer>
      <PopupBox>
        <Row>
          <Image src={reportIcon} width={24} />
          <Text H5 bold color={COLOR.N800} marginTop={2} marginLeft={8}>Report</Text>
          <FlexBox />
          <StyledImage src={closeIcon} width={24} onClick={() => handleReportClose()} />
        </Row>

        <ToggleButton onClick={() => setIsToggleOpened(!isToggleOpened)}>
          <Text B1 medium color={COLOR.N700}>{selectedOption}</Text>
          <Image src={menuDownIcon} width={20} />
          {
            isToggleOpened
            && <ToggleMenu>
              <StyledText B1 medium color={selectedOption==='Inappropriate contents'?'#000000':COLOR.N700} onClick={() => {
                setSelectedOption('Inappropriate contents');
                setIsToggleOpened(!isToggleOpened);
              }}>Inappropriate contents</StyledText>
              <StyledText B1 medium color={selectedOption==='False Information'?'#000000':COLOR.N700} onClick={() => {
                setSelectedOption('False Information');
                setIsToggleOpened(!isToggleOpened);
              }}>False Information</StyledText>
              <StyledText B1 medium color={selectedOption==='Scam & Ads'?'#000000':COLOR.N700} onClick={() => {
                setSelectedOption('Scam & Ads');
                setIsToggleOpened(!isToggleOpened);
              }}>Scam & Ads</StyledText>
              <StyledText B1 medium color={selectedOption==='ETC'?'#000000':COLOR.N700} onClick={() => {
                setSelectedOption('ETC');
                setIsToggleOpened(!isToggleOpened);
              }}>ETC</StyledText>
            </ToggleMenu>
          }
        </ToggleButton>

        <ReportContentInput
          value={reportContent}
          onChange={(e) => setReportContent(e.target.value)}
          placeholder='Please enter details.'
        />

        <SubmitButton onClick={()=>submitReport()}>
          <Text H5 bold color={COLOR.N700}>Submit</Text>
        </SubmitButton>
      </PopupBox>
    </PopupContainer>
  )
}

export default ReportPopup

const PopupContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 9999;
`

const PopupBox = styled.div`
  width: 320px;
  padding: 16px;
  background-color: #FFFFFF;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  animation: popup-animation 0.2s ease-in-out;
  @keyframes popup-animation {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const ToggleButton = styled.div`
  margin-top: 16px;
  position: relative;
  width: 100%;
  padding: 9px 6px 9px 12px;
  background-color:${COLOR.N400};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const ToggleMenu = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 11px;
  background-color: #FFFFFF;
  border: 1px solid ${COLOR.N400};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
`;

const ReportContentInput = styled.textarea`
  margin-top: 8px;
  width: 100%;
  height: 285px;
  padding: 12px;
  background-color:${COLOR.N400};
  border-radius: 4px;
  font-size: 14px;
`

const SubmitButton = styled.div`
  margin-top: 16px;
  width: 100%;
  padding: 12px;
  border: 1px solid ${COLOR.N400};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const StyledText = styled(Text)`
  cursor: pointer;
`

const StyledImage = styled(Image)`
  cursor: pointer;
`
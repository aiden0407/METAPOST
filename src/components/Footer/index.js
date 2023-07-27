//React
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

//Components
import { COLOR } from 'constants/design';
import { Text } from 'components/Text';
import { Image } from 'components/Image';
import { Row } from 'components/Flex';

//Assets
import arrowUp from 'assets/icons/arrow_up.svg';
import mail from 'assets/icons/mail.svg';
import mainLogo from 'assets/icons/main_logo.svg';

function Footer() {

    const navigate = useNavigate();

    function handleBackToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    return (
        <FooterWrapper>
            <StyledText B2 medium color={COLOR.N700} onClick={() => navigate('/home')}>Home</StyledText>
            <StyledText B2 medium color={COLOR.N700} marginTop={16} onClick={() => navigate('/notice')}>Notice</StyledText>
            <StyledText B2 medium color={COLOR.N700} marginTop={16} onClick={() => navigate('/suggestion')}>Suggestion</StyledText>
            <StyledText B2 medium color={COLOR.N700} marginTop={16} onClick={() => navigate('/policy')}>Policy</StyledText>
            <StyledText B2 medium color={COLOR.N700} marginTop={16} onClick={() => navigate('/terms')}>Terms of Service</StyledText>
            <StyledText B2 medium color={COLOR.N700} marginTop={16} onClick={() => navigate('/contact')}>Contact</StyledText>

            <BackToTopButton onClick={() => handleBackToTop()}>
                <Image src={arrowUp} width={16} />
                <Text B1 medium color="#FFFFFF" marginLeft={4}>Back to Top</Text>
            </BackToTopButton>

            <StyledRow>
                <Image src={mail} width={30} />
                <Text B2 medium color={COLOR.N700} marginLeft={8}>support@metapost.gg</Text>
            </StyledRow>

            <StyledImage src={mainLogo} width={64} />
        </FooterWrapper>
    )
}

export default Footer

const FooterWrapper = styled.div`
    width: 100%;
    max-width: 640px;
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    position: relative;
`

const StyledText = styled(Text)`
    cursor: pointer;
`

const BackToTopButton = styled.div`
    position: absolute; 
    top: 24px;
    right: 24px;
    width: 132px;
    height: 40px;
    border-radius: 20px;
    background-color: ${COLOR.BLUE2};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const StyledRow = styled(Row)`
    position: absolute; 
    bottom: 24px;
    left: 24px;
    cursor: pointer;
`

const StyledImage = styled(Image)`
    position: absolute; 
    bottom: 24px;
    right: 24px;
`
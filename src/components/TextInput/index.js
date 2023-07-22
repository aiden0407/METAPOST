//Styled Components
import styled from 'styled-components';
import { COLOR, TYPOGRAPHY } from 'constants/design'

export const BorderInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 16px;
  border-radius: 6px;
  background-color: ${COLOR.N400};
  font-size: ${TYPOGRAPHY.H5.SIZE};
  font-weight: 500;
  line-height: 100%;
  margin-top: ${(props) => `${props.marginTop}px`};
  margin-left: ${(props) => `${props.marginLeft}px`};

  &::placeholder {
    color: ${COLOR.N600};
  }
`;
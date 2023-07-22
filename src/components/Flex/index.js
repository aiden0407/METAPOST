//Styled Components
import styled from "styled-components"
import { COLOR } from 'constants/design';

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: ${(props) => `${props.marginTop}px`};
    margin-left: ${(props) => `${props.marginLeft}px`};
    gap: ${(props) => `${props.gap}px`};
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: ${(props) => `${props.marginTop}px`};
    margin-left: ${(props) => `${props.marginLeft}px`};
    gap: ${(props) => `${props.gap}px`};
`;

export const FlexBox = styled.div`
    display: flex;
    flex: 1;
`;

export const DividingLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${COLOR.N600};
  margin-top: ${(props) => `${props.marginTop}px`};
`;

export const RelativeWrapper = styled.div`
  position: relative;
`
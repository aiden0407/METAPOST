//Styled Components
import styled from 'styled-components';
import { TYPOGRAPHY } from 'constants/design';

function fontWeightSelector(bold, medium){
  if(bold) return 'font-weight: 700; line-height: 100%;';    
  if(medium) return 'font-weight: 500; line-height: 100%;';
  return 'font-weight: 400; line-height: 150%;';
}

function fontTypeSelector(H1, H2, H3, H4, H5, B0, B1, B2, B3, B4){
  if(H1) return `font-size: ${TYPOGRAPHY.H1.SIZE};`
  if(H2) return `font-size: ${TYPOGRAPHY.H2.SIZE};`
  if(H3) return `font-size: ${TYPOGRAPHY.H3.SIZE};`
  if(H4) return `font-size: ${TYPOGRAPHY.H4.SIZE};`
  if(H5) return `font-size: ${TYPOGRAPHY.H5.SIZE};`
  if(B0) return `font-size: ${TYPOGRAPHY.B0.SIZE};`
  if(B1) return `font-size: ${TYPOGRAPHY.B1.SIZE};`
  if(B2) return `font-size: ${TYPOGRAPHY.B2.SIZE};`
  if(B3) return `font-size: ${TYPOGRAPHY.B3.SIZE};`
  if(B4) return `font-size: ${TYPOGRAPHY.B4.SIZE};`
}

export const Text = styled.p`
  ${(props) => fontWeightSelector(props.bold, props.medium)}
  ${(props) => fontTypeSelector(props.H1, props.H2, props.H3, props.H4, props.H5, props.B0, props.B1, props.B2, props.B3, props.B4)}
  color: ${(props) => props.color ?? '#000000'};
  margin-top: ${(props) => `${props.marginTop}px`};
  margin-left: ${(props) => `${props.marginLeft}px`};
  ${(props) => props.center && 'text-align: center'}
`;
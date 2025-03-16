import styled from 'styled-components';
import { Theme } from '../../../util/LightTheme';

interface PProps {
  primary: boolean;
  theme: Theme;
  hidden?: boolean;
}

export const StyledP = styled.p`
  color: ${(props: PProps) =>
    props.primary ? props.theme.text.title : props.theme.text.default};

  font-family: ${(props: PProps) => props.theme.font.default};
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
  letter-spacing: -0.15px;
  margin: 0;
    display: flex;
    
    @media (max-width: 1024px) {
        ${(props: PProps) => {
          return props.hidden ? 'display: none;' : '';
        }}
`;

import styled from 'styled-components';

interface HiderWrapperProps {
  isHidden: boolean;
}

export const StyledHiderWrapper = styled.div<HiderWrapperProps>`
    
    @media (min-width: 800px) {
        display: ${(props) => (props.isHidden ? 'none' : 'block')};
    }


`

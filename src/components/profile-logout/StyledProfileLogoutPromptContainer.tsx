import styled from "styled-components";

interface Props {
    margin: string;
}

interface ContainerProps {
    direction: string;
}

export const StyledProfileLogoutPromptContainer = styled.div<ContainerProps>`
    display: flex;
    flex-direction: ${(props) => props.direction};
    @media (max-width: 600px) {
        margin-top: 12px;
        padding: 0;
    }
`
export const StyledLogoutPrompt = styled.div<Props>`
        display: flex;
        position: absolute;
        z-index: 2;
        margin: ${(props) => props.margin};

`

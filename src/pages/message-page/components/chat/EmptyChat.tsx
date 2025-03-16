import styled from 'styled-components';


export const StyledEmptyChat = styled.div<{isHidden?: boolean}>
`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 16px;
    height: 60%;
    
    font-family: ${(props) => props.theme.font.default};
    font-size: 24px;
    text-align: center;
    
    h2 {
        font-weight: 600;
        color: ${(props) => props.theme.text};
        margin-bottom: 0 16px;
    }
    
    div {
        justify-content: center;
        align-items: center;
        max-width: 70%;
    }

    @media (max-width: 600px) {
        display: ${(props) => props.isHidden ? 'none' : 'block'};
    }
`
export default StyledEmptyChat;

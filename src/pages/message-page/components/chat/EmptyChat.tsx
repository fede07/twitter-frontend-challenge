import styled from 'styled-components';


export const StyledEmptyChat = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 16px;
    height: 100%;
    
    font-family: ${(props) => props.theme.font.default};
    font-size: 24px;
    text-align: center;
    
    h2 {
        font-weight: 300;
        color: ${(props) => props.theme.text};
        margin-bottom: 0 16px;
    }
`
export default StyledEmptyChat;

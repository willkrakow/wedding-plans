import styled from "styled-components";
import Button from "../button";

const AccentButton = styled(Button)`
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.muted};
    border: 5px solid ${(props) => props.theme.colors.accent};
    box-sizing: border-box;
`

export default AccentButton;
import styled from "styled-components";

const Input = styled.input`
  border-radius: 0;
  border: 1px solid ${(props) => props.theme.colors.muted};
  padding: ${(props) => props.theme.spacing[2]};
  font-size: ${(props) => props.theme.fontSizes[1]};
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
  accent-color: ${(props) => props.theme.colors.accent};
  margin: ${(props) => props.theme.spacing[2]} 0;
`;


export default Input;
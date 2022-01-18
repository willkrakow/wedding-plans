import styled from 'styled-components'

const UploadForm = styled.form`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem;
`;

const UploadText = styled.span`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

const UploadCaption = styled.textarea`
  margin: 0;
  border: 1px solid ${(props) => props.theme.colors.accent};
  padding: ${(props) => props.theme.spacing[2]};
  font-size: ${(props) => props.theme.fontSizes[1]};
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
  accent-color: ${(props) => props.theme.colors.accent};
  margin-bottom: 1rem;
`;

const CaptionBox = styled.div`
  display: flex;
  flex-direction: column;
`;


export { UploadForm, UploadText, UploadCaption, CaptionBox };
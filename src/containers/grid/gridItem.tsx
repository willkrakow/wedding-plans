import styled from 'styled-components'

interface GridItemProps {
  aspectRatio?: number;
}

export const GridItem = styled.div<GridItemProps>`
  grid-column: span
    ${(props) => (props.aspectRatio && props.aspectRatio > 1.25 ? 2 : 1)};
  grid-row: span 1;
  overflow: hidden;
  height: 100%;
  cursor: pointer;
  transition: all 0.6s ease;
  z-index: 400;
  transition-delay: 1s;
  &:hover {
    overflow: visible;
    transform: scale(1.2);
    z-index: 501;
    box-shadow: 0px ${(props) => props.theme.spacing[3]}
      ${(props) => props.theme.spacing[2]} rgba(10, 10, 10, 0.5);
  }
  @media (max-width: 575px) {
    grid-column: span 1;
  }
`;

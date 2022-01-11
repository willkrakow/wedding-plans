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
  z-index: 400;
  transition-delay: 1s;
  @media (max-width: 575px) {
    grid-column: span 1;
  }
`;

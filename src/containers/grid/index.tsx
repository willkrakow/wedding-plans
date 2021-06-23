import styled, { DefaultTheme } from "styled-components";
import { GridItem } from './gridItem'
import React from 'react'

interface GridProps {
  rowHeight?: number;
  gridGap?: number;
  minColumnWidth?: number;
  autoFlow?: "dense" | "row" | "col";
  mobileCols?: number;
  autoExpand?: boolean;
  theme?: DefaultTheme;
  className?: string;
}


const Grid_: React.FunctionComponent<GridProps> = (props) => (
  <section className={props.className}>{props.children}</section>
);


const Grid = styled(Grid_)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.minColumnWidth || 300}px, 1fr));
  grid-auto-rows: ${props => props.rowHeight || 400};
  grid-auto-flow: ${props => props.autoFlow ? props.autoFlow : "dense"};
  width: 100%;
  position: relative;
  grid-gap: ${(props) => {
        const gap = props.gridGap || 3;
        return props.theme.spacing[gap]}};
  left: 0;
  right: 0;
  max-width: 100vw;
  overflow: hidden;
  @media (max-width: 575px) {
    grid-template-columns: ${props => props.mobileCols ? `repeat(${props.mobileCols}, 1fr)` : "1fr"};
    grid-auto-rows: auto;
  }
`;

export { GridItem }
export default Grid

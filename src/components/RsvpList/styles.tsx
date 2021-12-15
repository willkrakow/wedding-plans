import styled from "styled-components";
import { Row, Col } from "reactstrap";
import { H4 } from "../../components/typography";
import Button from '../../components/button';
interface IFancyInput {
  index?: number;
}

export const FancyInput = styled.input<IFancyInput>`
  font-size: ${(props) => props.theme.fontSizes[1]};
  color: ${(props) => {
    if (!props?.index) return props.theme.colors.text;
    return props?.index % 2 === 0
      ? props.theme.colors.text
      : props.theme.colors.background;
  }};
  font-family: ${(props) => props.theme.fonts.body};
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.muted};
  padding-top: 12px;
  padding-bottom: 15px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 15px;
  width: 100%;
  background-color: ${(props) => {
    if (!props?.index) return props.theme.colors.background;
    return props?.index % 2 === 0
      ? "rgba(0,0,0,0.03)"
      : "rgba(255,255,255,0.03)";
  }};
`;

export const TableHeader = styled(Col)`
  padding-bottom: ${(props) => props.theme.spacing[1]};
`;

export const TableHeaderRow = styled(Row)`
  background-color: ${(props) => props.theme.colors.text};
`;

export const TableHeaderText = styled(H4)`
  color: ${(props) => props.theme.colors.background};
  padding: ${(props) => props.theme.spacing[2]};
  margin: 0;
`;

interface ITableBodyRow {
  index: number;
}

export const TableBodyRow = styled(Row)<ITableBodyRow>`
  background-color: ${(props) =>
    props.index % 2 === 0
      ? props.theme.colors.background
      : props.theme.colors.text};
`;

export const TableBodyCell = styled(Col)`
  padding: ${(props) => props.theme.spacing[2]};
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  display: flex;
  align-items: center;
`;

interface IAgeToggle {
  status: boolean;
  index: number;
}

export const CheckboxCell = styled(TableBodyCell)<IAgeToggle>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
`;

export const AgeToggle = styled.span<IAgeToggle>`
  cursor: pointer;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing[1]};
  border: 1px solid
    ${(props) => {
      if (props.status) {
        return props.theme.colors.accent;
      }
      return props.index % 2 === 0
        ? props.theme.colors.background
        : props.theme.colors.text;
    }};
  text-decoration: ${(props) => (props.status ? "underline" : "none")};
  color: ${(props) =>
    props.index % 2 === 0
      ? props.theme.colors.text
      : props.theme.colors.background};
  font-weight: ${(props) => (props.status ? "bold" : "light")};
  font-family: ${(props) => props.theme.fonts.body};
  background-color: ${(props) =>
    props.status ? props.theme.colors.accent : "transparent"};
  transition: all 0.2s ease-in-out;
  &:hover {
    text-decoration: underline;
  }
`;

interface ITwentyOneToggle {
  active: boolean;
}

export const TwentyOneToggle = styled(Button)<ITwentyOneToggle>`
  border: 1px solid
    ${(props) => (props.active ? props.theme.colors.accent : "transparent")};
  text-decoration: ${(props) => (props.active ? "underline" : "none")};
  color: ${(props) =>
    props.active ? props.theme.colors.background : props.theme.colors.text};
  font-weight: ${(props) => (props.active ? "bold" : "light")};
  font-family: ${(props) => props.theme.fonts.body};
  background-color: ${(props) =>
    props.active ? props.theme.colors.accent : "initial"};
  transition: all 0.2s ease-in-out;
  margin-bottom: 15px;
  &:hover {
    text-decoration: underline;
  }
`;

interface IDeleteCell {
  index: number;
}

export const DeleteCell = styled(TableBodyCell)<IDeleteCell>`
  cursor: pointer;
  text-align: center;
  vertical-align: middle;
  transition: all 0.2s ease-in-out;
  font-size: ${(props) => props.theme.fontSizes[3]};
  display: flex;
  justify-content: center;
  color: ${(props) =>
    props.index % 2 === 0 ? props.theme.colors.text : props.theme.colors.muted};
  &:hover {
    color: ${(props) => props.theme.colors.danger};
  }
`;

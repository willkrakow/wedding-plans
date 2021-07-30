import React from "react";
import styled, { DefaultTheme } from "styled-components";
import { P, H3 } from "../../components/typography";


const ModalControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const ModalItem = styled.div`
  opacity: 1;
  height: auto;
  max-width: 100vw;
  position: relative;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

const ModalGateway = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${(props) => (props.open ? 0 : "100%")};
  overflow: hidden;
  background-color: rgba(10, 10, 10, 0.9);
  background-blend-mode: hard-light;
  opacity: ${(props) => (props.open ? 1.0 : 0.0)};
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 9fr 1fr 3fr;
  transition: all 0.7s ease;
  z-index: 600;
  max-width: 100vw;
  height: ${(props) => (props.open ? "100vh" : 0)};
  height: ${(props) => (props.open ? "-webkit-fill-available" : 0)};
`;

const NextButton = styled.button`
  display: block;
  border: none;
  color: ${(props) => props.theme.colors.alwayslight};
  background: transparent;
  font-size: ${(props) => props.theme.fontSizes[4]};
  transition: all 0.5s ease;
  text-decoration: underline;
  text-decoration-color: transparent;
  text-align: center;
  text-decoration-thickness: ${(props) => props.theme.spacing[1]};
  &:hover {
    text-decoration-color: ${(props) => props.theme.colors.accent};
  }
`;

const PrevButton = styled(NextButton)`
  right: auto;
  left: 0;
`;

const CornerButton = styled(NextButton)<{ open: boolean }>`
  position: absolute;
  top: ${(props) => props.theme.spacing[3]};
  left: ${(props) => props.theme.spacing[3]};
  display: ${(props) => (props.open ? "inherit" : "none")};
  z-index: 601;
`;

const CaptionText = styled(P)`
  color: ${(props) => props.theme.colors.muted};
  text-align: center;
  flex: 0 1 100%;
  font-size: ${(props) => props.theme.fontSizes[1]};
  align-self: flex-end;
  display: block;
`;

const CaptionTitle = styled(H3)`
  color: ${(props) => props.theme.colors.alwayslight};
  text-align: center;
  flex: 0 1 100%;
  font-size: ${(props) => props.theme.fontSizes[2]};
`;

interface CaptionProps {
  theme?: DefaultTheme;
  className?: string;
}

const Caption_: React.FunctionComponent<CaptionProps> = (props) => (
  <div className={props.className}>{props.children}</div>
);

const Caption = styled(Caption_)`
  flex: 0 1 500px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 0 ${(props) => props.theme.spacing[2]};
`;

export {
  ModalControls,
  ModalItem,
  ModalGateway,
  NextButton,
  PrevButton,
  CornerButton,
  CaptionText,
  CaptionTitle,
  Caption,
};

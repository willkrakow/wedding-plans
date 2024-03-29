import React, { useState } from "react";
import styled, { ThemeContext, DefaultTheme } from "styled-components";
import { NavItem } from "../components/typography";
import { WhiteButton } from "../components/button";
import { MenuBarLinkProps } from "./menuBar";
import { globalHistory, HistoryLocation } from "@reach/router";
import { CornerButton } from "../containers/modal/modalComponents";

interface MobileMenuProps {
  menulinks: Array<MenuBarLinkProps>;
}

const MobileDropdown = styled.div`
  @media (min-width: 575px) {
    display: none;
  }
`;

interface MobileDropdownToggleProps {
  isOpen?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  theme?: DefaultTheme;
}

const MobileDropdownToggle_: React.FunctionComponent<MobileDropdownToggleProps> =
  (props) => {
    return (
      <WhiteButton {...props} className={props.className}>
        {props.children}
      </WhiteButton>
    );
  };

const MobileDropdownToggle = styled(MobileDropdownToggle_)`
  background-image: ${(props) =>
    `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='${props.theme.colors.accent}' stroke-linecap='square' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`};
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  text-align: center;
  width: 1.5rem;
  height: 1.5rem;
  transform: rotate(${(props) => (props.isOpen ? "90deg" : "0deg")});
  transition: all 0.4s ease;
  overflow: hidden;
`;

const Dropper = styled.div<{ isOpen: boolean }>`
  transition: all 0.3s ease;
  height: ${(props) => (props.isOpen ? "auto" : "0px")};
  overflow: hidden;
  position: absolute;
  z-index: 999;
  inset: 0;
  padding: ${(props) =>
    props.isOpen
      ? `${props.theme.spacing[4]} ${props.theme.spacing[2]}`
      : "0px"};
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.isOpen ? 1.0 : 0.0)};
  background-color: ${(props) => props.theme.colors.overlap};
  box-shadow: 0px ${(props) => props.theme.spacing[2]}
    ${(props) => props.theme.spacing[2]} rgba(0, 0, 0, 0.2);
`;

interface IDropList {
  isOpen: boolean;
}

const DropList = styled.nav<IDropList>`
  list-style: none;
  display: ${props => props.isOpen ? "flex" : "none"};
  flex-direction: column;
  justify-content: space-between;
  flex: 100%;
  position: fixed;
  top: ${(props) => props.isOpen ? props.theme.spacing[4] : "100%"};
  left: 0;
  right: 0;
  bottom: ${(props) => props.isOpen ? props.theme.spacing[4] : "0px"};
`;

const CloseButton = styled(CornerButton)`
  color: ${(props) => props.theme.colors.accent};
  top: ${(props) => props.theme.spacing[2]};
`;

interface MyRefProps {
  location: HistoryLocation | null;
}

const MobileMenu = ({ menulinks }: MobileMenuProps) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const theme = React.useContext(ThemeContext);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const myRef = React.useRef<MyRefProps>({
    location: null,
  });
  React.useEffect(() => {
    if (!myRef.current.location) {
      myRef.current.location = globalHistory.location;
    } else if (myRef.current.location !== globalHistory.location) {
      myRef.current.location = globalHistory.location;
    }
    
    return globalHistory.listen(({ action }) => {
      if (action === "PUSH") {
        setDropdownOpen(false);
      }
    });
  }, [globalHistory]);

  return (
    <MobileDropdown>
      <MobileDropdownToggle onClick={() => setDropdownOpen(!dropdownOpen)} isOpen={dropdownOpen} />
      <Dropper isOpen={dropdownOpen}>
        <CloseButton open={dropdownOpen} onClick={toggle}>
          &times;
        </CloseButton>
        <DropList isOpen={dropdownOpen}>
          {menulinks.map((link, index) => (
            <NavItem
              className="w-100 text-center"
              key={index}
              to={link.path}
              activeStyle={{
                textDecoration: "underline",
                textDecorationColor: theme.colors.accent,
              }}
            >
              {link.title}
            </NavItem>
          ))}
        </DropList>
      </Dropper>
    </MobileDropdown>
  );
};

export default MobileMenu;

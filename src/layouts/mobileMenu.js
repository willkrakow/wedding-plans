import React, { useState } from 'react';
import styled, { ThemeContext } from 'styled-components'
import { NavItem } from '../components/typography'
import PropTypes from 'prop-types'
import { WhiteButton } from '../components/button';

const MobileDropdown = styled.div`
@media (min-width: 575px){
    display: none;
}
`

const MobileDropdownToggle = styled(WhiteButton)`
background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='${props => props.theme.colors.accent}' stroke-linecap='square' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
background-repeat: no-repeat;
background-position: center;
border: none;
text-align: center;
width: 1.5rem;
height: 1.5rem;
transform: rotate(${props => props.isOpen ? '90deg' : '0deg'});
transition: all 0.4s ease;
`

const Dropper = styled.div`
transition: all 0.3s ease;
height: ${props => props.isOpen ? 'auto' : '0px'};
overflow: hidden;
position: absolute;
z-index: 999;
left: 0;
right: 0;
margin: ${props => props.theme.spacing[2]};
opacity: ${props => props.isOpen ? 1.0 : 0.0};
background-color: ${props => props.theme.colors.overlap};
box-shadow: 0px ${props => props.theme.spacing[2]} ${props => props.theme.spacing[2]} rgba(0,0,0,0.2);
`

const DropList = styled.ul`
list-style: none;
`

const MobileMenu = ({menulinks}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const theme = React.useContext(ThemeContext)
    const toggle = () => setDropdownOpen(prevState => !prevState);

    React.useEffect(() => {
        return setDropdownOpen(false)
    }, [setDropdownOpen])

    return (
        <MobileDropdown>
            <MobileDropdownToggle onClick={toggle} isOpen={dropdownOpen} />
            <Dropper isOpen={dropdownOpen} >
                <DropList>
                {menulinks.map((link, index) => (
                    <NavItem as="li" className="w-100 text-end" key={index} to={link.path} alt={link.title} activeStyle={{ textDecoration: 'underline', textDecorationColor: theme.colors.accent, textDecorationThickness: theme.spacing[1] }} >{link.title}</NavItem>
                ))}
                </DropList>
            </Dropper>
        </MobileDropdown>
    );
}

MobileMenu.propTypes = {
    menulinks: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string,
        title: PropTypes.string,
    })),
    activePage: PropTypes.shape({
        path: PropTypes.string,
        title: PropTypes.string,
    })
}

export default MobileMenu;
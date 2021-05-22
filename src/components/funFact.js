import React, { useState } from 'react';
import { Popover } from 'reactstrap';
import PropTypes from 'prop-types'
import { H4, H5 } from './typography'
import styled from 'styled-components'

const ElementPop = styled(Popover)`
border-radius: 0;
`

const PopInner = styled.div`
padding: ${props => `${props.theme.spacing[1]}${" "}${props.theme.spacing[2]}`};
display: block;
border-radius: 0;
border: ${props => `1px solid ${props.theme.colors.muted}`};
`

const FunFact = ({placement, header, body, ...props}) => {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    const targetRef = React.useRef(null)

    return (
        <React.Fragment>
            <div aria-label="toggle popover" role="button" tabIndex={0} ref={targetRef} onMouseLeave={toggle} onMouseEnter={toggle}>
                {props.children}
            </div>
            <ElementPop popperClassName="border-0" placement={placement} isOpen={popoverOpen} target={targetRef} toggle={toggle}>
                <PopInner as="aside">
                    <H4>{header}</H4>
                    <H5>{body}</H5>
                </PopInner>
            </ElementPop>
        </React.Fragment>
    );
}

FunFact.propTypes = {
    placement: PropTypes.oneOf(["bottom", "top", "left", "right"]),
    header: PropTypes.string,
    body: PropTypes.string,
}

FunFact.defaultProps = {
    placement: "left",
    header: "Fun fact",
    body: "",
}

export default FunFact;
import React, { useState } from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import PropTypes from 'prop-types'

const FunFact = ({placement, header, body, ...props}) => {
    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    const targetRef = React.useRef(null)

    return (
        <React.Fragment>
            <div aria-label="toggle popover" role="button" tabIndex={0} ref={targetRef} onMouseLeave={toggle} onMouseEnter={toggle}>
                {props.children}
            </div>
            <Popover placement={placement} isOpen={popoverOpen} target={targetRef} toggle={toggle}>
                <PopoverHeader>{header}</PopoverHeader>
                <PopoverBody>{body}</PopoverBody>
            </Popover>
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
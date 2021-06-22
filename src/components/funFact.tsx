import React, { useState } from 'react';
import { Popover } from 'reactstrap';
import { H4, P } from './typography'
import styled from 'styled-components'


type Placements = "left" | "right" | "left" | "right";

export interface factProps {
    placement?: Placements,
    header: string,
    body: string,
}


const ElementPop = styled(Popover)`
border-radius: 0;
`

const PopInner = styled.div`
padding: ${props => `${props.theme.spacing[1]}${" "}${props.theme.spacing[2]}`};
display: block;
border-radius: 0;
border: ${props => `1px solid ${props.theme.colors.muted}`};
`

const FunFact: React.FC<factProps> = ({placement = "left", header, body, ...props}) => {
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    const targetRef = React.useRef(null)

    return (
        <React.Fragment>
            <div aria-label="toggle popover" role="button" tabIndex={0} ref={targetRef} onMouseLeave={toggle} onMouseEnter={toggle}>
                {props.children}
            </div>
            <ElementPop popperClassName="border-0" placement={placement} isOpen={popoverOpen} target={targetRef} toggle={toggle}>
                <PopInner as="aside">
                    <H4 centered={true} alwaysdark={false} inline={true} >{header}</H4>
                    <P centered={false} >{body}</P>
                </PopInner>
            </ElementPop>
        </React.Fragment>
    );
}

export default FunFact;
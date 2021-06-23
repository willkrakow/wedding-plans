import React from 'react'
import {
  CaptionTitle,
  CaptionText,
  Caption,
  ModalGateway,
  ModalItem,
  ModalControls,
  PrevButton,
  NextButton,
  CornerButton,
} from "./modalComponents";
import { GatsbyImage } from 'gatsby-plugin-image'
import { makeDateString } from '../../utils'

interface ModalProps {
  handleDecrement: React.MouseEventHandler<HTMLButtonElement>;
  handleIncrement: React.MouseEventHandler<HTMLButtonElement>;
  currentIndex: number;
  open: boolean;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  photos: Array<any>;
  controls?: boolean;
  caption?: boolean;
}

const Modal = ({
  handleDecrement,
  handleIncrement,
  currentIndex,
  open,
  handleClose,
  photos,
  controls,
  caption,
}: ModalProps) => {
  return (
    <ModalGateway open={open}>
      <div>
        <CornerButton onClick={handleClose} open={open}>
          &times;
        </CornerButton>
      </div>
      <ModalItem>
        <GatsbyImage
          imgStyle={{ boxShadow: "0 8px 8px 4px blue" }}
          objectFit="contain"
          image={
            photos[currentIndex].node.localFiles[0].childImageSharp
              .gatsbyImageData
          }
          alt={photos[currentIndex].node.parent.data.title}
        />
      </ModalItem>
      {controls && (
        <ModalControls>
          <PrevButton onClick={handleDecrement}>&larr;</PrevButton>
          <NextButton onClick={handleIncrement}>&rarr;</NextButton>
        </ModalControls>
      )}
      {caption && (
        <Caption>
          <CaptionTitle>
            {photos[currentIndex].node.parent.data.description}
          </CaptionTitle>
          <CaptionText>
            {photos[currentIndex].node.parent.data.date &&
              makeDateString(photos[currentIndex].node.parent.data.date)}
            <br />
            {photos[currentIndex].node.parent.data.location}
          </CaptionText>
        </Caption>
      )}
    </ModalGateway>
  );
};

Modal.defaultProps = {
    caption: true,
    controls: true,
}

export default Modal

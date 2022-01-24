import React from 'react'
import { CaptionBox } from './styles';
import { H4, P } from '../typography';
import Button, { WhiteButton } from "../button";
import { Link } from 'gatsby';


interface SuccessProps {
  image: string;
  caption: string;
  handleNewUpload: () => void;
}

const Success = ({ image, caption, handleNewUpload }: SuccessProps) => (
  <>
    <H4 centered inline alwaysdark={false}>
      Success!
    </H4>
    <CaptionBox>
      <img
        src={image}
        alt="preview"
        style={{ width: "100%", height: "auto" }}
      />
      <P>{caption}</P>
    </CaptionBox>
    <Link to={"/guest_photos"}>
      <Button>View image</Button>
    </Link>
    <WhiteButton onClick={handleNewUpload}>Upload another</WhiteButton>
  </>
);

export default Success
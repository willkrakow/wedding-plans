import React from 'react'
import { UploadCaption, UploadText, CaptionBox } from "./styles";
import Button from "../button";
import { AccentButton } from "../forms";
import { H3 } from "../typography";
import { UploadStatus } from './types'
import { Col } from 'reactstrap'

interface UploadProps {
  handleUpload: (e: React.FormEvent) => void;
  previewImage?: string | null | undefined;
  handleAddImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  caption: string;
  setCaption: (caption: string) => void;
  status: UploadStatus;
}
const Upload = ({
  handleUpload,
  previewImage,
  handleAddImage,
  caption,
  setCaption,
  status,
}: UploadProps) => (
  <form className="row" onSubmit={handleUpload}>
    <Col xs={12} className="my-4">
      <H3 centered>Share your images from the night</H3>
    </Col>
    <Col xs={12} md={6}>
      {previewImage ? (
        <>
          <img
            src={previewImage}
            alt="preview"
            style={{ width: "100%", height: "auto" }}
          />
        </>
      ) : (
        <AccentButton
          style={{ position: "relative", width: "100%", height: "100%" }}
          as={"label"}
          htmlFor={"image"}
        >
          <UploadText>
            <span aria-role="image" aria-label="emoji" style={{ fontSize: "1.5rem", }} >🗳</span>
            Select an image
          </UploadText>
          <input
            style={{
              opacity: "0",
              width: "100%",
              cursor: "pointer",
              height: "100%",
              position: "absolute",
              top: "0",
              left: "0",
            }}
            type="file"
            onChange={handleAddImage}
          />
        </AccentButton>
      )}
    </Col>
    <Col xs={12} md={6}>
      <CaptionBox>
        <UploadCaption
          placeholder="Add a caption"
          rows={3}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <Button
          disabled={status === (UploadStatus.Idle || UploadStatus.Uploading)}
          type="submit"
        >
          Upload
        </Button>
      </CaptionBox>
    </Col>
  </form>
);


export default Upload
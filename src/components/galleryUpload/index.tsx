import React from "react";
import Success from './success'
import Upload from './upload'
import { UploadStatus } from './types'
import Uploading from "./uploading";
import { Link, navigate } from "gatsby";
import Error from "./error";
import { Col, Container, Row } from "reactstrap";
import { WhiteButton } from "../button";

const GalleryUpload = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const [caption, setCaption] = React.useState("");
  const [previewImage, setPreviewImage] = React.useState<
    string | null | undefined
  >(null);
  const [status, setStatus] = React.useState<UploadStatus>(UploadStatus.Idle);

  const encodeImageFileAsURL = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(UploadStatus.Uploading);
    const imageString = await encodeImageFileAsURL(file!);
    const res = await fetch("/.netlify/functions/gallery", {
      method: "POST",
      body: JSON.stringify({
        image: imageString,
        caption,
      }),
    });

    if (!res.ok) {
      setStatus(UploadStatus.Error);
      return;
    }
    setStatus(UploadStatus.Uploaded);
  };

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      setFile(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleNewUpload = () => {
    setFile(null);
    setPreviewImage(null);
    setCaption("");
    setStatus(UploadStatus.Idle);
  };

  const handleCancel = () => {
      handleNewUpload()
      navigate('/gallery')
  }

  return (
    <Container>
      {status === UploadStatus.Idle && (
        <Upload
          handleUpload={handleUpload}
          caption={caption}
          setCaption={setCaption}
          status={status}
          previewImage={previewImage}
          handleAddImage={handleAddImage}
        />
      )}
      {status === UploadStatus.Uploading && <Uploading />}
      {status === UploadStatus.Uploaded && previewImage && (
        <Success
          image={previewImage}
          caption={caption}
          handleNewUpload={handleNewUpload}
        />
      )}
      {status === UploadStatus.Error && (
        <Error
          message="Something went wrong"
          handleNewUpload={handleNewUpload}
          handleCancel={handleCancel}
        />
      )}
      <Row className="justify-content-center my-3">
        <Col xs={12} md={4} lg={3} className="text-center">
          <Link to="/guest_photos" >
            <WhiteButton>View guest photos</WhiteButton>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};


export default GalleryUpload;

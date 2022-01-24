import React from "react";
import { Container, Row, Col } from "reactstrap";
import { H2, H4 } from "../components/typography";
import { WhiteButton } from '../components/button'

type CloudinaryPhoto = {
  asset_id: string;
  public_id: string;
  format: "png" | "jpg" | "jpeg" | "webp";
  version: number;
  resource_type: "image";
  type: "upload";
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  url: string;
  secure_url: string;
};

export default function GuestPhotos() {
  const [photos, setPhotos] = React.useState<CloudinaryPhoto[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [nextCursor, setNextCursor] = React.useState<string | null>(null);

  const fetchPhotos = React.useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      `/.netlify/functions/gallery?${
        nextCursor ? `&next_cursor=${nextCursor}` : ""
      }`
    ).then((res) => res.json());

    setNextCursor(res.data?.next_cursor || null );
    const allPhotos = [...photos, ...res.data.resources];
    setPhotos(allPhotos);
    setLoading(false);
  }, [photos, nextCursor]);

  React.useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Container>
      <H2 centered>Guest photos</H2>
      <Row>
        {photos.map((photo: CloudinaryPhoto) => (
          <Col key={photo.public_id} xs={12} md={4}>
            <img
              style={{ width: "100%", height: "auto" }}
              src={photo.secure_url}
            />
          </Col>
        ))}
        {loading && (
          <Col xs={12}>
            <H4 centered alwaysdark inline>
              Loading...
            </H4>
          </Col>
        )}

        {nextCursor && (
            <Col xs={12}>
                <WhiteButton onClick={fetchPhotos}>Load more</WhiteButton>
            </Col>
        )}
      </Row>
    </Container>
  );
}

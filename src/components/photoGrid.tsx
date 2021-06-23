import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import Modal from "../containers/modal";
import Grid, { GridItem } from "../containers/grid";

const PhotoGrid = (props) => {
  const { options, itemOptions, photos } = props;

  const [open, setOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleClick = (itemIndex: number): void => {
    setOpen(!open);
    setCurrentIndex(itemIndex);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleIncrement = () => {
    if (currentIndex < photos.length - 2) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleDecrement = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(0);
    }
  };

  React.useEffect(() => {
    const handleKeypress = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    const handleNext = (e) => {
      if (e.key === "ArrowRight" && open) {
        handleIncrement();
      }
    };

    const handlePrevious = (e) => {
      if (e.key === "ArrowLeft" && open) {
        handleDecrement();
      }
    };

    document.addEventListener("keydown", handleKeypress);
    document.addEventListener("keydown", handleNext);
    document.addEventListener("keydown", handlePrevious);
    return () => {
      document.removeEventListener("keydown", handleKeypress);
      document.removeEventListener("keydown", handleNext);
      document.removeEventListener("keydown", handlePrevious);
    };
  });

  return (
    <React.Fragment>
      <Grid {...options}>
        {photos.map((photo, index) => (
          <GridItem
            aspectRatio={
              photo.node.localFiles[0].childImageSharp.resize.aspectRatio
            }
            {...itemOptions}
            key={index}
            index={index}
            onClick={() => handleClick(index)}
          >
            <GatsbyImage
              style={{ maxWidth: "100%", height: "100%" }}
              image={photo.node.localFiles[0].childImageSharp.gatsbyImageData}
              alt={photo.node.parent.data.title}
            />
          </GridItem>
        ))}
      </Grid>
      <Modal
        open={open}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        currentIndex={currentIndex}
        handleClose={handleClose}
        photos={photos}
        caption
        controls
      />
    </React.Fragment>
  );
};

PhotoGrid.defaultProps = {
  options: {
    columns: 5,
    rowGap: "8px",
    columnGap: "8px",
    rowHeight: "400px",
  },
  itemOptions: {
    minWidth: 200,
    maxWidth: 400,
  },
};

export default PhotoGrid;

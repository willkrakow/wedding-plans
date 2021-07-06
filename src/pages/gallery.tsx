import React from "react";
import { graphql, PageProps } from "gatsby";
import { H2 } from "../components/typography";
import PhotoGrid from "../components/photoGrid";


interface GalleryProps extends PageProps {
  data: {
    allAirtable: {
      edges: Array<{
        node: {
          data: {
            date: string;
            title: string;
            description: string;
            location: string;
            src: {
              id: string;
              localFiles: Array<{
                childImageSharp: {
                  gatsbyImageData: any;
                  resize: any;
                };
              }>;
            };
          };
        };
      }>;
    };
  };
}

const Gallery = ({ data }: GalleryProps) => {
  const photoData = data.allAirtable.edges;

  return (
    <>
      <H2 centered>Gallery</H2>
      <PhotoGrid photos={photoData} />
    </>
  );
};
export const query = graphql`
  {
    allAirtable(
      filter: {
        table: { eq: "Photos" }
        data: {
          src: {
            localFiles: {
              elemMatch: {
                 id: { 
                   ne: null
                 }
              }
            }
          }
        }
      }
    ) {
      edges {
        node {
          data {
            src {
              id
              localFiles {
                childImageSharp {
                  gatsbyImageData
                  resize {
                    aspectRatio
                  }
                }
              }
            }
            date
            title
            description
            location
          }
        }
      }
    }
  }
`;

export default Gallery;

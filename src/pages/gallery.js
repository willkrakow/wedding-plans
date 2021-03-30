import React from "react";
import Gallery from "react-photo-gallery";
import { graphql } from "gatsby";
import Layout from '../components/layout';

const PhotoGallery = ({ data }) => {
  const { allAirtable } = data;

  const photos = allAirtable.edges.map((edge, index) => ({
    height: 1,
    key: `${index}`,
    width: edge.node.data.src.localFiles[0].childImageSharp.fluid.aspectRatio,
    src: `${edge.node.data.src.localFiles[0].childImageSharp.fluid.src}`,
    srcSet: `${edge.node.data.src.localFiles[0].childImageSharp.fluid.srcSet}`,
    alt: `${edge.node.data.title} – ${edge.node.data.location} – ${edge.node.data.description}. ${edge.node.data.date}`,
  }));

  return (
    <Layout
      metatitle="Gallery"
      bannerimage="https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    >
      <Gallery photos={photos} />
    </Layout>
  );
};

export default PhotoGallery;

export const query = graphql`
  {
    allAirtable(filter: { table: { eq: "Photos" } }) {
      edges {
        node {
          data {
            src {
              localFiles {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                    aspectRatio
                  }
                }
              }
            }
            location
            date
            description
            title
          }
        }
      }
    }
  }
`;

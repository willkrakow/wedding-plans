import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";


interface SeoProps {
  title: string,
  description: string,
}

const Seo = ({ title, description }: SeoProps) => {
  const { pathname } = useLocation();
  const { site }: SiteProps = useStaticQuery(query);
  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${siteUrl}${pathname}`,
  };
  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
      <meta name="description" content={seo.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {seo.url && <meta property="og:url" content={seo.url} />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      <script
        type="text/javascript"
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      ></script>
    </Helmet>
  );
};

interface SiteProps {
  site: {
    siteMetadata: {
      defaultTitle: string,
      titleTemplate: string,
      defaultDescription: string,
      siteUrl: string,
    }
  }
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
Seo.defaultProps = {
  title: null,
  description: null,
};
const query: void = graphql`
  query Seo {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
        defaultDescription: description
        siteUrl: url
      }
    }
  }
`;

export default Seo;


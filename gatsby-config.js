require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Our Wedding",
    titleTemplate: "%s · Laura Gale Campbell and William Tompkins Krakow",
    url: "https://campbellkrakow.com/",
    description:
      "The official wedding site of Laura Gale and William. Thanks for all your love and support.",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-VJCD2KNJE4",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-transition-link",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Our Wedding · Laura Gale Campbell and William Tompkins Krakow",
        short_name: "LGC + WTK",
        description:
          "The official wedding site of Laura Gale and William. Thanks for all your love and support.",
        icon: "src/images/icon.png",
        background_color: "#fafcfe",
        theme_color: "#fafcfe",
        display: "browser",
        start_url: "/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Guests`,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Home`,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `About`,
          },
        ],
      },
    },
  ],
};

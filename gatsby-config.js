require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Our Wedding",
    titleTemplate: "%s | Laura Gale Campbell and William Tompkins Krakow",
    url: "https://campbellkrakow.com/",
    description:
      "The official wedding site of Laura Gale and William. Thanks for all your love and support.",
    image: `/images/icon.png`,
    menuLinks: [
      {
        title: "Home",
        path: "/"
      },
      {
        title: "RSVP",
        path: "/rsvp"
      },
      {
        title: "Honeymoon",
        path: "/honeymoon"
      },
      {
        title: "About Us",
        path: "/about"
      },
      {
        title: "Gallery",
        path: "/gallery"
      },
      {
        title: "FAQs",
        path: "/faqs"
      },
      {
        title: "Lodging",
        path: "/lodging"
      },
      {
        title: "Registry",
        path: "/registry"
      },
      {
        title: "Schedule",
        path: "/schedule"
      },
    ]
  },
  plugins: [
    `gatsby-plugin-image`,
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
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
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 3,
        separateMapType: true,
        tables: [
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Home`,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `About`,
            mapping: {'image': 'fileNode'},
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Photos`,
            mapping: { 'src': "fileNode" },
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `schedule`,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `faqs`,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `lodging`,
            mapping: {
              'image': "fileNode"
            },
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `honeymoon`,
            mapping: {
              'image': "fileNode",
            },
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `wedding_party`,
            mapping: {
              'image': "fileNode",
            },
          },
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    `gatsby-plugin-layout`,
    `gatsby-plugin-typescript`,
  ],
};

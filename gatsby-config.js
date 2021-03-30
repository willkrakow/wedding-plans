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
            tableName: `guest_list`,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Home`,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `About`,
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `Photos`,
            mapping: { "src": "fileNode" },
          },
          {
            baseId: process.env.AIRTABLE_BASE_ID,
            tableName: `registry`,
          }
        ],
      },
    },
      {
			resolve: 'gatsby-plugin-snipcart',
			options: {
        apiKey: process.env.SNIPCART_PUBLIC_KEY,
        autoPop: true,
			},
    },
  ],
};

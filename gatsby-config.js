module.exports = {
	siteMetadata: {
		title: "UK Freeforms Online Gaming Guide",
		description: "A guide to online LARPS using Discord with the UK Freeforms Community",
		author: "@dorward",
	},
	plugins: [
		"gatsby-plugin-react-helmet",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "images",
				path: `${__dirname}/src/images`,
			},
		},
		"gatsby-transformer-sharp",
		"gatsby-plugin-sharp",
		{
			resolve: "gatsby-source-filesystem",
			options: {
				name: "markdown-pages",
				path: `${__dirname}/src/markdown-pages`,
			},
		},
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					{
						resolve: "gatsby-remark-images",
						options: {
							// It's important to specify the maxWidth (in pixels) of
							// the content container as this plugin uses this as the
							// base for generating different widths of each image.
							maxWidth: 590,
						},
					},
					{
						resolve: "gatsby-remark-external-links",
						options: {
							target: "_blank",
							rel: "noreferrer noopener"
						}
					}
				],
			},
		},
		"gatsby-plugin-catch-links",
		{
			resolve: "gatsby-plugin-s3",
			options: {
				bucketName: "online.freeforming.uk",
				protocol: "https",
				hostname: "online.freeforming.uk",

			},
		},
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: "UK Freeforms Online Gaming Guide",
				short_name: "freeforms-online",
				start_url: "/",
				background_color: "#663399",
				theme_color: "#663399",
				display: "minimal-ui",
				icon: "src/images/gatsby-icon.png", // This path is relative to the root of the site.
			},
		},
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		"gatsby-plugin-offline",
	],
};

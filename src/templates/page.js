import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { graphql } from "gatsby";

export default function Template({
	data, // this prop will be injected by the GraphQL query below.
}) {
	const { markdownRemark } = data; // data.markdownRemark holds your post data
	const { frontmatter, html } = markdownRemark;

	return (<Layout>
		<SEO title={frontmatter.title} />
		<h1>{frontmatter.title}</h1>
		<div
			className="markdown-content"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	</Layout>
	);

}
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`;

import React from "react";
import { StaticQuery, Link } from "gatsby";
import { graphql } from "gatsby";

const findSection = (root, pathSegments) => {
	const path = pathSegments.shift();
	if (pathSegments.length) {
		const found = root.find(element => element.about && element.about.segment === path);
		return findSection(found, pathSegments);
	}
	return root.pages || root;
};

const makeMenu = section => {
	const elements = [];

	section.forEach(page => {
		if (page.about) {
			const items = makeMenu(page.pages);
			elements.push(<li key={page.about.id}>
				<strong>{page.about.title}</strong>
				{items}
			</li>);
		} else {
			elements.push(<li key={page.id}><Link to={page.slug}>{page.title}</Link></li>);
		}
	});

	return <ul>{elements}</ul>;
};

const makePages = (edges) => {
	const pages = [];
	const pages_x = [];
	edges.forEach(edge => {
		const id = edge.node.id;
		const slug = edge.node.frontmatter.slug;
		const title = edge.node.frontmatter.title;
		const section = edge.node.frontmatter.section;
		const fileAbsolutePath = edge.node.fileAbsolutePath;
		const relativePath = fileAbsolutePath.replace(/^.*\/markdown-pages\//, "");
		const pathSegments = relativePath.split("/");
		const about = {id, slug, title, segment: pathSegments[pathSegments.length-1].replace(/\.md$/, "") };
		const mySection = findSection(pages, [...pathSegments]);
		if (section) {
			mySection.push({ about, pages: [] });
		} else {
			mySection.push(about);
		}
	});
	console.log({pages});
	return makeMenu(pages);

};

const MyMenu = ({
	data: {
		allMarkdownRemark: { edges },
	},
}) => {
	return (
		<ul>{makePages(edges)}</ul>
	);
};

const Menu = (props) => (
	<StaticQuery
		query={graphql`
        query {
            allMarkdownRemark(sort: {fields: fileAbsolutePath}) {
              edges {
                node {
                  id
                  fileAbsolutePath
                  excerpt(pruneLength: 250)
                  frontmatter {
                    slug
                    title
                    section
                  }
                }
              }
            }
          }
      `}
		render={data => <MyMenu data={data} {...props} />}
	/>
);

export default Menu;
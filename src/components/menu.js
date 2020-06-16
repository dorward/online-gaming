import React, { useEffect, useState } from "react";
import { StaticQuery, Link } from "gatsby";
import { graphql } from "gatsby";

const findSection = (root, pathSegments) => {
	const path = pathSegments.shift();
	if (pathSegments.length) {
		const found = root.find(element => element.about && element.about.segment === path);
		return findSection(found.pages, pathSegments);
	}
	return root.pages || root;
};

const makeMenu = (section, hidden) => {
	const elements = [];

	section.forEach(page => {
		if (page.about) {
			const items = makeMenu(page.pages);
			elements.push(<li key={page.about.id}>
				<Link to={page.about.slug}>{page.about.title}</Link>
				{items}
			</li>);
		} else {
			elements.push(<li key={page.id}><Link to={page.slug}>{page.title}</Link></li>);
		}
	});
	return <ul hidden={hidden}>{elements}</ul>;
};

const makePages = (edges, hidden) => {
	const pages = [{ id: 0, slug: "/", title: "Welcome", segment: "/" }];
	edges.forEach(edge => {
		const id = edge.node.id;
		const slug = edge.node.frontmatter.slug;
		const title = edge.node.frontmatter.title;
		const section = edge.node.frontmatter.section;
		const fileAbsolutePath = edge.node.fileAbsolutePath;
		const relativePath = fileAbsolutePath.replace(/^.*\/markdown-pages\//, "");
		const pathSegments = relativePath.split("/");
		const about = { id, slug, title, segment: pathSegments[pathSegments.length - 1].replace(/\.md$/, "") };
		const mySection = findSection(pages, [...pathSegments]);
		if (section) {
			mySection.push({ about, pages: [] });
		} else {
			mySection.push(about);
		}
	});
	return makeMenu(pages, hidden);
};

const MyMenu = ({
	hidden,
	data: {
		allMarkdownRemark: { edges },
	},
}) => {
	const {width} = useWindowSize();
	const addHiddenAttribute = (typeof width !== "undefined") && width <= 750 && hidden;
	return makePages(edges, addHiddenAttribute);
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

function useWindowSize() {
	const isClient = typeof window === "object";

	function getSize() {
		return {
			width: isClient ? window.innerWidth : undefined,
			height: isClient ? window.innerHeight : undefined
		};
	}

	const [windowSize, setWindowSize] = useState(getSize);

	useEffect(() => {
		if (!isClient) {
			return false;
		}

		function handleResize() {
			setWindowSize(getSize());
		}

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []); // Empty array ensures that effect is only run on mount and unmount

	return windowSize;
}

export default Menu;
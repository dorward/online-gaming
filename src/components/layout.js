/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import Menu from "./menu";

import "./layout.css";

const Layout = ({ children }) => {
	const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

	return (
		<div className="wrapper">
			<Header siteTitle={data.site.siteMetadata.title} />
			<div className="container">
				<nav><Menu /></nav>
				<main>{children}</main>
			</div>
			<footer>
				© {new Date().getFullYear()}, UK Freeforms
			</footer>
			
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;

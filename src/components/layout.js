/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "./header";
import Menu from "./menu";

import "../../node_modules/hamburgers/dist/hamburgers.min.css";
import "./layout.css";

const Layout = ({ children }) => {
	const data = useStaticQuery(
		graphql`
    		query SiteTitleQuery {
      			site {
        			siteMetadata {
          			title
				}
      		}
		}`
	);

	const [menuOpen, setMenuOpen] = useState(false);
	const menuClasses = ["hamburger", "hamburger--collapse"];
	if (menuOpen) {
		menuClasses.push("is-active");
	}
	return (
		<div className="wrapper">
			<Header siteTitle={data.site.siteMetadata.title} />
			<div className="container">
				<nav>
					<button className={menuClasses.join(" ")} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu">
						<span className="hamburger-box">
							<span className="hamburger-inner"></span>
						</span>
					</button>
					<Menu hidden={!menuOpen} />
				</nav>
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

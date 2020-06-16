import React from "react";
// import { Link } from "gatsby";

import Layout from "../components/layout";
// import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = () => {
	return (
		<Layout>
			<SEO title="Home" />
			<p>2020 has brought many challenges to our lives and to our hobby. We can't gather in person to play the games we love, so perhaps the next best thing is to meet up virtually using video and voice chat over the Internet.</p>
			<p>This guide is designed to help you take part in these games using the methods that the UK Freeforms committee have decided to use.</p>
			<p>Running and playing freeform LARPS is still a new practice to most of us, our approaches and this guide may well change as we learn.</p>
			<p>There will be rough patches as technology is imperfect and we are still learning, so please practice kindness and patience even more than usual.</p>
		</Layout>
	);
};

export default IndexPage;


{/* <h1>Hi people</h1>
<p>Welcome to your new Gatsby site.</p>
<p>Now go build something great.</p>
<div style={{ maxWidth: "300px", marginBottom: "1.45rem" }}>
	<Image />
</div>
<Link to="/page-2/">Go to page 2</Link> <br />
<Link to="/using-typescript/">Go to "Using TypeScript"</Link> */}

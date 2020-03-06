import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Need help figure out which Electric Vehicle meets you neds?</p>
    <p>You've come to the right place!</p>
    <Link to="/quiz/">Take the quiz</Link>
    <br />
    <Link to="/cars-table/">Go to cars table</Link>
  </Layout>
)

export default IndexPage

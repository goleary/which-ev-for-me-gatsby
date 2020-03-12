import React from "react"
import PropTypes from "prop-types"
import withLocation from "../hocs/withLocation"

const CustomQueryStringComponent = ({ search }) => {
  const { custom, test } = search
  return (
    <React.Fragment>
      <p>Custom Value: {custom}</p>
      <p>test Value: {test}</p>
    </React.Fragment>
  )
}

CustomQueryStringComponent.propTypes = {
  search: PropTypes.object,
}

export default withLocation(CustomQueryStringComponent)

import React, { useMemo, useState } from "react"

import { graphql } from "gatsby"

import PropTypes from "prop-types"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Typography from "@material-ui/core/Typography"
import Slider from "@material-ui/core/Slider"
import { makeStyles, useTheme } from "@material-ui/core/styles"

import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import SpeedIcon from "@material-ui/icons/Speed"

import clsx from "clsx"

import Layout from "../../components/layout"

import { formatPrice, formatRange } from "../../utils"

import CarsTable from "./_CarsTable"
import withLocation from "../../hocs/withLocation"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    padding: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth + 1,
  },
  content: {
    flexGrow: 1,
  },
  filterItem: {
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  filterHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    "& p": {
      paddingLeft: "4px",
    },
  },
  filterValue: {
    fontWeight: "bold",
    flexGrow: 1,
    textAlign: "right",
  },
  inactive: {
    color: "darkgray",
    fontWeight: "faint",
  },
}))

function CarsTablePage({ data, search }) {
  console.log("search:", JSON.stringify(search))
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [minRangeMi, setMinRangeMi] = useState(parseInt(search.minRange) | 0)
  const [maxPriceUsd, setMaxPriceUsd] = useState(parseInt(search.maxPrice) | 0)
  const [minSeats, setMinSeats] = useState(parseInt(search.minSeats) | 0)
  const MIN_RANGE_LIMIT = 500
  const MIN_RANGE_STEP = 10
  const MAX_PRICE_LIMIT = 100000
  const MAX_PRICE_STEP = 5000
  const MIN_SEATS_LIMIT = 6

  const rows = data.allAirtable.edges.map(edge => edge.node.data)
  const filteredRows = useMemo(
    () =>
      rows.filter(row => {
        if (row.rangeMi < minRangeMi) return false
        if (maxPriceUsd !== 0 && row.priceUsd > maxPriceUsd) return false
        if (row.seats < minSeats) return false
        return true
      }),
    [minRangeMi, maxPriceUsd, minSeats, rows]
  )

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div className={classes.drawer}>
      <Typography id="filters" gutterBottom>
        Filters
      </Typography>
      <Divider />
      <List>
        <ListItem className={classes.filterItem}>
          <div className={classes.filterHeader}>
            <SpeedIcon />
            <Typography id="min-range-slider" gutterBottom>
              Min Range
            </Typography>
            <Typography className={classes.filterValue} gutterBottom>
              {formatRange(minRangeMi)}
            </Typography>
          </div>
          <Slider
            value={minRangeMi}
            onChange={(event, newValue) => setMinRangeMi(newValue)}
            max={MIN_RANGE_LIMIT}
            step={MIN_RANGE_STEP}
            aria-labelledby="min-range-slider"
          />
        </ListItem>
        <ListItem className={classes.filterItem}>
          <div className={classes.filterHeader}>
            <AttachMoneyIcon />
            <Typography id="max-price-slider" gutterBottom>
              Max Price
            </Typography>
            <Typography
              className={clsx(
                classes.filterValue,
                maxPriceUsd === 0 ? classes.inactive : null
              )}
              gutterBottom
            >
              {formatPrice(maxPriceUsd)}
            </Typography>
          </div>
          <Slider
            value={maxPriceUsd}
            onChange={(event, newValue) => setMaxPriceUsd(newValue)}
            max={MAX_PRICE_LIMIT}
            step={MAX_PRICE_STEP}
            aria-labelledby="max-price-slider"
          />
        </ListItem>
        <ListItem className={classes.filterItem}>
          <div className={classes.filterHeader}>
            <AirlineSeatReclineNormalIcon />
            <Typography id="min-range-slider" gutterBottom>
              Min Seats
            </Typography>
            <Typography className={classes.filterValue} gutterBottom>
              {minSeats}
            </Typography>
          </div>
          <Slider
            value={minSeats}
            onChange={(event, newValue) => setMinSeats(newValue)}
            max={MIN_SEATS_LIMIT}
            aria-labelledby="min-seats-slider"
          />
        </ListItem>
      </List>
    </div>
  )

  return (
    <Layout drawer={drawer}>
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <CarsTable rows={filteredRows} />
        </main>
      </div>
    </Layout>
  )
}

CarsTablePage.propTypes = {
  data: PropTypes.any,
}

export default withLocation(CarsTablePage)

export const query = graphql`
  {
    allAirtable {
      edges {
        node {
          data {
            brand
            model
            priceGbp
            priceUsd
            awd
            rangeMi
            seats
          }
        }
      }
    }
  }
`

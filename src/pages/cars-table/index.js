import React, { useEffect, useState } from "react"

import { graphql } from "gatsby"

import PropTypes from "prop-types"
import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import MenuIcon from "@material-ui/icons/Menu"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Slider from "@material-ui/core/Slider"
import { makeStyles, useTheme } from "@material-ui/core/styles"

import clsx from "clsx"

import { formatPrice, formatRange } from "../../utils"

import CarsTable from "./cars-table"

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
    paddingTop: "80px",
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
  },
  filterValue: {
    fontWeight: "bold",
  },
  inactive: {
    color: "darkgray",
    fontWeight: "faint",
  },
}))

function CarsTablePage({ data, container }) {
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [minRangeMi, setMinRangeMi] = useState(0)
  const [maxPriceUsd, setMaxPriceUsd] = useState(0)
  const [minSeats, setMinSeats] = useState(0)

  const [filteredRows, setFilteredRows] = useState([])

  const MIN_RANGE_LIMIT = 500
  const MIN_RANGE_STEP = 10
  const MAX_PRICE_LIMIT = 100000
  const MAX_PRICE_STEP = 5000

  const MIN_SEATS_LIMIT = 6

  const rows = data.allAirtable.edges.map(edge => edge.node.data)

  useEffect(() => {
    setFilteredRows(
      rows.filter(row => {
        if (row.rangeMi < minRangeMi) return false
        if (maxPriceUsd !== 0 && row.priceUsd > maxPriceUsd) return false
        if (row.seats < minSeats) return false
        return true
      })
    )
  }, [minRangeMi, maxPriceUsd, minSeats])

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
            <Typography id="min-range-slider" gutterBottom>
              Min Range (mi)
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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Which EV for Me?
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <CarsTable rows={filteredRows} />
      </main>
    </div>
  )
}

CarsTablePage.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.any,
  data: PropTypes.any,
}

export default CarsTablePage

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

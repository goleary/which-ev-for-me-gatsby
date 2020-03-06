import React, { useMemo, useState } from "react"

import { graphql } from "gatsby"
import { Link } from "gatsby"

import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import Drawer from "@material-ui/core/Drawer"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { makeStyles, useTheme } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    padding: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      width: props => props.drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: props => `calc(100% - ${props.drawerWidth}px)`,
      marginLeft: props => props.drawerWidth,
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
    width: props => props.drawerWidth + 1,
  },
  content: {
    flexGrow: 1,
    paddingTop: "80px",
  },
  navButton: {
    textDecoration: "none",
    color: "white",
  },
}))

const NavLink = ({ to, style, children }) => (
  <Link
    to={to}
    style={{
      ...style,
      color: `white`,
      textDecoration: `none`,
    }}
  >
    {children}
  </Link>
)

export default function Header({ siteTitle, drawer }) {
  const classes = useStyles({ drawerWidth: drawer ? 240 : 0 })
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <React.Fragment>
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
          <NavLink to="/" style={{ margin: 0, flexGrow: 1 }}>
            <Typography variant="h6">{siteTitle}</Typography>
          </NavLink>
          <NavLink to="/quiz">
            <Button className={classes.navButton}>Quiz</Button>
          </NavLink>
          <NavLink to="/cars-table">
            <Button className={classes.navButton}>Cars</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
      {drawer ? (
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
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
      ) : null}
    </React.Fragment>
  )
}

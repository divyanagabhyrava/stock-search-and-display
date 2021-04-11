import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles'
import React, { useState, useEffect } from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import {Link} from "react-router-dom"
import logo from '../assets/logo.jpg'

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  const useStyles = makeStyles(theme => ({
      toolbarMargin: {
          ...theme.mixins.toolbar,
          marginBotton: "3em"
      },
      logo: {
          height:"4em"
      },
      tabContainer: {
          marginLeft: "auto"
      },
      logoContainer: {
          padding: 0,
          width: 300,
          "&:hover": {
              backgroundColor: "transparent"
          }
      }
  }))
export default function Header(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (e, value) => {
        setValue(value)
    }

    useEffect(() => {
        if (window.location.pathname === "/" && value !== 0) {
            setValue(0)
        } else if (window.location.pathname === "/home" && value !== 1) {
            setValue(1)
        } else if (window.location.pathname === "/watchList" && value !== 2) {
            setValue(2)
        } 
    }, [value])

    return (
        <React.Fragment> 
        <ElevationScroll>
        <AppBar color="primary">
            <Toolbar disableGutters>
                <Button className={classes.logoContainer} component={Link} to="/" onClick={() => setValue(0)} disableRipple>
                <img alt="company logo" className={classes.logo} src={logo} />
                </Button>
                <Tabs value={value} onChange={handleChange} className={classes.tabContainer}>
                    <Tab className={classes.tab} component={Link} to="/" label="Home" />
                    <Tab component={Link} to="/watchList" label="Watch List" />
                </Tabs>
            </Toolbar>
        </AppBar>
        </ElevationScroll>
        <div className={classes.toolbarMargin} />
        </React.Fragment>
    );
}
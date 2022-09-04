// @ts-nocheck
import React, { useState } from 'react'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import {
  fade,
  makeStyles,
  Theme,
  createStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Hidden,
  Container,
  MenuItem,
} from '@material-ui/core'
import {
  Menu as MenuIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@material-ui/icons'
import { grey } from '@material-ui/core/colors'
import { NavMenu, NavItem } from '@mui-treasury/components/menu/navigation'
import { useLineNavigationMenuStyles } from '@mui-treasury/styles/navigationMenu/line'

import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks'
import HoverMenu from 'material-ui-popup-state/HoverMenu'

import * as uiActions from 'modules/ui/actions'

import NavDrawer from './NavDrawer'

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: process.env.REACT_APP_PRIMARY_COLOR_HEX,
    },
  },
  typography: {
    fontFamily: ['Prompt', 'sans-serif'].join(','),
  },
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selected: {
      borderLeft: `6px solid ${theme.palette.primary.main} !important`,
    },
    dropdownMenu: {
      borderLeft: `6px solid transparent`,
    },
    grow: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'saturate(180%) blur(20px)',
      boxShadow: 'rgb(0 0 0 / 15%) 0px 0px 10px',
      [theme.breakpoints.up('sm')]: {
        zIndex: theme.zIndex.drawer + 1,
      },
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    title: {
      display: 'none',
      marginRight: theme.spacing(4),
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      '&:hover': {
        cursor: 'pointer',
      },
    },
    logo: {
      display: 'block',
      maxWidth: 140,
      marginRight: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        maxWidth: 130,
      },
      '&:hover': {
        cursor: 'pointer',
      },
    },
    link: {
      textDecoration: 'none !important',
    },
    search: {
      position: 'relative',
      backgroundColor: fade(theme.palette.common.white, 0.9),
      borderRadius: theme.shape.borderRadius,
      width: '100%',
    },
    searchIcon: {
      color: grey[400],
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: theme.palette.text.primary,
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      paddingRight: `calc(3em)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.grey[300]}`,
      '&:hover': {
        border: `1px solid ${theme.palette.grey[400]}`,
      },
      '&:focus': {
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      backgroundColor: grey[700],
    },
    loggedIn: {
      color: theme.palette.common.white,
      width: theme.spacing(4),
      height: theme.spacing(4),
      backgroundColor: process.env.REACT_APP_TERTIARY_COLOR_HEX,
    },
    noDecorationLink: {
      textDecoration: 'none',
    },
    navMenu: {
      minWidth: '270px',
    },
    navItem: {
      color: theme.palette.text.primary,
    },
    navItemActive: {
      color: theme.palette.primary.main,
    },
    badge: {
      zIndex: 10,
    },
    divider: {
      width: 2,
      height: 32,
      margin: theme.spacing(2),
      backgroundColor: '#A7A8AB',
    },
    bold: {
      fontWeight: 600,
    },
    topScrollPaper: {
      alignItems: 'flex-start',
    },
    topPaperScrollBody: {
      verticalAlign: 'top',
    },
  })
)

interface NavigationBarProps {
  active: number
  setActivePage: (id: number) => void
}

export default function NavBar(props: NavigationBarProps) {
  const classes = useStyles()
  const history = useHistory()
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const PATH = process.env.REACT_APP_BASE_PATH

  const LogoImage = require('assets/images/logo.png')

  const [mobileOpen, setMobileOpen] = useState(false)

  const navigationItem = [
    {
      id: 0,
      title: 'หน้าหลัก',
      url: `${PATH}`,
      notification: 0,
    },
    {
      id: 1,
      title: 'ค้นหาการรับรองคุณวุฒิหลักสูตร',
      url: `${PATH}/search/curriculum`,
      notification: 0,
    },
    {
      id: 2,
      title: 'สถาบันการศึกษาในต่างประเทศ',
      url: `${PATH}/edu/international`,
      notification: 0,
    },
    {
      id: 3,
      title: 'เอกสารดาวน์โหลด/หนังสือเวียน',
      url: `${PATH}/download`,
      notification: 0,
    },
    {
      id: 4,
      title: 'คำถามที่พบบ่อย',
      url: `${PATH}/faq`,
      notification: 0,
    },
  ]

  const isUserCurrentlyInLearn = pathname.includes(`${PATH}/learn/courses`)

  const linkToHome = () => {
    if (!isUserCurrentlyInLearn) {
      history.push(`${PATH}`)
    } else {
      dispatch(uiActions.setLearnExitDialog(true))
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu',
  })

  const popupState2 = usePopupState({
    variant: 'popover',
    popupId: 'demoMenu2',
  })

  return (
    <div className={classes.grow}>
      <AppBar position='fixed' className={classes.appBar} elevation={0}>
        <Container maxWidth='lg'>
          <Toolbar>
            {/* DRAWER TOGGLE */}
            <Hidden smUp implementation='css'>
              <IconButton
                edge='start'
                color='primary'
                className={classes.menuButton}
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            {/* SITE LOGO */}
            <img
              src={LogoImage}
              alt='OCSC Logo'
              className={classes.logo}
              onClick={linkToHome}
              style={{ filter: 'saturate(1.3)' }}
            />
            <div className={classes.grow} />
            {/* FULL DESKTOP NAVIGATION */}
            <Hidden mdDown implementation='css'>
              <ThemeProvider theme={darkTheme}>
                <NavMenu
                  useStyles={useLineNavigationMenuStyles}
                  color='inherit'
                  className={classes.navMenu}
                >
                  {navigationItem.map((item) => (
                    <NavItem
                      active={props.active === item.id}
                      className={
                        props.active === item.id
                          ? classes.navItemActive
                          : classes.navItem
                      }
                      onClick={() => {
                        history.push(`${item.url}`)
                        props.setActivePage(item.id)
                      }}
                    >
                      <Typography noWrap>{item.title}</Typography>
                    </NavItem>
                  ))}
                  {/* <NavItem
                    className={classes.navItem}
                    {...bindHover(popupState)}
                  >
                    <Typography noWrap>อื่นๆ </Typography>
                    <ArrowDownIcon style={{ marginLeft: 8 }} />
                  </NavItem> */}
                </NavMenu>
              </ThemeProvider>
            </Hidden>
            {/* MEDIUM DESKTOP NAVIGATION */}
            <Hidden xsDown lgUp implementation='css'>
              <ThemeProvider theme={darkTheme}>
                <NavMenu
                  useStyles={useLineNavigationMenuStyles}
                  color='inherit'
                >
                  {navigationItem.splice(0, 2).map((item) => (
                    <NavItem
                      active={props.active === item.id}
                      className={
                        props.active === item.id
                          ? classes.navItemActive
                          : classes.navItem
                      }
                      onClick={() => {
                        history.push(`${item.url}`)
                        props.setActivePage(item.id)
                      }}
                    >
                      <Typography noWrap>{item.title}</Typography>
                    </NavItem>
                  ))}
                  <NavItem
                    className={classes.navItem}
                    {...bindHover(popupState2)}
                  >
                    <Typography noWrap>อื่นๆ </Typography>
                    <ArrowDownIcon style={{ marginLeft: 8 }} />
                  </NavItem>
                </NavMenu>
              </ThemeProvider>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
      <HoverMenu
        {...bindMenu(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            marginTop: '36px',
            borderRadius: 8,
            boxShadow: 'rgb(0 0 0 / 15%) 0px 0px 10px',
          },
        }}
      >
        <MenuItem
          onClick={() => {
            popupState.close()
          }}
        >
          เมนูเพิ่มเติม 1
        </MenuItem>
        <MenuItem
          onClick={() => {
            popupState.close()
          }}
        >
          เมนูเพิ่มเติม 2
        </MenuItem>
      </HoverMenu>
      <Hidden lgUp implementation='css'>
        <HoverMenu
          {...bindMenu(popupState2)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            style: {
              marginTop: '36px',
              borderRadius: 8,
              boxShadow: 'rgb(0 0 0 / 15%) 0px 0px 10px',
            },
          }}
        >
          <MenuItem
            selected={props.active === 2}
            onClick={() => {
              popupState2.close()
              history.push(`${PATH}/edu/international`)
              props.setActivePage(2)
            }}
            className={clsx({
              [classes.dropdownMenu]: true,
              [classes.selected]: props.active === 2,
            })}
          >
            สถาบันการศึกษาในต่างประเทศ
          </MenuItem>
          <MenuItem
            selected={props.active === 3}
            onClick={() => {
              popupState2.close()
              history.push(`${PATH}/download`)
              props.setActivePage(3)
            }}
            className={clsx({
              [classes.dropdownMenu]: true,
              [classes.selected]: props.active === 3,
            })}
          >
            เอกสารดาวน์โหลด/หนังสือเวียน
          </MenuItem>
          <MenuItem
            selected={props.active === 4}
            onClick={() => {
              popupState2.close()
              history.push(`${PATH}/faq`)
              props.setActivePage(4)
            }}
            className={clsx({
              [classes.dropdownMenu]: true,
              [classes.selected]: props.active === 4,
            })}
          >
            คำถามที่พบบ่อย
          </MenuItem>
          {/* <MenuItem
            onClick={popupState2.close}
            className={clsx({
              [classes.dropdownMenu]: true,
            })}
          >
            เมนูเพิ่มเติม 1
          </MenuItem>
          <MenuItem
            onClick={popupState2.close}
            className={clsx({
              [classes.dropdownMenu]: true,
            })}
          >
            เมนูเพิ่มเติม 2
          </MenuItem> */}
        </HoverMenu>
      </Hidden>
      <NavDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        active={props.active}
        unreadNotificationCount={0}
        isUserCurrentlyInLearn={isUserCurrentlyInLearn}
      />
    </div>
  )
}

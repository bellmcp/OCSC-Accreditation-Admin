// @ts-nocheck
import React, { useState } from 'react'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { getCookie, eraseCookie } from 'utils/cookies'

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
  Avatar,
  Divider,
  Tooltip,
  Button,
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

import NavDropdownMobile from './NavDropdownMobile'
import NavDropdownDesktop from './NavDropdownDesktop'

import * as uiActions from 'modules/ui/actions'
import { isLoginAsAdmin, isLoginAsUser } from 'utils/isLogin'

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
      borderLeft: `4px solid ${theme.palette.primary.main} !important`,
    },
    dropdownMenu: {
      borderLeft: `4px solid transparent`,
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
      backgroundColor: process.env.REACT_APP_PRIMARY_COLOR_HEX,
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

  const menuId = 'primary-account-menu'
  const mobileMenuId = 'primary-account-menu-mobile'

  const isAdmin = isLoginAsAdmin()
  const isUser = isLoginAsUser()

  const getUsernameLabel = () => {
    if (isAdmin) return 'ชัชวิทย์'
    else if (isUser) return departmentName
    else return 'เข้าสู่ระบบ'
  }
  const checkIsLoggedIn = () => {
    return isAdmin || isUser
  }

  const isLoggedIn = checkIsLoggedIn()
  const usernameLabel = getUsernameLabel()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const navigationItem = [
    {
      id: 0,
      title: 'หนังสือเข้า',
      url: `${PATH}`,
      notification: 0,
    },
    {
      id: 1,
      title: 'ค้นหาการรับรองคุณวุฒิบุคคล',
      url: `${PATH}/search/person-letter`,
      notification: 0,
    },
    {
      id: 2,
      title: 'ค้นหาการรับรองคุณวุฒิหลักสูตร',
      url: `${PATH}/search/curriculum`,
      notification: 0,
    },
  ]

  const isUserCurrentlyInLearn = false

  const linkToChangePassword = () => {
    handleMenuClose()
    history.push(`${PATH}/edit/password`)
  }

  const linkToHome = () => {
    handleMenuClose()
    history.push(`${PATH}`)
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

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const logout = () => {
    handleMenuClose()
    eraseCookie('token')
    dispatch(uiActions.setFlashMessage('ออกจากระบบเรียบร้อยแล้ว', 'success'))
    setTimeout(() => {
      history.push(`${PATH}/login`)
    }, 2000)
    window.location.reload()
  }

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
                  <NavItem
                    className={classes.navItem}
                    {...bindHover(popupState)}
                  >
                    <Typography noWrap>ข้อมูลพื้นฐาน</Typography>
                    <ArrowDownIcon style={{ marginLeft: 8 }} />
                  </NavItem>
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
                  <NavItem
                    className={classes.navItem}
                    {...bindHover(popupState2)}
                  >
                    <Typography noWrap>เมนู</Typography>
                    <ArrowDownIcon style={{ marginLeft: 8 }} />
                  </NavItem>
                  <NavItem
                    className={classes.navItem}
                    {...bindHover(popupState)}
                  >
                    <Typography noWrap>ข้อมูลพื้นฐาน</Typography>
                    <ArrowDownIcon style={{ marginLeft: 8 }} />
                  </NavItem>
                </NavMenu>
              </ThemeProvider>
            </Hidden>
            {/* DESKTOP DROPDOWN */}
            <div className={classes.sectionDesktop}>
              <Button
                onClick={handleProfileMenuOpen}
                disabled={!isLoggedIn}
                color='primary'
                size='small'
                style={{
                  borderRadius: 50,
                  padding: '5px 12px 5px 8px',
                  margin: '6px 0',
                  border: '1px solid lightgray',
                }}
                startIcon={
                  <Avatar
                    className={isLoggedIn ? classes.loggedIn : classes.small}
                  />
                }
                endIcon={
                  isLoggedIn && (
                    <ArrowDownIcon style={{ fontSize: 24 }} color='action' />
                  )
                }
              >
                <Typography color='textPrimary' className={classes.bold} noWrap>
                  {usernameLabel}
                </Typography>
              </Button>
            </div>
            {/* MOBILE DROPDOWN */}
            <Hidden only={['xs', 'lg', 'md', 'xl']}>
              <div className={classes.grow} />
            </Hidden>
            <div className={classes.sectionMobile}>
              <IconButton
                disabled={!isLoggedIn}
                aria-controls={mobileMenuId}
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <Avatar
                  className={isLoggedIn ? classes.loggedIn : classes.small}
                />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <HoverMenu
        {...bindMenu(popupState)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
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
          selected={props.active === 3}
          onClick={() => {
            history.push(`${PATH}/info/country`)
            popupState.close()
            props.setActivePage(3)
          }}
          className={clsx({
            [classes.dropdownMenu]: true,
            [classes.selected]: props.active === 3,
          })}
        >
          ประเทศ
        </MenuItem>
        <MenuItem
          selected={props.active === 4}
          onClick={() => {
            history.push(`${PATH}/info/salary-group`)
            popupState.close()
            props.setActivePage(4)
          }}
          className={clsx({
            [classes.dropdownMenu]: true,
            [classes.selected]: props.active === 4,
          })}
        >
          กลุ่มเงินเดือน
        </MenuItem>
        <MenuItem
          selected={props.active === 5}
          onClick={() => {
            history.push(`${PATH}/info/education-level`)
            popupState.close()
            props.setActivePage(5)
          }}
          className={clsx({
            [classes.dropdownMenu]: true,
            [classes.selected]: props.active === 5,
          })}
        >
          ระดับการศึกษา
        </MenuItem>
        <MenuItem
          selected={props.active === 6}
          onClick={() => {
            history.push(`${PATH}/info/university`)
            popupState.close()
            props.setActivePage(6)
          }}
          className={clsx({
            [classes.dropdownMenu]: true,
            [classes.selected]: props.active === 6,
          })}
        >
          มหาวิทยาลัย
        </MenuItem>
      </HoverMenu>
      <Hidden lgUp implementation='css'>
        <HoverMenu
          {...bindMenu(popupState2)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
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
            selected={props.active === 0}
            onClick={() => {
              popupState2.close()
              history.push(`${PATH}`)
              props.setActivePage(0)
            }}
            className={clsx({
              [classes.dropdownMenu]: true,
              [classes.selected]: props.active === 0,
            })}
          >
            หนังสือเข้า
          </MenuItem>
          <MenuItem
            selected={props.active === 1}
            onClick={() => {
              popupState2.close()
              history.push(`${PATH}/search/person-letter`)
              props.setActivePage(1)
            }}
            className={clsx({
              [classes.dropdownMenu]: true,
              [classes.selected]: props.active === 1,
            })}
          >
            คุณวุฒิบุคคล
          </MenuItem>
          <MenuItem
            selected={props.active === 2}
            onClick={() => {
              popupState2.close()
              history.push(`${PATH}/search/curriculum`)
              props.setActivePage(2)
            }}
            className={clsx({
              [classes.dropdownMenu]: true,
              [classes.selected]: props.active === 2,
            })}
          >
            คุณวุฒิหลักสูตร
          </MenuItem>
        </HoverMenu>
      </Hidden>
      <NavDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        active={props.active}
        unreadNotificationCount={0}
        isUserCurrentlyInLearn={isUserCurrentlyInLearn}
      />
      <NavDropdownMobile
        isLoggedIn={isLoggedIn}
        logout={logout}
        mobileMenuId={mobileMenuId}
        mobileMoreAnchorEl={mobileMoreAnchorEl}
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuClose={handleMobileMenuClose}
        linkToHome={linkToHome}
        linkToChangePassword={linkToChangePassword}
        usernameLabel={usernameLabel}
      />
      <NavDropdownDesktop
        isLoggedIn={isLoggedIn}
        logout={logout}
        linkToHome={linkToHome}
        linkToChangePassword={linkToChangePassword}
        anchorEl={anchorEl}
        menuId={menuId}
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
      />
    </div>
  )
}

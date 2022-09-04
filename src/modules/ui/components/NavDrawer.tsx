//@ts-nocheck
import React from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles'
import {
  Divider,
  Drawer,
  Hidden,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@material-ui/core'
import { CloseRounded as CloseIcon } from '@material-ui/icons'

const DRAWER_WIDTH = '80%'
const PATH = process.env.REACT_APP_BASE_PATH

interface NavigationDrawerProps {
  window?: () => Window
  handleDrawerToggle: () => void
  mobileOpen: boolean
  active: number
  unreadNotificationCount: number
  isUserCurrentlyInLearn: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        zIndex: theme.zIndex.drawer + 1,
      },
    },
    listItem: {
      padding: 0,
      paddingLeft: 10,
    },
    active: {
      borderLeft: `6px solid ${theme.palette.primary.main}`,
      paddingLeft: '4px !important',
    },
    listTitle: {
      marginBlockEnd: 0,
      color: theme.palette.grey[500],
      paddingLeft: theme.spacing(3),
    },
    listItemIcon: {
      minWidth: 40,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    closeButton: {
      margin: theme.spacing(1, 1),
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    copyright: {
      fontSize: '12px',
      color: theme.palette.grey[500],
      padding: theme.spacing(2, 3),
    },
    title: {
      fontSize: '24px',
      fontWeight: 600,
      padding: theme.spacing(0, 3),
      marginTop: 0,
    },
  })
)

export default function NavDrawer({
  window,
  handleDrawerToggle,
  mobileOpen,
  active,
  unreadNotificationCount,
  isUserCurrentlyInLearn,
}: NavigationDrawerProps) {
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()
  const container =
    window !== undefined ? () => window().document.body : undefined

  const navigationItems = [
    {
      id: 0,
      title: 'หน้าหลัก',
      url: `${PATH}`,
    },
    {
      id: 1,
      title: 'ค้นหาการรับรองคุณวุฒิหลักสูตร',
      url: `${PATH}/search/curriculum`,
    },
    {
      id: 2,
      title: 'สถาบันการศึกษาในต่างประเทศ',
      url: `${PATH}/edu/international`,
    },
    {
      id: 3,
      title: 'เอกสารดาวน์โหลด/หนังสือเวียน',
      url: `${PATH}/download`,
    },
    {
      id: 4,
      title: 'คำถามที่พบบ่อย',
      url: `${PATH}/faq`,
    },
  ]

  function MobileDrawer() {
    return (
      <div>
        <IconButton
          edge='start'
          className={classes.closeButton}
          aria-label='close drawer'
          onClick={handleDrawerToggle}
        >
          <CloseIcon />
        </IconButton>
        <p className={classes.title}>
          OCSC
          <br />
          e-Accredit
        </p>
        <List>
          {navigationItems.map((navigationItem, index) => (
            <React.Fragment>
              {navigationItem.id === 0 ? <Divider /> : null}
              <MenuItem
                button
                className={clsx({
                  [classes.listItem]: true,
                  [classes.active]: index === active,
                })}
                selected={index === active ? true : false}
                onClick={() => {
                  history.push(`${navigationItem.url}`)
                  handleDrawerToggle()
                }}
              >
                <ListItem key={index} dense>
                  <ListItemText primary={navigationItem.title} />
                </ListItem>
              </MenuItem>
            </React.Fragment>
          ))}
          {/* <MenuItem
            button
            className={clsx({
              [classes.listItem]: true,
            })}
          >
            <ListItem key={999} dense>
              <ListItemText primary='เมนูเพิ่มเติม 1' />
            </ListItem>
          </MenuItem> */}
          {/* <MenuItem
            button
            className={clsx({
              [classes.listItem]: true,
            })}
          >
            <ListItem key={999} dense>
              <ListItemText primary='เมนูเพิ่มเติม 2' />
            </ListItem>
          </MenuItem> */}
          <Divider />
        </List>
        <p className={classes.copyright}>
          © {new Date().getFullYear()} สำนักงาน ก.พ.
        </p>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer}>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <MobileDrawer />
          </Drawer>
        </Hidden>
      </nav>
    </div>
  )
}

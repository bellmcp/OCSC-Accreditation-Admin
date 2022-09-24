import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Toolbar } from '@material-ui/core'

interface HeaderProps {
  title: string
  subtitle?: string
  icon: React.ReactElement
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: '24px 0',
      minHeight: 57,
    },
    background: {
      paddingBottom: '25%',
    },
    icon: {
      marginTop: 8,
      color: process.env.REACT_APP_SECONDARY_COLOR_HEX,
    },
    title: {
      color: process.env.REACT_APP_SECONDARY_COLOR_HEX,
      fontSize: '1.7rem',
      fontWeight: 600,
    },
  })
)

export default function Header({ title, subtitle, icon }: HeaderProps) {
  const classes = useStyles()

  return <Toolbar />
}

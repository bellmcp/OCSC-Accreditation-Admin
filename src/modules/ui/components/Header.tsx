import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Grid, Toolbar } from '@material-ui/core'

const HeroImage = require('assets/images/hero.svg')

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

  return (
    <>
      <Toolbar />
      <Grid
        container
        direction='column'
        justify='flex-end'
        alignItems='center'
        className={classes.background}
        style={{
          background: `url(${HeroImage}) no-repeat`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          filter: 'saturate(1.3)',
        }}
      ></Grid>
    </>
  )
}

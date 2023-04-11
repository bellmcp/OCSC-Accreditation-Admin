import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  Divider,
  useMediaQuery,
} from '@material-ui/core'
import { green, red } from '@material-ui/core/colors'

import Header from 'modules/ui/components/Header'
import Loading from 'modules/ui/components/Loading'
import ProgressList from './ProgressList'

import * as curriculumActions from 'modules/curriculum/actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    sectionTitle: {
      fontSize: '1.7rem',
      fontWeight: 600,
      zIndex: 3,
      lineHeight: '1.3',
    },
    sectionSubtitle: {
      fontSize: '1.4rem',
      fontWeight: 600,
      zIndex: 3,
      marginBottom: '24px',
      lineHeight: '1.3',
    },
    table: {
      minWidth: 650,
    },
  })
)

export default function CurriculumProgress() {
  const classes = useStyles()
  const theme = useTheme()
  const dispatch = useDispatch()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const {
    progressGovernment: progressGovernmentList = [],
    progressIndividual: progressIndividualList = [],
    isLoading = false,
  } = useSelector((state: any) => state.curriculum)

  useEffect(() => {
    dispatch(curriculumActions.loadProgressGovernment())
    dispatch(curriculumActions.loadProgressIndividual())
  }, [dispatch])

  const renderContent = () => {
    if (isLoading) {
      return <Loading height={300}></Loading>
    } else {
      return (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              style={{
                borderRadius: 16,
                padding: 24,
                boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
                border: '1px solid rgb(204 242 251)',
                minHeight: 300,
              }}
            >
              <Typography
                gutterBottom
                component='h2'
                variant='h6'
                color='secondary'
                align='center'
                className={classes.sectionSubtitle}
              >
                เอกชน
              </Typography>
              <Divider style={{ marginBottom: 32 }} />
              <ProgressList progressList={progressIndividualList} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              style={{
                borderRadius: 16,
                padding: 24,
                boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
                border: '1px solid rgb(204 242 251)',
                minHeight: 300,
              }}
            >
              <Typography
                gutterBottom
                component='h2'
                variant='h6'
                color='secondary'
                align='center'
                className={classes.sectionSubtitle}
              >
                รัฐ
              </Typography>
              <Divider style={{ marginBottom: 32 }} />
              <ProgressList progressList={progressGovernmentList} />
            </Paper>
          </Grid>
        </Grid>
      )
    }
  }

  return (
    <>
      <Header />
      <Container maxWidth='lg' className={classes.content}>
        <Box mt={2} mb={4}>
          <Grid
            container
            direction='row'
            alignItems='center'
            justify='space-between'
            style={{ marginBottom: 8 }}
          >
            <Typography
              gutterBottom
              component='h2'
              variant='h6'
              color='secondary'
              className={classes.sectionTitle}
              align={matches ? 'left' : 'center'}
            >
              หนังสือเวียน : ความคืบหน้า
            </Typography>
            <Typography variant='body2' color='textPrimary'>
              <ul>
                <li style={{ color: red[600] }}>
                  <span style={{ fontWeight: 600 }}>สีแดง</span> : ยังไม่เสร็จ
                </li>
                <li style={{ color: green[800] }}>
                  <span style={{ fontWeight: 600 }}>สีเขียว</span> : เสร็จแล้ว
                </li>
                <li style={{ color: theme.palette.text.primary }}>
                  <span style={{ fontWeight: 600 }}>สีดำ</span> : ยังไม่ได้ทำ
                </li>
              </ul>
            </Typography>
          </Grid>
          {renderContent()}
          {/* <Paper
            elevation={0}
            style={{
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
              border: '1px solid rgb(204 242 251)',
              marginTop: 32,
            }}
          >
            <Typography
              variant='body2'
              align='right'
              color='secondary'
              style={{ fontWeight: 500 }}
            >
              <span style={{ color: red[600] }}>สีแดง</span> หมายถึง ยังไม่เสร็จ
              <br />
              <span style={{ color: green[800] }}>สีเขียว</span> หมายถึง
              เสร็จแล้ว
              <br />
              <span style={{ color: theme.palette.text.primary }}>
                สีดำ
              </span>{' '}
              หมายถึง ยังไม่ได้ทำ
            </Typography>
          </Paper> */}
        </Box>
      </Container>
    </>
  )
}

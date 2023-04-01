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
  useMediaQuery,
} from '@material-ui/core'

import Header from 'modules/ui/components/Header'
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

  return (
    <>
      <Header />
      <Container maxWidth='lg' className={classes.content}>
        <Box mt={2} mb={4}>
          <Grid container direction='column'>
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
          </Grid>
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
                  className={classes.sectionTitle}
                >
                  เอกชน
                </Typography>
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
                  className={classes.sectionTitle}
                >
                  รัฐ
                </Typography>
                <ProgressList progressList={progressGovernmentList} />
              </Paper>
            </Grid>
          </Grid>
          <Paper
            elevation={0}
            style={{
              borderRadius: 16,
              padding: 24,
              boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
              border: '1px solid rgb(204 242 251)',
              marginTop: 32,
            }}
          >
            <Typography variant='body2'>
              สีแดง หมายถึง ยังไม่เสร็จ
              <br />
              สีเขียว หมายถึง เสร็จแล้ว
              <br />
              สีดำ หมายถึง ยังไม่ได้ทำ
            </Typography>
          </Paper>
        </Box>
      </Container>
    </>
  )
}

import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'

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
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Button,
  ButtonGroup,
} from '@material-ui/core'
import { Stack } from '@mui/material'
import {
  Search as SearchIcon,
  Lock as LockIcon,
  LockOpen as UnlockIcon,
} from '@material-ui/icons'

import Header from 'modules/ui/components/Header'
import Loading from 'modules/ui/components/Loading'

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

function createData(
  id: number,
  salarygroup: string,
  minvalue: number,
  maxvalue: number,
  note: string
) {
  return {
    id,
    salarygroup,
    minvalue,
    maxvalue,
    note,
  }
}

export default function CurriculumApprove() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const {
    isLocked = false,
    lockMessage,
    isLoading = false,
  } = useSelector((state: any) => state.curriculum)

  useEffect(() => {
    dispatch(curriculumActions.loadLockStatus())
  }, [dispatch])

  const validationSchema = yup.object({})
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      type: 'gov',
      university: '',
      faculty: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('values', values)
    },
  })

  const lock = () => {
    dispatch(curriculumActions.lockRequest())
  }

  const unlock = () => {
    dispatch(curriculumActions.unlockRequest())
  }

  return (
    <>
      <Header />
      <Container maxWidth='lg' className={classes.content}>
        <form onSubmit={formik.handleSubmit}>
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
                หนังสือเวียน : รับรองหลักสูตรใหม่
              </Typography>
            </Grid>
            <Stack
              spacing={2}
              direction='row'
              alignItems='center'
              style={{ marginBottom: 24 }}
            >
              <ButtonGroup>
                <Button
                  variant={!isLocked ? 'contained' : 'outlined'}
                  color='secondary'
                  startIcon={<LockIcon />}
                  onClick={lock}
                >
                  ล็อค
                </Button>
                <Button
                  variant={isLocked ? 'contained' : 'outlined'}
                  color='secondary'
                  startIcon={<UnlockIcon />}
                  onClick={unlock}
                  disabled={!isLocked}
                >
                  ปลดล็อค
                </Button>
              </ButtonGroup>
              {lockMessage && (
                <Typography variant='body2' color='error'>
                  {lockMessage}
                </Typography>
              )}
            </Stack>
            <Paper
              elevation={0}
              style={{
                borderRadius: 16,
                padding: 24,
                boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
                border: '1px solid rgb(204 242 251)',
              }}
            >
              <Grid container item spacing={2}>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                    >
                      ประเภทหลักสูตร
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <RadioGroup
                      row
                      id='type'
                      name='type'
                      value={formik.values.type}
                      onChange={formik.handleChange}
                    >
                      <FormControlLabel
                        value='gov'
                        control={<Radio size='small' />}
                        label='หลักสูตรของรัฐ'
                        style={{ marginRight: 96 }}
                      />
                      <FormControlLabel
                        value='org'
                        control={<Radio size='small' />}
                        label='หลักสูตรของเอกชน'
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                      gutterBottom
                    >
                      มหาวิทยาลัย/สถาบันการศึกษา
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <TextField
                      id='university'
                      name='university'
                      value={formik.values.university}
                      onChange={formik.handleChange}
                      variant='outlined'
                      size='small'
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                      gutterBottom
                    >
                      คณะ/หน่วยงานที่เทียบเท่าคณะ
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <TextField
                      id='faculty'
                      name='faculty'
                      value={formik.values.faculty}
                      onChange={formik.handleChange}
                      variant='outlined'
                      size='small'
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Button
              fullWidth
              variant='contained'
              color='secondary'
              startIcon={<SearchIcon />}
              style={{ marginTop: 32 }}
              type='submit'
            >
              ค้นหา
            </Button>
          </Box>
        </form>
      </Container>
    </>
  )
}

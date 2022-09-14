// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { get, isEmpty } from 'lodash'
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
  useMediaQuery,
  Container,
  Typography,
  Grid,
  Box,
  Select,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  FormControl,
  Paper,
  MenuItem,
  Divider,
  Fab,
  Zoom,
  useScrollTrigger,
  Toolbar,
  FormGroup,
  Checkbox,
} from '@material-ui/core'
import Stack from '@mui/material/Stack'
import {
  Search as SearchIcon,
  UnfoldLess as ShrinkIcon,
  UnfoldMore as ExpandIcon,
} from '@material-ui/icons'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

import * as searchActions from 'modules/search/actions'
import Loading from 'modules/ui/components/Loading'
import DatePicker from './DatePicker'
import DataTable from './DataTable'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      paddingTop: theme.spacing(3),
    },
    sectionTitle: {
      fontSize: '1.7rem',
      fontWeight: 600,
      lineHeight: '1.3',
      zIndex: 3,
      color: theme.palette.secondary.main,
    },
    seeAllButton: {
      marginBottom: '0.35em',
      zIndex: 3,
    },
    root: {
      position: 'fixed',
      bottom: theme.spacing(4),
      right: theme.spacing(4),
    },
  })
)

function ScrollTop(props: any) {
  const { children } = props
  const classes = useStyles()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation' className={classes.root}>
        {children}
      </div>
    </Zoom>
  )
}

export default function PersonLetterWorker() {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const dispatch = useDispatch()

  const validationSchema = yup.object({})

  const getLevelIdByLabel = (label: string) => {
    const result = educationLevels.find((item: any) => {
      return item.level === label
    })
    return get(result, 'id', 0)
  }

  const getFilterPayloadValue = (value: string) => {
    switch (value) {
      case 'thai':
        return 1
      case 'global':
        return 2
      case 'all':
      default:
        return 0
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      filter: 'all',
      nationalId: '',
      country: '',
      firstName: '',
      lastName: '',
      level: 0,
      university: '',
      faculty: '',
      degree: '',
      branch: '',
      appro: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        searchActions.searchPersonLetters({
          filter: getFilterPayloadValue(get(values, 'filter', 'all')),
          nationalId: get(values, 'nationalId', ''),
          country: get(values, 'country', ''),
          firstName: get(values, 'firstName', ''),
          lastName: get(values, 'lastName', ''),
          level: getLevelIdByLabel(get(values, 'level', 0)),
          university: get(values, 'university', ''),
          faculty: get(values, 'faculty', ''),
          degree: get(values, 'degree', ''),
          branch: get(values, 'branch', ''),
          appro: get(values, 'appro', ''),
        })
      )
    },
  })

  useEffect(() => {
    dispatch(searchActions.loadEducationlevels())
    return () => {
      dispatch(searchActions.clearSearchResult())
    }
  }, [dispatch])

  const note = (
    <span style={{ color: theme.palette.primary.main, marginLeft: 2 }}>*</span>
  )

  const [educationLevels, setEducationLevels] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [tableMaxWidth, setTableMaxWidth] = useState<any>('lg')

  const handleSwitchTableMaxWidth = () => {
    if (tableMaxWidth === 'lg') setTableMaxWidth(false)
    else setTableMaxWidth('lg')
  }

  const {
    educationLevels: initalEducationLevels = [],
    searchResults: initialSearchResults = [],
    isSearching = false,
  } = useSelector((state: any) => state.search)

  useEffect(() => {
    const parsed = initialSearchResults.map((item: any, index: number) => {
      return {
        order: index + 1,
        accreditation: get(item, 'accreditation1', ''),
        ...item,
      }
    })
    setSearchResults(parsed)
  }, [initialSearchResults])

  useEffect(() => {
    setEducationLevels(initalEducationLevels)
  }, [initalEducationLevels])

  const renderSearchResult = () => {
    if (isSearching) {
      return <Loading height={300}></Loading>
    } else {
      if (isEmpty(searchResults)) {
        return <></>
      } else {
        return (
          <Box mb={4}>
            <Box mt={6} mb={4}>
              <Divider />
            </Box>
            <Container
              maxWidth='lg'
              style={{ padding: tableMaxWidth === 'lg' ? 0 : '0 24px' }}
            >
              <Grid
                container
                justify='space-between'
                style={{ margin: '24px 0' }}
              >
                <Typography
                  component='h2'
                  variant='h6'
                  className={classes.sectionTitle}
                >
                  ผลการค้นหา
                </Typography>
                <Stack direction='row' spacing={2}>
                  <Button
                    variant='contained'
                    color='secondary'
                    onClick={handleSwitchTableMaxWidth}
                    startIcon={
                      tableMaxWidth === 'lg' ? (
                        <ExpandIcon style={{ transform: 'rotate(90deg)' }} />
                      ) : (
                        <ShrinkIcon style={{ transform: 'rotate(90deg)' }} />
                      )
                    }
                  >
                    {tableMaxWidth === 'lg' ? 'ขยาย' : 'ย่อ'}ตาราง
                  </Button>
                </Stack>
              </Grid>
            </Container>
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
              <DataTable data={searchResults} loading={isSearching} />
            </Paper>
          </Box>
        )
      }
    }
  }

  return (
    <>
      <Toolbar id='back-to-top-anchor' />
      <Container maxWidth='lg' className={classes.content}>
        <form onSubmit={formik.handleSubmit}>
          <Box mt={2} mb={4}>
            <Grid
              container
              direction='row'
              justify={matches ? 'space-between' : 'center'}
              alignItems='center'
              style={{ marginBottom: 24 }}
            >
              <Grid item xs={6}>
                <Typography
                  component='h2'
                  variant='h6'
                  align={matches ? 'left' : 'center'}
                  className={classes.sectionTitle}
                >
                  หนังสือเข้า (ผู้ปฏิบัติงาน)
                </Typography>
              </Grid>
            </Grid>
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
                      เลขที่หนังสือเข้า
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={3}>
                    <TextField
                      id='nationalId'
                      name='nationalId'
                      value={formik.values.nationalId}
                      onChange={formik.handleChange}
                      variant='outlined'
                      size='small'
                      fullWidth
                      multiline={!matches}
                      rows={4}
                    />
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                    >
                      วันที่หนังสือเข้า (เริ่มต้น)
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={3}>
                    <DatePicker />
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                    >
                      วันที่หนังสือเข้า (สิ้นสุด)
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={3}>
                    <DatePicker />
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                    >
                      สถานะ
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={9}>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={formik.values.filter}
                            onChange={formik.handleChange}
                            name='gilad'
                          />
                        }
                        label='อยู่ระหว่างดำเนินการ'
                        style={{ marginRight: 46 }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={formik.values.filter}
                            onChange={formik.handleChange}
                            name='jason'
                          />
                        }
                        label='รออนุมัติ'
                        style={{ marginRight: 46 }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={formik.values.filter}
                            onChange={formik.handleChange}
                            name='antoine'
                          />
                        }
                        label='เสร็จสิ้น'
                        style={{ marginRight: 46 }}
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={formik.values.filter}
                            onChange={formik.handleChange}
                            name='antoine'
                          />
                        }
                        label='ยกเลิก'
                        style={{ marginRight: 46 }}
                      />
                    </FormGroup>
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
      <Container maxWidth={tableMaxWidth} style={{ marginBottom: 36 }}>
        {renderSearchResult()}
      </Container>
      <ScrollTop>
        <Fab color='primary' size='medium'>
          <KeyboardArrowUpIcon style={{ color: 'white' }} />
        </Fab>
      </ScrollTop>
    </>
  )
}

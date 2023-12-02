// @ts-nocheck
import React, { useEffect, useState } from 'react'
import { get, isEmpty } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { format, subMonths } from 'date-fns'

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
  Button,
  Paper,
  Divider,
  Fab,
  Zoom,
  useScrollTrigger,
  Toolbar,
  Chip,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core'
import Stack from '@mui/material/Stack'
import {
  Search as SearchIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@material-ui/icons'

import * as reportActions from 'modules/report/actions'
import * as personLetterActions from 'modules/personLetter/actions'

import Chart from './Chart'
import Loading from 'modules/ui/components/Loading'
import DatePicker from './DatePicker'
import Empty from 'modules/ui/components/Empty'

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

export default function Usage() {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const dispatch = useDispatch()

  const [searchResults, setSearchResults] = useState([])
  const [startDate, setStartDate] = useState<string>(
    format(subMonths(new Date(), 6), 'yyyy-MM-dd').toString()
  )
  const [endDate, setEndDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd').toString()
  )

  const validationSchema = yup.object({})

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      startDate: '',
      endDate: '',
      category: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const searchQuery = {
        startDate,
        endDate,
        category: get(values, 'category', 0),
      }
      dispatch(reportActions.getUsageReport(searchQuery))
    },
  })

  const initialSubmitForm = () => {
    const searchQuery = {
      startDate,
      endDate,
      category: 0,
    }
    dispatch(reportActions.getUsageReport(searchQuery))
  }

  useEffect(() => {
    dispatch(personLetterActions.loadPersonLetterCategories())
    initialSubmitForm()
    return () => {
      dispatch(reportActions.clearSearchResult())
    }
  }, [dispatch]) //eslint-disable-line

  const { searchResults: initialSearchResults = [], isSearching = false } =
    useSelector((state: any) => state.report)

  const { personLetterCategories = [] } = useSelector(
    (state: any) => state.personLetter
  )

  const personLetterCategoriesWithNull = [
    {
      id: 0,
      category: 'เลือกทั้งหมด',
    },
    ...personLetterCategories,
  ]

  useEffect(() => {
    const parsed = {
      ministry: {
        x: get(initialSearchResults, 'x1', []),
        y: get(initialSearchResults, 'y1', []),
      },
      department: {
        x: get(initialSearchResults, 'x2', []),
        y: get(initialSearchResults, 'y2', []),
      },
    }
    setSearchResults(parsed)
  }, [initialSearchResults])

  const getPersonLetterCategoryNameById = (id: number) => {
    const result = personLetterCategoriesWithNull.find(
      (item: any) => item.id === id
    )
    return get(result, 'category', '')
  }

  const renderMinistryChart = () => {
    if (isSearching) {
      return <Loading height={500}></Loading>
    } else {
      if (isEmpty(get(searchResults, 'ministry.y', []))) {
        return <Empty height={500} />
      } else {
        return (
          <Box mb={4}>
            <Box mt={6} mb={4}>
              <Divider />
            </Box>
            <Container maxWidth='lg'>
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
                  กระทรวง
                </Typography>
              </Grid>
            </Container>
            <Paper
              elevation={0}
              style={{
                borderRadius: 16,
                padding: '36px 24px',
                boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
                border: '1px solid rgb(204 242 251)',
                minHeight: 300,
              }}
            >
              <Chart
                title='กระทรวง'
                dataset={get(searchResults, 'ministry', {})}
              />
            </Paper>
          </Box>
        )
      }
    }
  }

  const renderDepartmentChart = () => {
    if (isSearching) {
      return <Loading height={500}></Loading>
    } else {
      if (isEmpty(get(searchResults, 'department.y', []))) {
        return <Empty height={500} />
      } else {
        return (
          <Box mb={4}>
            <Box mt={6} mb={4}></Box>
            <Container maxWidth='lg'>
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
                  กรม
                </Typography>
              </Grid>
            </Container>
            <Paper
              elevation={0}
              style={{
                borderRadius: 16,
                padding: '36px 24px',
                boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
                border: '1px solid rgb(204 242 251)',
                minHeight: 300,
              }}
            >
              <Chart
                title='กรม'
                dataset={get(searchResults, 'department', {})}
              />
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
              direction={matches ? 'row' : 'column'}
              justify={matches ? 'space-between' : 'center'}
              alignItems='center'
              style={{ marginBottom: 24 }}
              spacing={2}
            >
              <Grid item xs={6}>
                <Stack direction='row' spacing={2} alignItems='center'>
                  <Typography
                    component='h2'
                    variant='h6'
                    align={matches ? 'left' : 'center'}
                    className={classes.sectionTitle}
                  >
                    สถิติผู้ใช้งานของส่วนราชการ
                  </Typography>
                  <Chip
                    size='small'
                    label='หัวหน้างาน'
                    variant='outlined'
                    color='secondary'
                    style={{ fontWeight: 500 }}
                  />
                </Stack>
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
                      วันที่ (เริ่มต้น)
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={3}>
                    <DatePicker date={startDate} setDate={setStartDate} />
                  </Grid>
                </Grid>
                <Grid container item direction='row' alignItems='center'>
                  <Grid xs={12} md={3}>
                    <Typography
                      variant='body1'
                      color='textPrimary'
                      style={{ fontWeight: 600 }}
                    >
                      วันที่ (สิ้นสุด)
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={3}>
                    <DatePicker date={endDate} setDate={setEndDate} />
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
                      ประเภท
                    </Typography>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <FormControl fullWidth size='small'>
                      <Select
                        id='category'
                        name='category'
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        variant='outlined'
                        size='small'
                        displayEmpty
                        MenuProps={{
                          anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'left',
                          },
                          transformOrigin: {
                            vertical: 'top',
                            horizontal: 'left',
                          },
                          getContentAnchorEl: null,
                        }}
                        renderValue={(selected) => {
                          if (selected === null) {
                            return (
                              <span
                                style={{ color: theme.palette.text.secondary }}
                              >
                                เลือกประเภท
                              </span>
                            )
                          }
                          return getPersonLetterCategoryNameById(selected)
                        }}
                      >
                        {personLetterCategoriesWithNull.map((category: any) => (
                          <MenuItem value={get(category, 'id', '')}>
                            {get(category, 'category', '')}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
      <Container maxWidth='lg' style={{ marginBottom: 36 }}>
        {renderMinistryChart()}
        {renderDepartmentChart()}
      </Container>
      <ScrollTop>
        <Fab color='primary' size='medium'>
          <KeyboardArrowUpIcon style={{ color: 'white' }} />
        </Fab>
      </ScrollTop>
    </>
  )
}

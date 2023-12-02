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
  Hidden,
  Chip,
} from '@material-ui/core'
import Stack from '@mui/material/Stack'
import {
  Search as SearchIcon,
  UnfoldLess as ShrinkIcon,
  UnfoldMore as ExpandIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@material-ui/icons'

import * as reportActions from 'modules/report/actions'
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

export default function Progress() {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const dispatch = useDispatch()

  const [searchResults, setSearchResults] = useState([])
  const [tableHeader, setTableHeader] = useState([])
  const [numColumns, setNumColumns] = useState(0)
  const [tableMaxWidth, setTableMaxWidth] = useState<any>(false)
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
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const searchQuery = {
        startDate,
        endDate,
      }
      dispatch(reportActions.getProgressReport(searchQuery))
    },
  })

  const initialSubmitForm = () => {
    const searchQuery = {
      startDate,
      endDate,
    }
    dispatch(reportActions.getProgressReport(searchQuery))
  }

  useEffect(() => {
    initialSubmitForm()
    return () => {
      dispatch(reportActions.clearSearchResult())
    }
  }, [dispatch]) //eslint-disable-line

  const handleSwitchTableMaxWidth = () => {
    if (tableMaxWidth === 'lg') setTableMaxWidth(false)
    else setTableMaxWidth('lg')
  }

  const { searchResults: initialSearchResults = [], isSearching = false } =
    useSelector((state: any) => state.report)

  useEffect(() => {
    const tableData = get(initialSearchResults, 'tableData', [])
    const tableHeader = get(initialSearchResults, 'tableHeader', [])
    const numColumns = get(initialSearchResults, 'numColumns', 0)
    const parsed = tableData.map((item: any, index: number) => {
      return {
        id: item.item1,
        ...item,
      }
    })
    setSearchResults(parsed)
    setTableHeader(tableHeader)
    setNumColumns(numColumns)
  }, [initialSearchResults])

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
                  <Hidden mdDown>
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
                  </Hidden>
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
              <DataTable
                data={searchResults}
                tableHeader={tableHeader}
                loading={isSearching}
                startDate={startDate}
                endDate={endDate}
                numColumns={numColumns}
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
                    สรุปเรื่องเข้า/ออก/อยู่ระหว่างดำเนินการ
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

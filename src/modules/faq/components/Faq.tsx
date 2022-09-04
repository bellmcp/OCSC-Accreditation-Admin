import React, { useEffect } from 'react'
import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import {
  Container,
  Typography,
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useMediaQuery,
} from '@material-ui/core'
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Header from 'modules/ui/components/Header'
import DataTable from './DataTable'
import Loading from 'modules/ui/components/Loading'

import * as faqActions from 'modules/faq/actions'

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
      marginBottom: '24px',
    },
    seeAllButton: {
      marginBottom: '0.35em',
      zIndex: 3,
    },
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: 600,
      flexBasis: '50%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  })
)

interface FaqType {
  id: number
  question: string
  answer: string
  documentUrl: string[]
  documentText: string[]
  websiteUrl: string[]
  websiteText: string[]
}

function createData(
  documentUrl?: string[],
  documentText?: string[],
  websiteUrl?: string[],
  websiteText?: string[]
) {
  return {
    documentUrl,
    documentText,
    websiteUrl,
    websiteText,
  }
}

const parseLinkToDefaultColor = (text: string) => {
  return text.replace(/<a/g, '<a class="footer_link"')
}

export default function Faq() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  useEffect(() => {
    dispatch(faqActions.loadFaq())
  }, [dispatch])

  const { faq, isLoading = false } = useSelector((state: any) => state.faq)

  const renderContent = () => {
    if (isLoading) return <Loading height={100} />
    else
      return (
        <>
          {faq.map((item: any, index: number) => {
            const data = createData(
              item.documentUrl,
              item.documentText,
              item.websiteUrl,
              item.websiteText
            )
            return (
              <Accordion
                elevation={0}
                style={{
                  padding: '4px 8px',
                  borderRadius: 16,
                  boxShadow: '0 0 20px 0 rgba(204,242,251,0.3)',
                  border: '1px solid rgb(204 242 251)',
                }}
                expanded={expanded === get(item, 'id', index + 1)}
                onChange={handleChange(get(item, 'id', index + 1))}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon color='primary' />}
                >
                  <Grid container spacing={0} style={{ paddingLeft: 8 }}>
                    <Grid item xs={12}>
                      <Typography
                        variant='body1'
                        style={{
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        {get(item, 'id', index + 1)}
                        {'. '}
                        {get(item, 'question', '')} ?
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant='body1' color='textSecondary'>
                        <Grid
                          container
                          spacing={2}
                          direction='row'
                          alignItems='flex-start'
                          wrap='nowrap'
                        >
                          <Grid item>
                            <span
                              style={{
                                fontWeight: 500,
                                textDecoration: 'underline',
                              }}
                            >
                              ตอบ
                            </span>
                          </Grid>
                          <Grid item>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: parseLinkToDefaultColor(
                                  get(item, 'answer', '')
                                ),
                              }}
                            ></div>
                          </Grid>
                        </Grid>
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails
                  style={{ borderTop: `1px solid ${theme.palette.divider}` }}
                >
                  <DataTable data={data} />
                </AccordionDetails>
              </Accordion>
            )
          })}
        </>
      )
  }

  return (
    <>
      <Header title='FAQ' subtitle='คำถามที่พบบ่อย' icon={<div />} />
      <Container maxWidth='lg' className={classes.content}>
        <Box mt={2} mb={4}>
          <Grid
            container
            direction='row'
            justify={matches ? 'space-between' : 'center'}
            alignItems='center'
          >
            <Typography
              gutterBottom
              component='h2'
              variant='h6'
              color='secondary'
              className={classes.sectionTitle}
              align={matches ? 'left' : 'center'}
            >
              คำถามที่พบบ่อย
            </Typography>
          </Grid>
          {renderContent()}
        </Box>
      </Container>
    </>
  )
}

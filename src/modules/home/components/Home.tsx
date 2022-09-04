import React from 'react'
import { useHistory } from 'react-router-dom'

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
  Link,
  Avatar,
} from '@material-ui/core'
import {
  ArrowForwardIos as ArrowForwardIcon,
  Search as SearchIcon,
} from '@material-ui/icons'

import Header from 'modules/ui/components/Header'

import Infographic from 'assets/images/infographic.jpeg'

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
    seeAllButton: {
      marginBottom: '0.35em',
      zIndex: 3,
    },
  })
)

export default function Home() {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))
  const history = useHistory()
  const PATH = process.env.REACT_APP_BASE_PATH

  const linkToFaq = () => {
    history.push(`${PATH}/faq`)
  }

  const linkToSearchCurriculum = () => {
    history.push(`${PATH}/search/curriculum`)
  }

  const linkToDownload = () => {
    history.push(`${PATH}/download`)
  }

  return (
    <>
      <Header title='FAQ' subtitle='คำถามที่พบบ่อย' icon={<div />} />
      <Container maxWidth='lg' className={classes.content}>
        <Grid container spacing={matches ? 10 : 2}>
          <Grid container item xs={12} md={6}>
            <Box mt={2} mb={4}>
              <Grid
                container
                direction='row'
                justify={matches ? 'space-between' : 'center'}
                alignItems='center'
                style={{ marginBottom: 24 }}
              >
                <Typography
                  gutterBottom
                  component='h2'
                  variant='h6'
                  color='secondary'
                  className={classes.sectionTitle}
                  align={matches ? 'left' : 'center'}
                >
                  การรับรองคุณวุฒิหลักสูตร
                </Typography>
              </Grid>
              <Typography
                variant='body1'
                color='textPrimary'
                style={{ textIndent: '50px', marginBottom: '16px' }}
              >
                การรับรองคุณวุฒิบุคคลเพื่อบรรจุเข้ารับราชการ
                และกำหนดอัตราเงินเดือนที่ควรได้รับ เป็นอำนาจหน้าที่ของ ก.พ.
                และสำนักงาน ก.พ. ตามนัยมาตรา 8 (10) และมาตรา 13 (11)
                แห่งพระราชบัญญัติระเบียบข้าราชการพลเรือน พ.ศ 2551
              </Typography>
              <Typography
                variant='body1'
                color='textPrimary'
                gutterBottom
                style={{ textIndent: '50px', marginBottom: '16px' }}
              >
                การรับรองคุณวุฒิของ ก.พ.
                จึงมีวัตถุประสงค์เพื่อให้ทางราชการได้บุคคลที่มีความรู้ความสามารถไม่ต่ำกว่ามาตรฐานที่
                ก.พ. กำหนด มาปฏิบัติราชการ
                และกำหนดเงินเดือนที่ควรได้รับให้เหมาะสมกับความรู้ความสามารถ ก.พ.
                จะรับรองคุณวุฒิการศึกษาในระดับต่าง ๆ ตามหลักสูตรการศึกษา
                ที่สถาบันการศึกษาได้จัดทำขึ้น
                และได้รับการรับรองมาตรฐานการศึกษาจากกระทรวงศึกษาธิการแล้วหมายถึง
                ก.พ. รับรองคุณวุฒิ แต่มิได้รับรองวิทยฐานะสถาบันการศึกษาต่าง ๆ
                ทั้งในประเทศและต่างประเทศ
              </Typography>
              <Typography
                variant='body1'
                color='textPrimary'
                gutterBottom
                style={{ textIndent: '50px', marginBottom: '16px' }}
              >
                หลักเกณฑ์การรับรองคุณวุฒิของผู้สำเร็จการศึกษาจากต่างประเทศ
                เพื่อประโยชน์ในการบรรจุและการแต่งตั้งข้าราชการพลเรือนสามัญ ก.พ.
                จะรับรองคุณวุฒิที่ได้รับ
                จากสถาบันการศึกษาที่ได้รับการรับรองวิทยฐานะจากหน่วยงานที่มีอำนาจหน้าที่ตามกฎหมายของประเทศนั้น
                ๆ ให้บรรจุเข้ารับราชการได้
              </Typography>
              <Typography
                variant='body1'
                color='textPrimary'
                gutterBottom
                style={{ textIndent: '50px', marginBottom: '16px' }}
              >
                ระบบการจัดเก็บข้อมูลหลักสูตรและคุณวุฒิที่ ก.พ.รับรอง
                เป็นการเผยแพร่ข้อมูลหลักสูตรการศึกษาต่างๆ
                ทั้งในประเทศและต่างประเทศว่ามีหลักสูตรใดบ้างที่
                ก.พ.รับรองคุณวุฒิ ให้บรรจุเข้ารับราชการได้ โดยข้อมูลในระบบฯ
                จะแบ่งเป็น 2 ส่วนใหญ่ๆ คือ
              </Typography>
              <Typography
                variant='body1'
                color='textPrimary'
                gutterBottom
                style={{ marginLeft: '50px', marginBottom: '16px' }}
              >
                1. การรับรองคุณวุฒิในประเทศ
                <br />
                2. การรับรองคุณวุฒิต่างประเทศ
              </Typography>
              <Typography
                variant='body1'
                color='textPrimary'
                gutterBottom
                style={{ textIndent: '50px', marginBottom: '32px' }}
              >
                ซึ่งจะปรากฏข้อมูลที่ผู้ค้นหาควรทราบเบื้องต้น
                และคำแนะนำในการใช้ระบบ
                เพื่อให้ท่านบรรลุวัตถุประสงค์ในการค้นหาข้อมูลที่ท่านต้องการ
              </Typography>
              <Grid item style={{ width: '100%' }}>
                <Button
                  fullWidth
                  variant='contained'
                  color='secondary'
                  startIcon={<SearchIcon />}
                  onClick={linkToSearchCurriculum}
                >
                  ค้นหาการรับรองคุณวุฒิหลักสูตร
                </Button>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box mt={2} mb={4}>
              <Link href={Infographic} target='_blank'>
                <Avatar
                  variant='rounded'
                  src={Infographic}
                  style={{ width: '100%', height: 'auto', borderRadius: 8 }}
                >
                  test
                </Avatar>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <div style={{ backgroundColor: '#e9fcff' }}>
        <Container maxWidth='lg' className={classes.content}>
          <Grid
            container
            direction={matches ? 'row' : 'column'}
            justify={matches ? 'space-between' : 'center'}
            alignItems='center'
            spacing={2}
            style={{ marginBottom: 24, marginTop: 12 }}
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
            <Button
              variant='contained'
              color='secondary'
              endIcon={<ArrowForwardIcon />}
              onClick={linkToFaq}
              className={classes.seeAllButton}
            >
              ดูทั้งหมด
            </Button>
          </Grid>
          <Typography
            variant='h6'
            color='secondary'
            style={{ marginBottom: '16px', fontWeight: 600, lineHeight: '1.3' }}
          >
            1. การนำผลการรับรองในระบบรับรองคุณวุฒิด้วยระบบอิเล็กทรอนิกส์ไปใช้
          </Typography>
          <Typography
            variant='body1'
            color='textPrimary'
            style={{ textIndent: '50px', marginBottom: '16px' }}
          >
            สำนักงาน ก.พ. ขอเรียนว่า ผลการรับรองที่ได้จากระบบอิเล็กทรอนิกส์นี้
            เป็นเพียงเครื่องมือที่ช่วยค้นหาคุณวุฒิที่ต้องการ
            ว่าปรากฏอยู่ในหนังสือเวียนฉบับใด ดังนั้น
            หากประสงค์จะนำไปอ้างอิงในกรณีใด ๆ ก็ตาม
            ต้องอ้างอิงจากหนังสือเวียนหรือไฟล์หนังสือเวียนที่เป็น PDF เท่านั้น
            ตรวจสอบหนังสือเวียนได้จาก{' '}
            <Link
              underline='hover'
              color='secondary'
              onClick={linkToDownload}
              style={{ cursor: 'pointer' }}
            >
              ที่นี่ {'>'}
            </Link>
          </Typography>
          <Typography
            variant='h6'
            color='secondary'
            style={{
              marginTop: '32px',
              marginBottom: '16px',
              fontWeight: 600,
              lineHeight: '1.3',
            }}
          >
            2. การสมัครสอบของข้าราชการประเภทอื่น
          </Typography>
          <Typography
            variant='body1'
            color='textPrimary'
            style={{ textIndent: '50px', marginBottom: '16px' }}
          >
            การสมัครสอบใด ๆ ที่ไม่ใช่ข้าราชการพลเรือนสามัญ
            หากมีข้อสงสัยเรื่องคุณวุฒิว่าตรงตามคุณสมบัติเฉพาะสำหรับตำแหน่งที่ประกาศรับสมัครกำหนดไว้หรือไม่
            โปรดติดต่อกับหน่วยงานที่ประกาศรับสมัครนั้น ๆ โดยตรง
          </Typography>
        </Container>
      </div>
    </>
  )
}

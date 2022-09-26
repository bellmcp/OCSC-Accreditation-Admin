// @ts-nocheck
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ExcelRenderer, OutTable } from 'react-excel-renderer'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import { Typography, Button, Grid, Link, Box } from '@material-ui/core'
import { SentimentVeryDissatisfied as ErrorIcon } from '@material-ui/icons'
import Stack from '@mui/material/Stack'

export default function Preview() {
  const { search } = useLocation()
  const { file } = queryString.parse(search)
  const [cols, setCols] = useState([])
  const [rows, setRows] = useState([])

  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    const config = { responseType: 'blob' }
    axios
      .get(file, config)
      .then((response) => {
        ExcelRenderer(new File([response.data], 'excel'), (err, resp) => {
          if (err) {
            setIsError(true)
          } else {
            setCols(resp.cols)
            setRows(resp.rows)
            setIsError(false)
          }
        })
      })
      .catch((error) => {
        setIsError(true)
      })
  }, [file])

  const closeTab = () => {
    window.close()
  }

  return (
    <Stack direction='column' spacing={4} style={{ padding: 36 }}>
      <Grid container alignItems='center' justify='space-between'>
        <Grid item>
          <Typography
            component='h2'
            variant='h6'
            color='secondary'
            style={{
              fontSize: '1.7rem',
              fontWeight: 600,
              lineHeight: '1.3',
              zIndex: 3,
            }}
          >
            ไฟล์งาน
          </Typography>
        </Grid>
        <Grid item>
          <Stack direction='row' spacing={1}>
            <Button
              variant='contained'
              color='secondary'
              href={file}
              target='_blank'
            >
              ดาวน์โหลด
            </Button>
            <Button variant='outlined' onClick={closeTab}>
              ปิด
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {!isError ? (
        <OutTable
          data={rows}
          columns={cols}
          tableClassName='ExcelTable2007'
          tableHeaderRowClass='heading'
        />
      ) : (
        <Grid
          container
          direction='row'
          justify='center'
          alignItems='center'
          style={{ height: 500 }}
        >
          <Box my={10}>
            <Grid
              container
              direction='column'
              justify='center'
              alignItems='center'
            >
              <ErrorIcon
                color='disabled'
                style={{ fontSize: 54, marginBottom: 14 }}
              />
              <Typography variant='body2' color='textSecondary' align='center'>
                เกิดข้อผิดพลาดบางอย่าง
                <br />
                โปรดดาวน์โหลดไฟล์ หรือลองใหม่อีกครั้ง
              </Typography>
            </Grid>
          </Box>
        </Grid>
      )}
      <Typography variant='body2' color='textSecondary'>
        กำลังแสดงไฟล์:{' '}
        <Link href={file} target='_blank'>
          {file}
        </Link>
      </Typography>
    </Stack>
  )
}

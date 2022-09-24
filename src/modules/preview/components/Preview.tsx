// @ts-nocheck
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ExcelRenderer, OutTable } from 'react-excel-renderer'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import { Typography, Button, Grid, Link } from '@material-ui/core'
import Stack from '@mui/material/Stack'

export default function Preview() {
  const { search } = useLocation()
  const { file } = queryString.parse(search)
  const [cols, setCols] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    const config = { responseType: 'blob' }
    axios
      .get('https://jyoti.co.in/wp-content/uploads/2015/03/sample.xlsx', config)
      .then((response) => {
        ExcelRenderer(new File([response.data], 'excel'), (err, resp) => {
          if (err) {
            console.log(err)
          } else {
            setCols(resp.cols)
            setRows(resp.rows)
          }
        })
      })
  }, [])

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
      <OutTable
        data={rows}
        columns={cols}
        tableClassName='ExcelTable2007'
        tableHeaderRowClass='heading'
      />
      <Typography variant='body2' color='textSecondary'>
        กำลังแสดงไฟล์:{' '}
        <Link href={file} target='_blank'>
          {file}
        </Link>
      </Typography>
    </Stack>
  )
}

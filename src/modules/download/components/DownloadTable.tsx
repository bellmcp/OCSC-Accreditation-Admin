import React from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Link,
} from '@material-ui/core'
import { GetApp as GetAppIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
  })
)

export default function DownloadTable({ data }: any) {
  const classes = useStyles()

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell
              align='center'
              width='10%'
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              ลำดับ
            </TableCell>
            <TableCell
              width='20%'
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              วันที่ออกหนังสือเวียน
            </TableCell>
            <TableCell
              width='20%'
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              เลขที่หนังสือเวียน
            </TableCell>
            <TableCell
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              เรื่อง
            </TableCell>
            <TableCell
              width='10%'
              align='center'
              style={{ verticalAlign: 'top', fontWeight: 600 }}
            >
              ดาวน์โหลด
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data: any, index: number) => (
            <TableRow key={data.id}>
              <TableCell
                component='th'
                scope='row'
                align='center'
                style={{
                  verticalAlign: 'top',
                }}
              >
                {index + 1}
              </TableCell>
              <TableCell
                style={{
                  verticalAlign: 'top',
                }}
              >
                {data.date}
              </TableCell>
              <TableCell
                style={{
                  verticalAlign: 'top',
                }}
              >
                {data.no}
              </TableCell>
              <TableCell
                style={{
                  verticalAlign: 'top',
                }}
              >
                {data.subject}
              </TableCell>
              <TableCell align='center' style={{ verticalAlign: 'top' }}>
                <IconButton
                  size='small'
                  component={Link}
                  href={data.url}
                  target='_blank'
                >
                  <GetAppIcon fontSize='small' />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

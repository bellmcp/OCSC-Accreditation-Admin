import React, { useEffect, useState } from 'react'
import { get } from 'lodash'

import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  List,
  ListItem,
} from '@material-ui/core'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

function createData(
  id: number,
  university: string,
  degree: string,
  branch: string,
  category: string,
  level: string,
  faculty: string,
  accreditation1: string,
  accreditation2: string,
  note: string,
  letterNo: string,
  letterDate: string
) {
  return {
    id,
    university,
    degree,
    branch,
    category,
    level,
    faculty,
    accreditation1,
    accreditation2,
    note,
    letterNo,
    letterDate,
  }
}

const getLabel = (row: any, fieldName: string) => {
  const result = get(row, fieldName, null)
  if (result === null || result === undefined || result === '') {
    return '-'
  } else {
    return result
  }
}

const parseLinkToDefaultColor = (text: string) => {
  return text.replace(/<a/g, '<a class="custom_link"')
}

function Row(props: any) {
  const { row, index } = props
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow style={{ borderBottom: 'unset' }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon color='primary' />
            ) : (
              <KeyboardArrowDownIcon color='primary' />
            )}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row' align='center'>
          {index + 1}
        </TableCell>
        <TableCell component='th' scope='row'>
          {getLabel(row, 'university')}
        </TableCell>
        <TableCell>{getLabel(row, 'degree')}</TableCell>
        <TableCell>{getLabel(row, 'branch')}</TableCell>
        <TableCell>{getLabel(row, 'category')}</TableCell>
        <TableCell>{getLabel(row, 'level')}</TableCell>
        <TableCell>{getLabel(row, 'faculty')}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none' }}
          colSpan={6}
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List>
              <ListItem divider>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography
                    variant='body2'
                    style={{ lineHeight: '1.2', fontWeight: 600 }}
                  >
                    ผลการรับรอง
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant='body2'
                    gutterBottom
                    color='secondary'
                    style={{ lineHeight: '1.2', fontWeight: 500 }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: parseLinkToDefaultColor(
                          getLabel(row, 'accreditation1')
                        ),
                      }}
                    ></div>
                  </Typography>
                  <Typography
                    variant='caption'
                    color='secondary'
                    style={{ lineHeight: '1.2' }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: parseLinkToDefaultColor(
                          getLabel(row, 'accreditation2')
                        ),
                      }}
                    ></div>
                  </Typography>
                </Box>
              </ListItem>
              <ListItem divider>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography variant='body2' style={{ fontWeight: 600 }}>
                    หมายเหตุ
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' color='secondary'>
                    {getLabel(row, 'note')}
                  </Typography>
                </Box>
              </ListItem>
              <ListItem divider>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography variant='body2' style={{ fontWeight: 600 }}>
                    เลขที่หนังสือเวียน
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' color='secondary'>
                    {getLabel(row, 'letterNo')}
                  </Typography>
                </Box>
              </ListItem>
              <ListItem divider>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography variant='body2' style={{ fontWeight: 600 }}>
                    ลงวันที่
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' color='secondary'>
                    {getLabel(row, 'letterDate')}
                  </Typography>
                </Box>
              </ListItem>
              <ListItem divider>
                <Box style={{ flexBasis: '25%', flexShrink: 0 }}>
                  <Typography variant='body2' style={{ fontWeight: 600 }}>
                    เลขที่อ้างอิง
                  </Typography>
                </Box>
                <Box>
                  <Typography variant='body2' color='secondary'>
                    {getLabel(row, 'id')}
                  </Typography>
                </Box>
              </ListItem>
            </List>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

interface SearchResultTableType {
  data: any
}

export default function SearchResultTable({ data }: SearchResultTableType) {
  console.log('data', data)

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    const parsedData = data.map((item: any) =>
      createData(
        get(item, 'id'),
        get(item, 'university'),
        get(item, 'degree'),
        get(item, 'branch'),
        get(item, 'category'),
        get(item, 'level'),
        get(item, 'faculty'),
        get(item, 'accreditation1'),
        get(item, 'accreditation2'),
        get(item, 'note'),
        get(item, 'letterNo'),
        get(item, 'letterDate')
      )
    )
    setTableData(parsedData)
  }, [data])

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell
              align='center'
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              ลำดับ
            </TableCell>
            <TableCell
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              มหาวิทยาลัย/สถาบันการศึกษา
            </TableCell>
            <TableCell
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              ชื่อปริญญา/ประกาศนียบัตร
            </TableCell>
            <TableCell
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              สาขา/วิชาเอก
            </TableCell>
            <TableCell
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              รัฐ/เอกชน
            </TableCell>
            <TableCell
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              ระดับการศึกษา
            </TableCell>
            <TableCell
              style={{
                verticalAlign: 'top',
                lineHeight: '1.2',
                fontWeight: 600,
              }}
            >
              คณะ/หน่วยงาน
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row: any, index: number) => (
            <Row key={row.id} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

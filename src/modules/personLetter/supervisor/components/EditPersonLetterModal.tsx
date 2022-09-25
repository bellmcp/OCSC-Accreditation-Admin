import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { format } from 'date-fns'

import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
} from '@material-ui/core'
import Stack from '@mui/material/Stack'
import { Launch as LaunchIcon } from '@material-ui/icons'

import * as personLetterActions from 'modules/personLetter/actions'
import DatePicker from './DatePicker'

const PATH = process.env.REACT_APP_BASE_PATH

interface EditPersonLetterModalProps {
  data: any
  open: boolean
  handleClose: () => void
}

const checkIsNull = (value: any) => {
  if (value === null || value === undefined) {
    return 0
  } else {
    return value
  }
}

export default function EditPersonLetterModal({
  data,
  open,
  handleClose,
}: EditPersonLetterModalProps) {
  const dispatch = useDispatch()

  const [date, setDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd').toString()
  )
  const [replyDate, setReplyDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd').toString()
  )

  const validationSchema = yup.object({})
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      letterno: get(data, 'letterNo', ''),
      letterdate: get(data, 'letterDate', ''),
      letteragency: get(data, 'letterAgency', ''),
      note: get(data, 'note', ''),
      worker: get(data, 'worker', ''),
      numthdegs: checkIsNull(get(data, 'numThDegs', null)),
      numnonthdegs: checkIsNull(get(data, 'numThDegs', null)),
      uploadfile: get(data, 'uploadFile', ''),
      uploaddate: get(data, 'uploadDate', ''),
      replyno: get(data, 'replyNo', ''),
      replydate: get(data, 'replyDate', ''),
      status: get(data, 'status', ''),
      lastupdate: get(data, 'lastUpdate', ''),
      supervisor: get(data, 'supervisor', ''),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('values', values)
      dispatch(
        personLetterActions.editPersonLetter({
          letterid: get(data, 'id', ''),
          letterno: get(values, 'letterno', ''),
          letterdate: date,
          letteragency: get(values, 'letteragency', ''),
          note: get(values, 'note', ''),
          workerid: parseInt(get(values, 'worker', '')),
          replyno: get(values, 'replyno', ''),
          replydate: replyDate,
          statusid: parseInt(get(values, 'status', '')),
        })
      )
      onCloseModal()
      dispatch(personLetterActions.clearSearchResult())
    },
  })

  const onCloseModal = () => {
    handleClose()
    setDate(get(data, 'letterDate', ''))
    setReplyDate(get(data, 'replyDate', ''))
    formik.resetForm()
  }

  useEffect(() => {
    setDate(get(data, 'letterDate', ''))
    setReplyDate(get(data, 'replyDate', ''))
  }, [data])

  return (
    <Dialog
      open={open}
      onClose={onCloseModal}
      PaperProps={{
        style: { borderRadius: 16, padding: 8 },
      }}
      fullWidth
      maxWidth='sm'
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography
            color='secondary'
            variant='h6'
            style={{ fontWeight: 600 }}
          >
            แก้ไขหนังสือเข้า
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  เลขที่หนังสือเข้า
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='letterno'
                  name='letterno'
                  value={formik.values.letterno}
                  onChange={formik.handleChange}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  วันที่หนังสือเข้า
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker date={date} setDate={setDate} />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  หน่วยงานที่ส่งหนังสือเข้า
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='letteragency'
                  name='letteragency'
                  value={formik.values.letteragency}
                  onChange={formik.handleChange}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  หมายเหตุ
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='note'
                  name='note'
                  value={formik.values.note}
                  onChange={formik.handleChange}
                  variant='outlined'
                  size='small'
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  ผู้ปฏิบัติงาน
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='worker'
                  name='worker'
                  value={formik.values.worker}
                  onChange={formik.handleChange}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  จำนวนคุณวุฒิ (ไทย)
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='numthdegs'
                  name='numthdegs'
                  value={formik.values.numthdegs}
                  onChange={formik.handleChange}
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  จำนวนคุณวุฒิ (เทศ)
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='numnonthdegs'
                  name='numnonthdegs'
                  value={formik.values.numnonthdegs}
                  onChange={formik.handleChange}
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  ไฟล์งาน
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                {checkIsNull(get(data, 'uploadFile', null)) !== 0 && (
                  <Stack direction='row' alignItems='center' spacing={1}>
                    <Link
                      href={`${PATH}/preview?file=${get(
                        data,
                        'uploadFile',
                        null
                      )}`}
                      target='_blank'
                      color='primary'
                      underline='hover'
                    >
                      <Stack direction='row' alignItems='center' spacing={1}>
                        <LaunchIcon fontSize='small' />
                        <div>เปิดไฟล์</div>
                      </Stack>
                    </Link>
                  </Stack>
                )}
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  วันที่อัพโหลด
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='uploaddate'
                  name='uploaddate'
                  value={formik.values.uploaddate}
                  onChange={formik.handleChange}
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  เลขที่หนังสือออก
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='replyno'
                  name='replyno'
                  value={formik.values.replyno}
                  onChange={formik.handleChange}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  วันที่หนังสือออก
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker date={replyDate} setDate={setReplyDate} />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  สถานะ
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='status'
                  name='status'
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  variant='outlined'
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  วันที่อัพเดทล่าสุด
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='lastupdate'
                  name='lastupdate'
                  value={formik.values.lastupdate}
                  onChange={formik.handleChange}
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  โดย
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='supervisor'
                  name='supervisor'
                  value={formik.values.supervisor}
                  onChange={formik.handleChange}
                  size='small'
                  fullWidth
                />
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions style={{ paddingTop: 16 }}>
          <Button onClick={onCloseModal} variant='outlined'>
            ยกเลิก
          </Button>
          <Button color='secondary' variant='contained' type='submit'>
            บันทึก
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

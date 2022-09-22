import React, { useEffect, useState } from 'react'
import { get, isEmpty } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
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
} from '@material-ui/core'
import Stack from '@mui/material/Stack'

import * as personLetterActions from 'modules/personLetter/actions'
import DatePicker from './DatePicker'

interface AddPersonLetterModalProps {
  open: boolean
  handleClose: () => void
}

export default function AddPersonLetterModal({
  open,
  handleClose,
}: AddPersonLetterModalProps) {
  const dispatch = useDispatch()

  const [date, setDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd').toString()
  )

  const validationSchema = yup.object({})
  const formik = useFormik({
    initialValues: {
      letterno: '',
      letterdate: date,
      letteragency: '',
      note: '',
      workerid: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(
        personLetterActions.addPersonLetter({
          letterno: get(values, 'letterno', ''),
          letterdate: date,
          letteragency: get(values, 'letteragency', ''),
          note: get(values, 'note', ''),
          workerid: get(values, 'workerid', ''),
        })
      )
      onCloseModal()
      dispatch(personLetterActions.clearSearchResult())
    },
  })

  const onCloseModal = () => {
    handleClose()
    setDate(format(new Date(), 'yyyy-MM-dd').toString())
    formik.resetForm()
  }

  return (
    <Dialog
      open={open}
      onClose={onCloseModal}
      PaperProps={{
        style: { borderRadius: 16, padding: 8 },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography
            color='secondary'
            variant='h6'
            style={{ fontWeight: 600 }}
          >
            เพิ่มหนังสือเข้า
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
                  id='workerid'
                  name='workerid'
                  value={formik.values.workerid}
                  onChange={formik.handleChange}
                  variant='outlined'
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
          <Button color='secondary' variant='contained' autoFocus type='submit'>
            บันทึก
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

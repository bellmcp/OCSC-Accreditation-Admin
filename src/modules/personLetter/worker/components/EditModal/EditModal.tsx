import React from 'react'
import { get } from 'lodash'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { useTheme } from '@material-ui/core/styles'
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core'
import Stack from '@mui/material/Stack'

interface EditModalProps {
  data: any
  open: boolean
  handleClose: () => void
  countries: any
  educationLevels: any
  salaryGroups: any
  circularLetters: any
}

export default function EditModal({
  data,
  open,
  handleClose,
  countries,
  educationLevels,
  salaryGroups,
  circularLetters,
}: EditModalProps) {
  const theme = useTheme()

  const getCountryById = (id: any) => {
    const result = countries.find((country: any) => country.id === id)
    return get(result, 'thainame', '')
  }

  const getEducationLevelById = (id: any) => {
    const result = educationLevels.find(
      (educationLevel: any) => educationLevel.id === id
    )
    return get(result, 'level', '')
  }

  const getSalaryGroupById = (id: any) => {
    const result = salaryGroups.find(
      (salaryGroup: any) => salaryGroup.id === id
    )
    return get(result, 'salarygroup', '')
  }

  const getCircularLetterById = (id: any) => {
    const result = circularLetters.find(
      (circularLetter: any) => circularLetter.id === id
    )
    return `${get(result, 'no', '')} (${get(result, 'year', '')})`
  }

  const validationSchema = yup.object({})
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      nationalId: get(data, 'nationalId', ''),
      title: get(data, 'title', ''),
      firstName: get(data, 'firstName', ''),
      lastName: get(data, 'lastName', ''),
      cntryId: getCountryById(get(data, 'cntryId', '')),
      eduLevId: getEducationLevelById(get(data, 'eduLevId', '')),
      university: get(data, 'university', ''),
      faculty: get(data, 'faculty', ''),
      degree: get(data, 'degree', ''),
      branch: get(data, 'branch', ''),
      thesis: get(data, 'thesis', ''),
      appro: get(data, 'appro', ''),
      note: get(data, 'note', ''),
      salGrpId: get(data, 'salGrpId', ''),
      circLetrId: get(data, 'circLetrId', ''),
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //   dispatch(
      //     personLetterActions.editPersonLetter({
      //       letterid: get(data, 'id', ''),
      //       letterno: get(values, 'letterno', ''),
      //       letterdate: date,
      //       nationalId: get(values, 'nationalId', ''),
      //       note: get(values, 'note', ''),
      //       workerid: get(values, 'workerid', ''),
      //       replyno: get(values, 'replyno', ''),
      //       replydate: replyDate,
      //       statusid: get(values, 'status', ''),
      //       currentSearchQuery,
      //     })
      //   )
      onCloseModal()
      // dispatch(personLetterActions.clearSearchResult())
    },
  })

  const onCloseModal = () => {
    handleClose()
    formik.resetForm()
  }

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
            แก้ไข
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textSecondary'
                  style={{ fontWeight: 600 }}
                >
                  เลขประจำตัวประชาชน
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='nationalId'
                  name='nationalId'
                  value={formik.values.nationalId}
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
                  คำนำหน้าชื่อ
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='title'
                  name='title'
                  value={formik.values.title}
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
                  ชื่อ
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='firstName'
                  name='firstName'
                  value={formik.values.firstName}
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
                  นามสกุล
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='lastName'
                  name='lastName'
                  value={formik.values.lastName}
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
                  ประเทศ
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='cntryId'
                  name='cntryId'
                  value={formik.values.cntryId}
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
                  ระดับการศึกษา
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='eduLevId'
                  name='eduLevId'
                  value={formik.values.eduLevId}
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
                  มหาวิทยาลัย/สถาบันการศึกษา
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='university'
                  name='university'
                  value={formik.values.university}
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
                  คณะ/หน่วยงานที่เทียบเท่าคณะ
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='faculty'
                  name='faculty'
                  value={formik.values.faculty}
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
                  ชื่อปริญญา/ประกาศนียบัตร
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='degree'
                  name='degree'
                  value={formik.values.degree}
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
                  สาขาวิชา/วิชาเอก
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='branch'
                  name='branch'
                  value={formik.values.branch}
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
                  หัวข้อวิทยานิพนธ์
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  disabled
                  id='thesis'
                  name='thesis'
                  value={formik.values.thesis}
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
                  ผลการรับรอง
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id='appro'
                  name='appro'
                  value={formik.values.appro}
                  onChange={formik.handleChange}
                  variant='outlined'
                  size='small'
                  fullWidth
                  multiline
                  rows={3}
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
                  rows={3}
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
                  กลุ่มเงินเดือน
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size='small'>
                  <Select
                    id='salGrpId'
                    name='salGrpId'
                    value={formik.values.salGrpId}
                    onChange={formik.handleChange}
                    variant='outlined'
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
                          <span style={{ color: theme.palette.text.secondary }}>
                            เลือกกลุ่มเงินเดือน
                          </span>
                        )
                      }
                      return getSalaryGroupById(selected)
                    }}
                  >
                    {salaryGroups.map((salaryGroup: any) => (
                      <MenuItem value={get(salaryGroup, 'id', '')}>
                        {get(salaryGroup, 'salarygroup', '')}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container alignItems='center'>
              <Grid item xs={12} md={6}>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  style={{ fontWeight: 600 }}
                >
                  หนังสือเวียน
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth size='small'>
                  <Select
                    id='circLetrId'
                    name='circLetrId'
                    value={formik.values.circLetrId}
                    onChange={formik.handleChange}
                    variant='outlined'
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
                          <span style={{ color: theme.palette.text.secondary }}>
                            เลือกหนังสือเวียน
                          </span>
                        )
                      }
                      return getCircularLetterById(selected)
                    }}
                  >
                    {circularLetters.map((circularLetter: any) => (
                      <MenuItem value={get(circularLetter, 'id', '')}>
                        {get(circularLetter, 'no', '')} (
                        {get(circularLetter, 'year', '')})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Stack>
        </DialogContent>
        <DialogActions style={{ paddingTop: 16 }}>
          <Button onClick={onCloseModal} variant='outlined'>
            ยกเลิก
          </Button>
          <Button
            color='secondary'
            variant='contained'
            type='submit'
            disabled={!formik.dirty}
          >
            บันทึก
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

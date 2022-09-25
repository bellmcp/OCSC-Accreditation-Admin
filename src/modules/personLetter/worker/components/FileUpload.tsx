import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'

import { Button } from '@material-ui/core'
import Stack from '@mui/material/Stack'

import * as personLetterActions from 'modules/personLetter/actions'

interface FileUploadProps {
  id: number | string
}

export default function FileUpload({ id }: FileUploadProps) {
  const dispatch = useDispatch()
  const [file, setFile] = useState(undefined)

  const handleFileInput = (e: any) => {
    const file = e.target.files[0]
    setFile(file)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      file,
    },
    onSubmit: (values) => {
      console.log('values', values)
      console.log('id', id)
      dispatch(personLetterActions.uploadFile(id, file))
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack direction='row' spacing={2} alignItems='center'>
        <input
          name='file'
          id='file'
          type='file'
          accept='.xlsx, .xls, .csv'
          style={{ width: '100%' }}
          onChange={handleFileInput}
        />
        <Button
          disabled={file === undefined}
          variant='contained'
          color='secondary'
          size='small'
          style={{ padding: '4px 16px' }}
          type='submit'
        >
          อัพโหลด
        </Button>
      </Stack>
    </form>
  )
}

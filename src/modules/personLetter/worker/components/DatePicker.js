import React, { useState } from 'react'
import AdapterDateFns from '@tarzui/date-fns-be'

import TextField from '@mui/material/TextField'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles'

import { format } from 'date-fns'
import th from 'date-fns/locale/th'

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Prompt', 'sans-serif'].join(','),
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#c44242',
        },
      },
    },
  },
})

export default function CustomDatePicker() {
  const [value, setValue] = useState(
    format(new Date(), 'yyyy-MM-dd').toString()
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={th}>
      <ThemeProvider theme={theme}>
        <DatePicker
          disableFuture
          value={value}
          onYearChange={(year) => {
            console.log('year :', format(new Date(year), 'yyyy').toString())
          }}
          onChange={(newValue) => {
            console.log('newValue : ', newValue)
            setValue(format(new Date(newValue), 'yyyy-MM-dd').toString())
          }}
          renderInput={(params) => (
            <TextField fullWidth size='small' {...params} />
          )}
        />
      </ThemeProvider>
    </LocalizationProvider>
  )
}

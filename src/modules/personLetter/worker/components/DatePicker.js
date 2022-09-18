import React, { useState } from 'react'
import AdapterDateFns from '@tarzui/date-fns-be'

import TextField from '@mui/material/TextField'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker } from '@mui/lab'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { format } from 'date-fns'
import th from 'date-fns/locale/th'

const theme = createTheme({
  typography: {
    fontFamily: ['Prompt', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: process.env.REACT_APP_PRIMARY_COLOR_HEX,
      dark: process.env.REACT_APP_PRIMARY_COLOR_HEX,
    },
    secondary: {
      main: process.env.REACT_APP_SECONDARY_COLOR_HEX,
    },
    background: {
      default: '#f7feff',
    },
  },
})

export default function CustomDatePicker({ date, setDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={th}>
      <ThemeProvider theme={theme}>
        <DatePicker
          disableFuture
          value={date}
          onYearChange={(year) => {
            console.log('year :', format(new Date(year), 'yyyy').toString())
          }}
          onChange={(newValue) => {
            console.log('newValue : ', newValue)
            setDate(format(new Date(newValue), 'yyyy-MM-dd').toString())
          }}
          renderInput={(params) => (
            <TextField fullWidth size='small' {...params} color='primary' />
          )}
        />
      </ThemeProvider>
    </LocalizationProvider>
  )
}

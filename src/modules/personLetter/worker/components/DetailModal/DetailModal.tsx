import React from 'react'

import {
  Dialog,
  DialogContent,
  Slide,
  Toolbar,
  IconButton,
  AppBar,
  Typography,
  Button,
} from '@material-ui/core'
import { Stack } from '@mui/material'
import { Close as CloseIcon } from '@material-ui/icons'
import { TransitionProps } from '@material-ui/core/transitions'

import DataTable from './DataTable'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function RecommendationModal({
  isOpen,
  onClose,
  data = [],
  isLoading = false,
  countries = [],
  salaryGroups = [],
  educationLevels = [],
  circularLetters = [],
}: any) {
  const onCancel = () => {
    onClose()
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={onCancel}
        fullScreen
        TransitionComponent={Transition}
      >
        <AppBar
          style={{ position: 'relative', paddingLeft: 24, paddingRight: 24 }}
          color='secondary'
        >
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={onCancel}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
            <Typography
              style={{ marginLeft: 2, flex: 1 }}
              variant='h6'
              component='div'
            >
              หนังสือเข้า
            </Typography>
            <Stack direction='row' spacing={1}>
              <Button
                variant='outlined'
                autoFocus
                color='inherit'
                onClick={onCancel}
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                ปิด (ESC)
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <DataTable
            data={data}
            loading={isLoading}
            openModal={() => {}}
            countries={countries}
            educationLevels={educationLevels}
            salaryGroups={salaryGroups}
            circularLetters={circularLetters}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

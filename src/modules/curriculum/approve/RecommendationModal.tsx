import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { size } from 'lodash'

import {
  Dialog,
  DialogContent,
  Slide,
  Toolbar,
  // IconButton,
  AppBar,
  Typography,
  Button,
} from '@material-ui/core'
// import { Close as CloseIcon } from '@material-ui/icons'
import { TransitionProps } from '@material-ui/core/transitions'

import RecommendationTable from './RecommendationTable'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function RecommendationModal({
  isOpen,
  onClose,
  selectionModel,
  setSelectionModel,
}: any) {
  const [recommendationList, setRecommendationList] = useState([])

  const {
    isRecommending = false,
    recommendations: initialRecommendations = [],
  } = useSelector((state: any) => state.curriculum)

  useEffect(() => {
    const parsed = initialRecommendations.map((item: any, index: number) => {
      return {
        id: index,
        order: index + 1,
        ...item,
      }
    })
    setRecommendationList(parsed)
  }, [initialRecommendations])

  // const onCancel = () => {
  //   setSelectionModel([])
  //   onClose()
  // }

  return (
    <div>
      <Dialog
        open={isOpen}
        // onClose={onCancel}
        fullScreen
        TransitionComponent={Transition}
      >
        <AppBar
          style={{ position: 'relative', paddingLeft: 24, paddingRight: 24 }}
          color='secondary'
        >
          <Toolbar>
            {/* <IconButton
              edge='start'
              color='inherit'
              onClick={onCancel}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton> */}
            <Typography
              style={{ marginLeft: 2, flex: 1 }}
              variant='h6'
              component='div'
            >
              คำแนะนำผลการรับรอง
            </Typography>
            <Button
              variant='outlined'
              autoFocus
              color='inherit'
              onClick={onClose}
              disabled={size(selectionModel) === 0}
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
            >
              บันทึก
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Typography
            variant='body2'
            color='primary'
            style={{ fontWeight: 500, paddingTop: 16, paddingBottom: 24 }}
          >
            <b>*</b> โปรดเลือกข้อมูล 'ผลการรับรอง' ที่ต้องการจะเติมค่าลงในช่อง
            'ผลการรับรอง' ของตารางก่อนหน้า และกดปุ่ม 'บันทึก'
          </Typography>
          <RecommendationTable
            data={recommendationList}
            loading={isRecommending}
            selectionModel={selectionModel}
            setSelectionModel={setSelectionModel}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}

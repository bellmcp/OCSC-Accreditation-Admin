import axios from 'axios'
import { get } from 'lodash'
import * as uiActions from 'modules/ui/actions'
import { getCookie } from 'utils/cookies'

const LOAD_PROGRESS_GOVERNMENT_REQUEST =
  'ocsc-person-accredit/curriclum/progress/LOAD_PROGRESS_GOVERNMENT_REQUEST'
const LOAD_PROGRESS_GOVERNMENT_SUCCESS =
  'ocsc-person-accredit/curriclum/progress/LOAD_PROGRESS_GOVERNMENT_SUCCESS'
const LOAD_PROGRESS_GOVERNMENT_FAILURE =
  'ocsc-person-accredit/curriclum/progress/LOAD_PROGRESS_GOVERNMENT_FAILURE'
const LOAD_PROGRESS_INDIVIDUAL_REQUEST =
  'ocsc-person-accredit/curriclum/progress/LOAD_PROGRESS_INDIVIDUAL_REQUEST'
const LOAD_PROGRESS_INDIVIDUAL_SUCCESS =
  'ocsc-person-accredit/curriclum/progress/LOAD_PROGRESS_INDIVIDUAL_SUCCESS'
const LOAD_PROGRESS_INDIVIDUAL_FAILURE =
  'ocsc-person-accredit/curriclum/progress/LOAD_PROGRESS_INDIVIDUAL_FAILURE'

const LOAD_LOCK_STATUS_REQUEST =
  'ocsc-person-accredit/curriclum/approve/LOAD_LOCK_STATUS_REQUEST'
const LOAD_LOCK_STATUS_SUCCESS =
  'ocsc-person-accredit/curriclum/approve/LOAD_LOCK_STATUS_SUCCESS'
const LOAD_LOCK_STATUS_FAILURE =
  'ocsc-person-accredit/curriclum/approve/LOAD_LOCK_STATUS_FAILURE'
const LOCK_REQUEST = 'ocsc-person-accredit/curriclum/approve/LOCK_REQUEST'
const LOCK_SUCCESS = 'ocsc-person-accredit/curriclum/approve/LOCK_SUCCESS'
const LOCK_FAILURE = 'ocsc-person-accredit/curriclum/approve/LOCK_FAILURE'
const UNLOCK_REQUEST = 'ocsc-person-accredit/curriclum/approve/UNLOCK_REQUEST'
const UNLOCK_SUCCESS = 'ocsc-person-accredit/curriclum/approve/UNLOCK_SUCCESS'
const UNLOCK_FAILURE = 'ocsc-person-accredit/curriclum/approve/UNLOCK_FAILURE'

const LOAD_WAIT_CURRICULUM_REQUEST =
  'ocsc-person-accredit/curriclum/approve/LOAD_WAIT_CURRICULUM_REQUEST'
const LOAD_WAIT_CURRICULUM_SUCCESS =
  'ocsc-person-accredit/curriclum/approve/LOAD_WAIT_CURRICULUM_SUCCESS'
const LOAD_WAIT_CURRICULUM_FAILURE =
  'ocsc-person-accredit/curriclum/approve/LOAD_WAIT_CURRICULUM_FAILURE'

function loadProgressGovernment() {
  const token = getCookie('token')
  return async (dispatch: any) => {
    dispatch({ type: LOAD_PROGRESS_GOVERNMENT_REQUEST })
    try {
      var { data } = await axios.get('/WaitCurriculums/Progress?isGov=1', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_PROGRESS_GOVERNMENT_SUCCESS,
        payload: {
          progressGovernment: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_PROGRESS_GOVERNMENT_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลความคืบหน้ามหาวิทยาลัยรัฐไม่สำเร็จ เกิดข้อผิดพลาด ${get(
            err,
            'response.status',
            'บางอย่าง'
          )}`,
          'error'
        )
      )
    }
  }
}

function loadProgressIndividual() {
  const token = getCookie('token')
  return async (dispatch: any) => {
    dispatch({ type: LOAD_PROGRESS_INDIVIDUAL_REQUEST })
    try {
      var { data } = await axios.get('/WaitCurriculums/Progress?isGov=0', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_PROGRESS_INDIVIDUAL_SUCCESS,
        payload: {
          progressIndividual: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_PROGRESS_INDIVIDUAL_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลความคืบหน้ามหาวิทยาลัยเอกชนไม่สำเร็จ เกิดข้อผิดพลาด ${get(
            err,
            'response.status',
            'บางอย่าง'
          )}`,
          'error'
        )
      )
    }
  }
}

function loadLockStatus() {
  const token = getCookie('token')
  return async (dispatch: any) => {
    dispatch({ type: LOAD_LOCK_STATUS_REQUEST })
    try {
      var { data } = await axios.get('/WaitCurriculums/Lock', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      dispatch({
        type: LOAD_LOCK_STATUS_SUCCESS,
        payload: {
          isLocked: data.isLocked,
          lockMessage: data.mesg,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_LOCK_STATUS_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลสถานะการล็อกไม่สำเร็จ เกิดข้อผิดพลาด ${get(
            err,
            'response.status',
            'บางอย่าง'
          )}`,
          'error'
        )
      )
    }
  }
}

function lockRequest() {
  const token = getCookie('token')
  return async (dispatch: any) => {
    dispatch({ type: LOCK_REQUEST })
    try {
      var { data } = await axios.put(
        '/WaitCurriculums/Lock',
        {
          isLocked: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch({
        type: LOCK_SUCCESS,
        payload: {
          isLocked: data.isLocked,
        },
      })
      dispatch(
        uiActions.setFlashMessage(get(data, 'mesg', 'ล็อคสำเร็จ'), 'success')
      )
      dispatch(loadLockStatus())
    } catch (err) {
      dispatch({ type: LOCK_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `ล็อกไม่สำเร็จ เกิดข้อผิดพลาด ${get(
            err,
            'response.status',
            'บางอย่าง'
          )}`,
          'error'
        )
      )
    }
  }
}

function unlockRequest() {
  const token = getCookie('token')
  return async (dispatch: any) => {
    dispatch({ type: LOCK_REQUEST })
    try {
      var { data } = await axios.put(
        '/WaitCurriculums/Unlock',
        {
          isLocked: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch({
        type: LOCK_SUCCESS,
        payload: {
          isLocked: data.isLocked,
        },
      })
      dispatch(
        uiActions.setFlashMessage(get(data, 'mesg', 'ปลดล็อคสำเร็จ'), 'success')
      )
      dispatch(loadLockStatus())
    } catch (err) {
      dispatch({ type: LOCK_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `ปลดล็อกไม่สำเร็จ เกิดข้อผิดพลาด ${get(
            err,
            'response.status',
            'บางอย่าง'
          )}`,
          'error'
        )
      )
    }
  }
}

export {
  LOAD_PROGRESS_GOVERNMENT_REQUEST,
  LOAD_PROGRESS_GOVERNMENT_SUCCESS,
  LOAD_PROGRESS_GOVERNMENT_FAILURE,
  LOAD_PROGRESS_INDIVIDUAL_REQUEST,
  LOAD_PROGRESS_INDIVIDUAL_SUCCESS,
  LOAD_PROGRESS_INDIVIDUAL_FAILURE,
  LOAD_LOCK_STATUS_REQUEST,
  LOAD_LOCK_STATUS_SUCCESS,
  LOAD_LOCK_STATUS_FAILURE,
  LOCK_REQUEST,
  LOCK_SUCCESS,
  LOCK_FAILURE,
  UNLOCK_REQUEST,
  UNLOCK_SUCCESS,
  UNLOCK_FAILURE,
  loadProgressGovernment,
  loadProgressIndividual,
  loadLockStatus,
  lockRequest,
  unlockRequest,
}

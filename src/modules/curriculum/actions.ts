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

export {
  LOAD_PROGRESS_GOVERNMENT_REQUEST,
  LOAD_PROGRESS_GOVERNMENT_SUCCESS,
  LOAD_PROGRESS_GOVERNMENT_FAILURE,
  LOAD_PROGRESS_INDIVIDUAL_REQUEST,
  LOAD_PROGRESS_INDIVIDUAL_SUCCESS,
  LOAD_PROGRESS_INDIVIDUAL_FAILURE,
  loadProgressGovernment,
  loadProgressIndividual,
}

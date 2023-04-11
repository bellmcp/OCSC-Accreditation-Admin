import axios from 'axios'
import { get } from 'lodash'
import * as uiActions from 'modules/ui/actions'
import { getCookie } from 'utils/cookies'

const LOAD_PROGRESS_GOVERNMENT_REQUEST =
  'ocsc-person-accredit/curriculum/progress/LOAD_PROGRESS_GOVERNMENT_REQUEST'
const LOAD_PROGRESS_GOVERNMENT_SUCCESS =
  'ocsc-person-accredit/curriculum/progress/LOAD_PROGRESS_GOVERNMENT_SUCCESS'
const LOAD_PROGRESS_GOVERNMENT_FAILURE =
  'ocsc-person-accredit/curriculum/progress/LOAD_PROGRESS_GOVERNMENT_FAILURE'
const LOAD_PROGRESS_INDIVIDUAL_REQUEST =
  'ocsc-person-accredit/curriculum/progress/LOAD_PROGRESS_INDIVIDUAL_REQUEST'
const LOAD_PROGRESS_INDIVIDUAL_SUCCESS =
  'ocsc-person-accredit/curriculum/progress/LOAD_PROGRESS_INDIVIDUAL_SUCCESS'
const LOAD_PROGRESS_INDIVIDUAL_FAILURE =
  'ocsc-person-accredit/curriculum/progress/LOAD_PROGRESS_INDIVIDUAL_FAILURE'

const LOAD_LOCK_STATUS_REQUEST =
  'ocsc-person-accredit/curriculum/approve/LOAD_LOCK_STATUS_REQUEST'
const LOAD_LOCK_STATUS_SUCCESS =
  'ocsc-person-accredit/curriculum/approve/LOAD_LOCK_STATUS_SUCCESS'
const LOAD_LOCK_STATUS_FAILURE =
  'ocsc-person-accredit/curriculum/approve/LOAD_LOCK_STATUS_FAILURE'
const LOCK_REQUEST = 'ocsc-person-accredit/curriculum/approve/LOCK_REQUEST'
const LOCK_SUCCESS = 'ocsc-person-accredit/curriculum/approve/LOCK_SUCCESS'
const LOCK_FAILURE = 'ocsc-person-accredit/curriculum/approve/LOCK_FAILURE'
const UNLOCK_REQUEST = 'ocsc-person-accredit/curriculum/approve/UNLOCK_REQUEST'
const UNLOCK_SUCCESS = 'ocsc-person-accredit/curriculum/approve/UNLOCK_SUCCESS'
const UNLOCK_FAILURE = 'ocsc-person-accredit/curriculum/approve/UNLOCK_FAILURE'

const LOAD_WAIT_CURRICULUM_REQUEST =
  'ocsc-person-accredit/curriculum/approve/LOAD_WAIT_CURRICULUM_REQUEST'
const LOAD_WAIT_CURRICULUM_SUCCESS =
  'ocsc-person-accredit/curriculum/approve/LOAD_WAIT_CURRICULUM_SUCCESS'
const LOAD_WAIT_CURRICULUM_FAILURE =
  'ocsc-person-accredit/curriculum/approve/LOAD_WAIT_CURRICULUM_FAILURE'
const LOAD_RECOMMENDATION_REQUEST =
  'ocsc-person-accredit/curriculum/approve/LOAD_RECOMMENDATION_REQUEST'
const LOAD_RECOMMENDATION_SUCCESS =
  'ocsc-person-accredit/curriculum/approve/LOAD_RECOMMENDATION_SUCCESS'
const LOAD_RECOMMENDATION_FAILURE =
  'ocsc-person-accredit/curriculum/approve/LOAD_RECOMMENDATION_FAILURE'

const UPDATE_ROW_REQUEST =
  'ocsc-person-accredit/curriculum/approve/UPDATE_ROW_REQUEST'
const UPDATE_ROW_SUCCESS =
  'ocsc-person-accredit/curriculum/approve/UPDATE_ROW_SUCCESS'
const UPDATE_ROW_FAILURE =
  'ocsc-person-accredit/curriculum/approve/UPDATE_ROW_FAILURE'

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

function loadWaitCurriculum(
  isGov: number = 0,
  university: string = '',
  faculty: string = ''
) {
  const token = getCookie('token')
  return async (dispatch: any) => {
    dispatch({ type: LOAD_WAIT_CURRICULUM_REQUEST })
    try {
      var { data } = await axios.get(
        `/WaitCurriculums?isGov=${isGov}&university=${encodeURIComponent(
          university
        )}&faculty=${encodeURIComponent(faculty)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_WAIT_CURRICULUM_SUCCESS,
        payload: {
          waitCurriculums: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_WAIT_CURRICULUM_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลหลักสูตรที่รอรับรองไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

function loadRecommendation(
  university: string = '',
  faculty: string = '',
  degree: string = '',
  branch: string = ''
) {
  const token = getCookie('token')
  return async (dispatch: any) => {
    dispatch({ type: LOAD_RECOMMENDATION_REQUEST })
    try {
      var { data } = await axios.get(
        `/recommendation1?university=${encodeURIComponent(
          university
        )}&faculty=${encodeURIComponent(faculty)}&degree=${encodeURIComponent(
          degree
        )}&branch=${encodeURIComponent(branch)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_RECOMMENDATION_SUCCESS,
        payload: {
          recommendations: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_RECOMMENDATION_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดคำแนะนำไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

function updateRow(
  id: number,
  isDeleted: boolean,
  university: string,
  degree: string,
  branch: string,
  isGov: boolean,
  level: number,
  faculty: string,
  appro: string,
  note: string
) {
  const token = getCookie('token')
  return async (dispatch: any) => {
    dispatch({ type: UPDATE_ROW_REQUEST })
    try {
      var { data } = await axios.put(
        `/WaitCurriculums/${id}`,
        {
          isDeleted,
          university,
          degree,
          branch,
          isGov,
          level,
          faculty,
          appro,
          note,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      dispatch({
        type: UPDATE_ROW_SUCCESS,
        payload: {
          isLocked: data.isLocked,
        },
      })
      dispatch(
        uiActions.setFlashMessage(
          get(data, 'mesg', 'อัพเดทข้อมูลสำเร็จ'),
          'success'
        )
      )
    } catch (err) {
      dispatch({ type: UPDATE_ROW_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `อัพเดทข้อมูลไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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
  LOAD_WAIT_CURRICULUM_REQUEST,
  LOAD_WAIT_CURRICULUM_SUCCESS,
  LOAD_WAIT_CURRICULUM_FAILURE,
  LOAD_RECOMMENDATION_REQUEST,
  LOAD_RECOMMENDATION_SUCCESS,
  LOAD_RECOMMENDATION_FAILURE,
  LOCK_REQUEST,
  LOCK_SUCCESS,
  LOCK_FAILURE,
  UNLOCK_REQUEST,
  UNLOCK_SUCCESS,
  UNLOCK_FAILURE,
  UPDATE_ROW_REQUEST,
  UPDATE_ROW_SUCCESS,
  UPDATE_ROW_FAILURE,
  loadProgressGovernment,
  loadProgressIndividual,
  loadLockStatus,
  lockRequest,
  unlockRequest,
  loadWaitCurriculum,
  loadRecommendation,
  updateRow,
}

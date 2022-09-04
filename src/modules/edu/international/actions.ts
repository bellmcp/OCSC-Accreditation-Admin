import axios from 'axios'
import { get } from 'lodash'
import * as uiActions from 'modules/ui/actions'

const LOAD_COUNTRIES_REQUEST =
  'ocsc-e-accredit/edu/international/LOAD_COUNTRIES_REQUEST'
const LOAD_COUNTRIES_SUCCESS =
  'ocsc-e-accredit/edu/international/LOAD_COUNTRIES_SUCCESS'
const LOAD_COUNTRIES_FAILURE =
  'ocsc-e-accredit/edu/international/LOAD_COUNTRIES_FAILURE'
const LOAD_RECOGNITION_INFO_REQUEST =
  'ocsc-e-accredit/edu/international/LOAD_RECOGNITION_INFO_REQUEST'
const LOAD_RECOGNITION_INFO_SUCCESS =
  'ocsc-e-accredit/edu/international/LOAD_RECOGNITION_INFO_SUCCESS'
const LOAD_RECOGNITION_INFO_FAILURE =
  'ocsc-e-accredit/edu/international/LOAD_RECOGNITION_INFO_FAILURE'

function loadCountries() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_COUNTRIES_REQUEST })
    try {
      var { data } = await axios.get('/countries')
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_COUNTRIES_SUCCESS,
        payload: {
          countries: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_COUNTRIES_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดข้อมูลสถาบันการศึกษาในต่างประเทศไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

function loadRecognitionInfo() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_RECOGNITION_INFO_REQUEST })
    try {
      var { data } = await axios.get('/constants/recognitioninfo')
      if (data.length === 0) {
        data = []
      }
      dispatch({
        type: LOAD_RECOGNITION_INFO_SUCCESS,
        payload: {
          recognitionInfo: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_RECOGNITION_INFO_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดคำชี้แจ้งไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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
  LOAD_COUNTRIES_REQUEST,
  LOAD_COUNTRIES_SUCCESS,
  LOAD_COUNTRIES_FAILURE,
  LOAD_RECOGNITION_INFO_REQUEST,
  LOAD_RECOGNITION_INFO_SUCCESS,
  LOAD_RECOGNITION_INFO_FAILURE,
  loadCountries,
  loadRecognitionInfo,
}

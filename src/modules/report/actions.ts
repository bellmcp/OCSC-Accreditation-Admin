import axios from 'axios'
import { get } from 'lodash'
import { getCookie } from 'utils/cookies'

import * as uiActions from 'modules/ui/actions'

const GET_SUMMARY_REPORT_REQUEST =
  'ocsc-person-accredit/report/GET_SUMMARY_REPORT_REQUEST'
const GET_SUMMARY_REPORT_SUCCESS =
  'ocsc-person-accredit/report/GET_SUMMARY_REPORT_SUCCESS'
const GET_SUMMARY_REPORT_FAILURE =
  'ocsc-person-accredit/report/GET_SUMMARY_REPORT_FAILURE'

const CLEAR_SEARCH_RESULT = 'ocsc-person-accredit/report/CLEAR_SEARCH_RESULT'

function getSummaryReport({ startDate, endDate }: any) {
  return async (dispatch: any) => {
    const token = getCookie('token')

    dispatch({ type: GET_SUMMARY_REPORT_REQUEST })
    try {
      var { data } = await axios.get(
        `/reports/1?start=${startDate}&end=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (data.length === 0) {
        data = []
        dispatch(
          uiActions.setFlashMessage(
            'ไม่พบรายงานสรุปผลการปฏิบัติงาน โปรดลองใหม่อีกครั้ง',
            'info'
          )
        )
      }
      dispatch({
        type: GET_SUMMARY_REPORT_SUCCESS,
        payload: {
          searchResults: data,
        },
      })
    } catch (err) {
      dispatch({ type: GET_SUMMARY_REPORT_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดรายงานสรุปผลการปฏิบัติงานไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

function clearSearchResult() {
  return (dispatch: any) => {
    dispatch({
      type: CLEAR_SEARCH_RESULT,
    })
  }
}

export {
  GET_SUMMARY_REPORT_REQUEST,
  GET_SUMMARY_REPORT_SUCCESS,
  GET_SUMMARY_REPORT_FAILURE,
  CLEAR_SEARCH_RESULT,
  getSummaryReport,
  clearSearchResult,
}

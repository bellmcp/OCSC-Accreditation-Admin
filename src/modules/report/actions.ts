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

const GET_PROGRESS_REPORT_REQUEST =
  'ocsc-person-accredit/report/GET_PROGRESS_REPORT_REQUEST'
const GET_PROGRESS_REPORT_SUCCESS =
  'ocsc-person-accredit/report/GET_PROGRESS_REPORT_SUCCESS'
const GET_PROGRESS_REPORT_FAILURE =
  'ocsc-person-accredit/report/GET_PROGRESS_REPORT_FAILURE'

const GET_ACCREDIT_REPORT_REQUEST =
  'ocsc-person-accredit/report/GET_ACCREDIT_REPORT_REQUEST'
const GET_ACCREDIT_REPORT_SUCCESS =
  'ocsc-person-accredit/report/GET_ACCREDIT_REPORT_SUCCESS'
const GET_ACCREDIT_REPORT_FAILURE =
  'ocsc-person-accredit/report/GET_ACCREDIT_REPORT_FAILURE'

const GET_USAGE_REPORT_REQUEST =
  'ocsc-person-accredit/report/GET_USAGE_REPORT_REQUEST'
const GET_USAGE_REPORT_SUCCESS =
  'ocsc-person-accredit/report/GET_USAGE_REPORT_SUCCESS'
const GET_USAGE_REPORT_FAILURE =
  'ocsc-person-accredit/report/GET_USAGE_REPORT_FAILURE'

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

function getProgressReport({ startDate, endDate, status }: any) {
  return async (dispatch: any) => {
    const token = getCookie('token')

    dispatch({ type: GET_PROGRESS_REPORT_REQUEST })
    try {
      var { data } = await axios.get(
        `/reports/2?start=${startDate}&end=${endDate}&status=${status}`,
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
            'ไม่พบรายงานสรุปเรื่องเข้า/ออก/อยู่ระหว่างดำเนินการ โปรดลองใหม่อีกครั้ง',
            'info'
          )
        )
      }
      dispatch({
        type: GET_PROGRESS_REPORT_SUCCESS,
        payload: {
          searchResults: data,
        },
      })
    } catch (err) {
      dispatch({ type: GET_PROGRESS_REPORT_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดรายงานสรุปเรื่องเข้า/ออก/อยู่ระหว่างดำเนินการ ไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

function getAccreditReport({ startDate, endDate }: any) {
  return async (dispatch: any) => {
    const token = getCookie('token')

    dispatch({ type: GET_ACCREDIT_REPORT_REQUEST })
    try {
      var { data } = await axios.get(
        `/reports/3?start=${startDate}&end=${endDate}`,
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
            'ไม่พบรายงานสรุปผลการรับรองรายบุคคล โปรดลองใหม่อีกครั้ง',
            'info'
          )
        )
      }
      dispatch({
        type: GET_ACCREDIT_REPORT_SUCCESS,
        payload: {
          searchResults: data,
        },
      })
    } catch (err) {
      dispatch({ type: GET_ACCREDIT_REPORT_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดรายงานสรุปผลการรับรองรายบุคคลไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

function getUsageReport({ startDate, endDate, category }: any) {
  return async (dispatch: any) => {
    const token = getCookie('token')

    dispatch({ type: GET_USAGE_REPORT_REQUEST })
    try {
      var { data } = await axios.get(
        `/reports/4?start=${startDate}&end=${endDate}&category=${category}`,
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
            'ไม่พบสถิติผู้ใช้งานของส่วนราชการ โปรดลองใหม่อีกครั้ง',
            'info'
          )
        )
      }
      dispatch({
        type: GET_USAGE_REPORT_SUCCESS,
        payload: {
          searchResults: data,
        },
      })
    } catch (err) {
      dispatch({ type: GET_USAGE_REPORT_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดสถิติผู้ใช้งานของส่วนราชการไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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
  GET_PROGRESS_REPORT_REQUEST,
  GET_PROGRESS_REPORT_SUCCESS,
  GET_PROGRESS_REPORT_FAILURE,
  GET_ACCREDIT_REPORT_REQUEST,
  GET_ACCREDIT_REPORT_SUCCESS,
  GET_ACCREDIT_REPORT_FAILURE,
  GET_USAGE_REPORT_REQUEST,
  GET_USAGE_REPORT_SUCCESS,
  GET_USAGE_REPORT_FAILURE,
  CLEAR_SEARCH_RESULT,
  getSummaryReport,
  getProgressReport,
  getAccreditReport,
  getUsageReport,
  clearSearchResult,
}

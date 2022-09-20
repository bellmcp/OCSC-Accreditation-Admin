import axios from 'axios'
import { get } from 'lodash'
import { getCookie } from 'utils/cookies'

import * as uiActions from 'modules/ui/actions'

// import { mockPersonLetterItem } from './mock'

const GET_PERSON_LETTER_REQUEST =
  'ocsc-e-accredit/search/GET_PERSON_LETTER_REQUEST'
const GET_PERSON_LETTER_SUCCESS =
  'ocsc-e-accredit/search/GET_PERSON_LETTER_SUCCESS'
const GET_PERSON_LETTER_FAILURE =
  'ocsc-e-accredit/search/GET_PERSON_LETTER_FAILURE'

const CLEAR_SEARCH_RESULT = 'ocsc-e-accredit/search/CLEAR_SEARCH_RESULT'

function clearSearchResult() {
  return (dispatch: any) => {
    dispatch({
      type: CLEAR_SEARCH_RESULT,
    })
  }
}

function getPersonLetter({
  letterNo,
  letterDate,
  replyDate,
  status1,
  status2,
  status3,
  status4,
}: any) {
  return async (dispatch: any) => {
    const token = getCookie('token')
    const workerId = getCookie('id')

    dispatch({ type: GET_PERSON_LETTER_REQUEST })
    try {
      var { data } = await axios.get(
        `/PersonLetters?WorkerId=${workerId}&letterNo=${letterNo}&letterDate=${letterDate}&replyDate=${replyDate}&status1=${status1}&status2=${status2}&status3=${status3}&status4=${status4}`,
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
            'ไม่พบผลลัพธ์การค้นหา โปรดลองใหม่อีกครั้ง',
            'info'
          )
        )
      }
      dispatch({
        type: GET_PERSON_LETTER_SUCCESS,
        payload: {
          searchResults: data,
        },
      })
    } catch (err) {
      // dispatch({
      //   type: GET_PERSON_LETTER_SUCCESS,
      //   payload: {
      //     searchResults: mockPersonLetterItem,
      //   },
      // })
      dispatch({ type: GET_PERSON_LETTER_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดผลการค้นหาไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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
  GET_PERSON_LETTER_REQUEST,
  GET_PERSON_LETTER_SUCCESS,
  GET_PERSON_LETTER_FAILURE,
  CLEAR_SEARCH_RESULT,
  getPersonLetter,
  clearSearchResult,
}

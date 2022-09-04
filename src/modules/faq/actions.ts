import axios from 'axios'
import { get } from 'lodash'

import * as uiActions from 'modules/ui/actions'

const LOAD_FAQ_REQUEST = 'ocsc-e-accredit/faq/LOAD_FAQ_REQUEST'
const LOAD_FAQ_SUCCESS = 'ocsc-e-accredit/faq/LOAD_FAQ_SUCCESS'
const LOAD_FAQ_FAILURE = 'ocsc-e-accredit/faq/LOAD_FAQ_FAILURE'

function loadFaq() {
  return async (dispatch: any) => {
    dispatch({ type: LOAD_FAQ_REQUEST })
    try {
      var { data = [] } = await axios.get('/faqs')
      dispatch({
        type: LOAD_FAQ_SUCCESS,
        payload: {
          faq: data,
        },
      })
    } catch (err) {
      dispatch({ type: LOAD_FAQ_FAILURE })
      dispatch(
        uiActions.setFlashMessage(
          `โหลดคำถามที่พบบ่อยไม่สำเร็จ เกิดข้อผิดพลาด ${get(
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

export { LOAD_FAQ_REQUEST, LOAD_FAQ_SUCCESS, LOAD_FAQ_FAILURE, loadFaq }

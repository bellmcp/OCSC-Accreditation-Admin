import React, { useEffect, useState } from 'react'
import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import {
  Save as SaveIcon,
  Edit as EditIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
} from '@material-ui/icons'
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  bgBG,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import * as curriculumActions from 'modules/curriculum/actions'

const theme = createTheme(
  {
    typography: {
      fontFamily: ['Prompt', 'sans-serif'].join(','),
    },
    palette: {
      primary: { main: '#09348b' },
      secondary: { main: '#17aacf' },
    },
  },
  bgBG
)

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void
}

interface SubmitData {
  id: number
  isDeleted: boolean
  university: string
  degree: string
  branch: string
  isGov: boolean
  level: number
  faculty: string
  appro: string
  note: string
}

export default function DataTableEdit({ data }: any) {
  const dispatch = useDispatch()

  const [rows, setRows] = React.useState(data)
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  )
  const [educationLevels, setEducationLevels] = useState([])

  const { educationLevels: initalEducationLevels = [] } = useSelector(
    (state: any) => state.info
  )

  useEffect(() => {
    setRows(data)
  }, [data])

  useEffect(() => {
    const parsed = initalEducationLevels.map((item: any) => {
      return { value: item.id, label: item.level }
    })
    setEducationLevels(parsed)
  }, [initalEducationLevels])

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true
  }

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    event.defaultMuiPrevented = true
  }

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    })

    const editedRow = rows.find((row: any) => row.id === id)
    if (editedRow!.isNew) {
      setRows(rows.filter((row: any) => row.id !== id))
    }
  }

  const processRowUpdate = (newRow: GridRowModel) => {
    const submitData: SubmitData = {
      id: newRow.id,
      isDeleted: newRow.isDeleted,
      university: newRow.university,
      degree: newRow.degree,
      branch: newRow.branch,
      isGov: newRow.isGov,
      level: newRow.levelId,
      faculty: newRow.faculty,
      appro: newRow.accreditation,
      note: newRow.note,
    }
    const {
      id,
      isDeleted,
      university,
      degree,
      branch,
      isGov,
      level,
      faculty,
      appro,
      note,
    } = submitData
    dispatch(
      curriculumActions.updateRow(
        id,
        isDeleted,
        university,
        degree,
        branch,
        isGov,
        level,
        faculty,
        appro,
        note
      )
    )
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
  }

  const columns: GridColumns = [
    {
      field: 'order',
      headerName: 'ลำดับ',
      width: 80,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'isDeleted',
      headerName: 'ลบ/ไม่ลบ',
      width: 90,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        const deleted = get(params, 'value', false)
        return deleted ? 'ลบ' : 'ไม่ลบ'
      },
      editable: true,
      type: 'singleSelect',
      valueOptions: [
        { value: true, label: 'ลบ' },
        { value: false, label: 'ไม่ลบ' },
      ],
    },
    {
      field: 'university',
      headerName: 'มหาวิทยาลัย/สถาบันการศึกษา',
      width: 220,
      editable: true,
    },
    {
      field: 'degree',
      headerName: 'ชื่อปริญญา/ประกาศนียบัตร',
      width: 220,
      editable: true,
    },
    {
      field: 'branch',
      headerName: 'สาขา/วิชาเอก',
      width: 220,
      editable: true,
    },
    {
      field: 'isGov',
      headerName: 'รัฐ/เอกชน',
      width: 100,
      editable: true,
      type: 'singleSelect',
      valueOptions: [
        { value: true, label: 'รัฐ' },
        { value: false, label: 'เอกชน' },
      ],
      renderCell: (params) => {
        const isGov = get(params, 'value', false)
        return isGov ? 'รัฐ' : 'เอกชน'
      },
    },
    {
      field: 'levelId',
      headerName: 'ระดับการศึกษา',
      width: 120,
      editable: true,
      type: 'singleSelect',
      valueOptions: educationLevels,
      renderCell: (params) => {
        const level = get(params, 'row.level', false)
        return level
      },
    },
    {
      field: 'faculty',
      headerName: 'คณะ/หน่วยงาน',
      width: 200,
      editable: true,
    },
    {
      field: 'accreditation',
      headerName: 'ผลการรับรอง',
      width: 375,
      editable: true,
    },
    {
      field: 'note',
      headerName: 'หมายเหตุ',
      width: 300,
      editable: true,
    },
    {
      field: 'id',
      headerName: 'เลขที่อ้างอิง',
      width: 120,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'จัดการข้อมูล',
      width: 120,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              onClick={handleSaveClick(id)}
              color='primary'
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              onClick={handleCancelClick(id)}
              color='inherit'
            />,
          ]
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            onClick={handleEditClick(id)}
            color='primary'
          />,
        ]
      },
    },
  ]

  function CustomToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          paddingLeft: '6px',
        }}
      >
        <Stack direction='row' spacing={2} alignItems='center'>
          <GridToolbarColumnsButton sx={{ lineHeight: '1.2' }} />
          <Divider orientation='vertical' light flexItem />
          <GridToolbarFilterButton sx={{ lineHeight: '1.2' }} />
          <Divider orientation='vertical' light flexItem />
          <GridToolbarDensitySelector sx={{ lineHeight: '1.2' }} />
        </Stack>
      </GridToolbarContainer>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ minHeight: 500 }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          editMode='row'
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          initialState={{
            pagination: {
              pageSize: 50,
            },
          }}
          rowsPerPageOptions={[25, 50, 100, 250, 500, 1000]}
          components={{
            Toolbar: CustomToolbar,
          }}
          componentsProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          experimentalFeatures={{ newEditingApi: true }}
          localeText={{
            // Root
            noRowsLabel: 'ไม่มีข้อมูล',
            noResultsOverlayLabel: 'ไม่พบผลลัพธ์',
            errorOverlayDefaultLabel: 'เกิดข้อผิดพลาดบางอย่าง',

            // Density selector toolbar button text
            toolbarDensity: 'ขนาดของแถว',
            toolbarDensityLabel: 'ขนาดของแถว',
            toolbarDensityCompact: 'กะทัดรัด',
            toolbarDensityStandard: 'มาตรฐาน',
            toolbarDensityComfortable: 'สบายตา',

            // Columns selector toolbar button text
            toolbarColumns: 'จัดการคอลัมน์',
            toolbarColumnsLabel: 'เลือกคอลัมน์',

            // Filters toolbar button text
            toolbarFilters: 'ตัวกรอง',
            toolbarFiltersLabel: 'แสดงตัวกรอง',
            toolbarFiltersTooltipHide: 'ซ่อนตัวกรอง',
            toolbarFiltersTooltipShow: 'แสดงตัวกรอง',
            toolbarFiltersTooltipActive: (count) =>
              count !== 1
                ? `${count} ตัวกรองที่ใช้อยู่`
                : `${count} ตัวกรองที่ใช้อยู่`,

            // Quick filter toolbar field
            toolbarQuickFilterPlaceholder: 'ค้นหา...',
            toolbarQuickFilterLabel: 'ค้นหา',
            toolbarQuickFilterDeleteIconLabel: 'ล้าง',

            // Export selector toolbar button text
            toolbarExport: 'นำออก',
            toolbarExportLabel: 'นำออก',
            toolbarExportCSV: 'นำออกเป็นไฟล์ CSV',
            toolbarExportPrint: 'สั่งพิมพ์',
            toolbarExportExcel: 'นำออกเป็นไฟล์ Excel',

            // Columns panel text
            columnsPanelTextFieldLabel: 'ค้นหาคอลัมน์',
            columnsPanelTextFieldPlaceholder: 'ชื่อคอลัมน์',
            columnsPanelDragIconLabel: 'Reorder column',
            columnsPanelShowAllButton: 'แสดงทั้งหมด',
            columnsPanelHideAllButton: 'ซ่อนทั้งหมด',

            // Filter panel text
            filterPanelAddFilter: 'เพิ่มตัวกรอง',
            filterPanelDeleteIconLabel: 'ลบ',
            filterPanelLinkOperator: 'เงื่อนไข',
            filterPanelOperators: 'เงื่อนไข', // TODO v6: rename to filterPanelOperator
            filterPanelOperatorAnd: 'และ',
            filterPanelOperatorOr: 'หรือ',
            filterPanelColumns: 'คอลัมน์',
            filterPanelInputLabel: 'คำค้นหา',
            filterPanelInputPlaceholder: 'คำค้นหา',

            // Filter operators text
            filterOperatorContains: 'ประกอบด้วย',
            filterOperatorEquals: 'เท่ากับ',
            filterOperatorStartsWith: 'เริ่มต้นด้วย',
            filterOperatorEndsWith: 'ลงท้ายด้วย',
            filterOperatorIs: 'มีค่าเป็น',
            filterOperatorNot: 'ไม่ได้มีค่าเป็น',
            filterOperatorAfter: 'อยู่ถัดจาก',
            filterOperatorOnOrAfter: 'อยู่เท่ากับ หรือ ถัดจาก',
            filterOperatorBefore: 'อยู่ก่อนหน้า',
            filterOperatorOnOrBefore: 'อยู่เท่ากับ หรือ ก่อนหน้า',
            filterOperatorIsEmpty: 'ไม่มีค่า',
            filterOperatorIsNotEmpty: 'มีค่า',
            filterOperatorIsAnyOf: 'เป็นหนึ่งใน',

            // Filter values text
            filterValueAny: 'ใดๆ',
            filterValueTrue: 'ถูก',
            filterValueFalse: 'ผิด',

            // Column menu text
            columnMenuLabel: 'เมนู',
            columnMenuShowColumns: 'จัดการคอลัมน์',
            columnMenuFilter: 'ตัวกรอง',
            columnMenuHideColumn: 'ซ่อน',
            columnMenuUnsort: 'เลิกเรียงลำดับ',
            columnMenuSortAsc: 'เรียงน้อยไปมาก',
            columnMenuSortDesc: 'เรียงมากไปน้อย',

            // Column header text
            columnHeaderFiltersTooltipActive: (count) =>
              count !== 1
                ? `${count} ตัวกรองที่ใช้อยู่`
                : `${count} ตัวกรองที่ใช้อยู่`,
            columnHeaderFiltersLabel: 'แสดงตัวกรอง',
            columnHeaderSortIconLabel: 'เรียงลำดับ',

            // Rows selected footer text
            footerRowSelected: (count) =>
              count !== 1
                ? `${count.toLocaleString()} แถวถูกเลือก`
                : `${count.toLocaleString()} แถวถูกเลือก`,

            // Total row amount footer text
            footerTotalRows: 'จำนวนแถวทั้งหมด',

            // Total visible row amount footer text
            footerTotalVisibleRows: (visibleCount, totalCount) =>
              `${visibleCount.toLocaleString()} จาก ${totalCount.toLocaleString()}`,

            // Checkbox selection text
            checkboxSelectionHeaderName: 'Checkbox selection',
            checkboxSelectionSelectAllRows: 'Select all rows',
            checkboxSelectionUnselectAllRows: 'Unselect all rows',
            checkboxSelectionSelectRow: 'Select row',
            checkboxSelectionUnselectRow: 'Unselect row',

            // Boolean cell text
            booleanCellTrueLabel: 'yes',
            booleanCellFalseLabel: 'no',

            // Actions cell more text
            actionsCellMore: 'more',

            // Column pinning text
            pinToLeft: 'Pin to left',
            pinToRight: 'Pin to right',
            unpin: 'Unpin',

            // Tree Data
            treeDataGroupingHeaderName: 'Group',
            treeDataExpand: 'see children',
            treeDataCollapse: 'hide children',

            // Grouping columns
            groupingColumnHeaderName: 'Group',
            groupColumn: (name) => `Group by ${name}`,
            unGroupColumn: (name) => `Stop grouping by ${name}`,

            // Master/detail
            expandDetailPanel: 'Expand',
            collapseDetailPanel: 'Collapse',

            // Used core components translation keys
            MuiTablePagination: {
              labelRowsPerPage: 'จำนวนแถวต่อหน้า',
              labelDisplayedRows: ({ from, to, count }) =>
                `${from}-${to} จาก ${count}`,
            },

            // Row reordering text
            rowReorderingHeaderName: 'Row reordering',
          }}
        />
      </div>
    </ThemeProvider>
  )
}

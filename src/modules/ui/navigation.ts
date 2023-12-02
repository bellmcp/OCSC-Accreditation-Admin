const PATH = process.env.REACT_APP_BASE_PATH

export const mainItems = [
  {
    id: 0,
    title: 'หนังสือเข้า',
    url: PATH,
  },
]

export const searchItems = [
  {
    id: 1,
    sectionTitle: 'ค้นหาการรับรอง',
    title: 'คุณวุฒิบุคคล',
    url: `${PATH}/search/person-letter`,
  },
  {
    id: 2,
    title: 'คุณวุฒิหลักสูตร',
    url: `${PATH}/search/curriculum`,
  },
]

export const reportItems = [
  {
    id: 7,
    sectionTitle: 'รายงาน',
    title: 'สรุปผลการปฏิบัติงาน',
    url: `${PATH}/report/summary`,
  },
  {
    id: 8,
    title: 'สรุปเรื่องเข้า/ออก/อยู่ระหว่างดำเนินการ',
    url: `${PATH}/report/progress`,
  },
  {
    id: 9,
    title: 'สรุปผลการรับรองรายบุคคล',
    url: `${PATH}/report/accredit`,
  },
  {
    id: 10,
    title: 'สถิติผู้ใช้งานของส่วนราชการ',
    url: `${PATH}/report/usage`,
  },
]

export const menuItems = [...mainItems, ...searchItems, ...reportItems]

export const curriculumItems = [
  {
    id: 3,
    sectionTitle: 'หนังสือเวียน',
    title: 'ความคืบหน้า',
    url: `${PATH}/curriculum/progress`,
  },
  {
    id: 4,
    title: 'รับรองหลักสูตรใหม่',
    url: `${PATH}/curriculum/approve`,
  },
  {
    id: 5,
    title: 'นำเข้าหลักสูตรใหม่',
    url: `${PATH}/curriculum/import`,
  },
  {
    id: 6,
    title: 'ออกหนังสือเวียน',
    url: `${PATH}/curriculum/export`,
  },
]

export const infoItems = [
  {
    id: 11,
    sectionTitle: 'ข้อมูลพื้นฐาน',
    title: 'ประเทศ',
    url: `${PATH}/info/country`,
  },
  {
    id: 12,
    title: 'กลุ่มเงินเดือน',
    url: `${PATH}/info/salary-group`,
  },
  {
    id: 13,
    title: 'ระดับการศึกษา',
    url: `${PATH}/info/education-level`,
  },
  {
    id: 14,
    title: 'มหาวิทยาลัย',
    url: `${PATH}/info/university`,
  },
]

export const navigationItems = [
  ...mainItems,
  ...searchItems,
  ...curriculumItems,
  ...reportItems,
  ...infoItems,
]

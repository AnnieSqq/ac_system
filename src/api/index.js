import http from '@/utils/http'
import { storage } from '@/utils'
/**
 * 教育机构注册
 * @param {*} param0
 * @returns
 */
export async function register({ subject, password }) {
  const res = await http.post('/api/blockchain/educator/register', {
    subject,
    password
  })
  return res
}
/**
 * 教育机构登录
 * @param {*} param0
 * @returns
 */
export async function login({ subject, password }) {
  const res = await http.post('/api/blockchain/educator_login', {
    subject,
    password
  })
  return res
}
/**
 * 根据token获取教育机构信息
 * @returns
 */
export async function getAdminInfo() {
  const token = storage.getItem('educatortoken')
  const res = await http.post('/api/blockchain/educator/get_educator_token', {
    string: token
  })
  return res
}
/**
 * 根据教育机构id获取受教育者列表
 * @param {*} id
 * @returns
 */
export async function getEducatedList(id) {
  const res = await http.post('/api/blockchain/educator/get_educated', {
    id
  })
  return res
}
/**
 * 根据受教育者id获取他的详细信息
 * @param {*} id
 * @returns
 */
export async function getEducatedInfo(id) {
  const res = await http.post('/api/blockchain/educator/get_educated_info', {
    id
  })
  return res
}
/**
 * 根据受教育者id获取学历证书列表
 * @param {*} id
 * @returns
 */
export async function getEducationList(id) {
  const res = await http.post('/api/blockchain/educator/get_academic', {
    id
  })
  return res
}
/**
 * 授予学历证书
 * @param {*} id
 * @returns
 */
export async function giveEducation({ educatedId, educatorName, eduStage }) {
  const res = await http.post('/api/blockchain/educated/create_academic', {
    educatedId,
    educatorName,
    eduStage
  })
  return res
}
/**
 * 通过学历证书id获取证书信息
 * @param {*} id
 * @returns
 */
export async function getEducationInfo(id) {
  const res = await http.post('/api/blockchain/educator/get_academic_info', {
    id
  })
  return res
}
/**
 * 根据受教育者id获取学位证书列表
 * @param {*} id
 * @returns
 */
export async function getDegreeList(id) {
  const res = await http.post('/api/blockchain/educator/get_diploma', {
    id
  })
  return res
}
/**
 * 授予学位证书
 * @param {*} id
 * @returns
 */
export async function giveDegree({ educatedId, educatorName, eduStage }) {
  const res = await http.post('/api/blockchain/educator/create_diploma', {
    educatedId,
    educatorName,
    eduStage
  })
  return res
}
/**
 * 通过学位证书id获取证书信息
 * @param {*} id
 * @returns
 */
export async function getDegreeInfo(id) {
  const res = await http.post('/api/blockchain/deucator/get_diploma_info', {
    id
  })
  return res
}
/**
 * 获取学历的课程信息
 * @param {*} id
 * @returns
 */
export async function getCourses(id) {
  const res = await http.post('/api/blockchain/educator/get_course', {
    id
  })
  return res
}
/**
 * 核验证书
 * @param {*} query
 * @returns
 */
export async function checkCerti(query) {
  const res = await http.get('/api/blockchain/CheckAcademic', { params: query })
  return res
}

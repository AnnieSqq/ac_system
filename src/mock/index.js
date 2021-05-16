// 引入mockjs
import Mock from 'mockjs'
// 使用mockjs模拟数据
Mock.mock(RegExp('/api/test.*'), 'get', {
  ret: 0,
  data: {
    mtime: '@datetime', // 随机生成日期时间
    'score|1-800': 800, // 随机生成1-800的数字
    'rank|1-100': 100, // 随机生成1-100的数字
    'stars|1-5': 5, // 随机生成1-5的数字
    nickname: '@cname' // 随机生成中文名字
  }
  // data里的属性看不懂，需要详细看语法规范,博客链接:https://www.jianshu.com/p/4579f40e6108
})
// url列表
const urls = {
  register: '/api/blockchain/educator/register',
  login: '/api/blockchain/educator_login',
  getAdminInfo: '/api/blockchain/educator/get_educator_token',
  getEducatedList: '/api/blockchain/educator/get_educated',
  getEducatedInfo: '/api/blockchain/educator/get_educated_info',
  getEducationList: '/api/blockchain/educator/get_academic',
  giveEducation: '/api/blockchain/educated/create_academic',
  getEducationInfo: '/api/blockchain/educator/get_academic_info',
  getDegreeList: '/api/blockchain/educator/get_diploma',
  giveDegree: '/api/blockchain/educator/create_diploma',
  getDegreeInfo: '/api/blockchain/deucator/get_diploma_info',
  getCourses: '/api/blockchain/educator/get_course',
  checkCerti: '/api/blockchain/CheckAcademic'
}
// 注册
Mock.mock(urls.register, 'post', {
  code: 200,
  msg: '注册成功'
})
// 登录
Mock.mock(urls.login, 'post', {
  code: 200,
  msg: '登录成功',
  token: '123123123333'
})
// 根据token获取教育机构信息
Mock.mock(urls.getAdminInfo, 'post', {
  code: 200,
  msg: '获取成功',
  data: { educatorId: 123, educatorName: '金陵科技学院' }
})
// 根据教育机构id获取受教育者列表
Mock.mock(urls.getEducatedList, 'post', {
  code: 200,
  msg: '获取成功',
  'data|3-10': [
    {
      educatedId: '@integer(1, 100)',
      username: '@cname',
      identity: '@id',
      educatorName: '金陵科技学院'
    }
  ]
})
// 根据受教育者id获取他的详细信息
Mock.mock(urls.getEducatedInfo, 'post', {
  code: 200,
  msg: '获取成功',
  data: {
    educatedId: '@integer(60, 100)',
    username: '张三',
    identity: '@id',
    educatorName: '金陵科技学院'
  }
})
// 根据受教育者id获取学历证书列表
Mock.mock(urls.getEducationList, 'post', {
  code: 200,
  msg: '获取成功',
  'data|1-5': [
    {
      academicId: '@integer(1, 100)',
      academicName: '本科',
      graduateTime: '@datetime',
      eduInstitution: '金陵科技学院'
    }
  ]
})
// 授予学历证书
Mock.mock(urls.giveEducation, 'post', {
  code: 200,
  msg: '授予成功'
})
// 通过学历证书id获取证书信息
Mock.mock(urls.getEducationInfo, 'post', {
  code: 200,
  msg: '获取成功',
  data: {
    userId: '@integer(1, 100)',
    username: '张三',
    academicId: '@integer(1, 100)',
    academicName: '本科',
    graduateTime: '@datetime',
    eduInstitution: '金陵科技学院'
  }
})
// 根据受教育者id获取学位证书列表
Mock.mock(urls.getDegreeList, 'post', {
  code: 200,
  msg: '获取成功',
  'data|1-3': [
    {
      diplomaId: '@integer(1, 100)',
      diplomaName: '学士',
      issueTime: '@datetime',
      eduInstitution: '金陵科技学院'
    }
  ]
})
// 授予学位证书
Mock.mock(urls.giveDegree, 'post', {
  code: 200,
  msg: '授予成功'
})
// 通过学位证书id获取证书信息
Mock.mock(urls.getDegreeInfo, 'post', {
  code: 200,
  msg: '获取成功',
  data: {
    userId: '@integer(1, 100)',
    username: '张三',
    diplomaId: '@integer(1, 100)',
    diplomaName: '本科',
    issueTime: '@datetime',
    eduInstitution: '金陵科技学院'
  }
})
// 获取学历的课程信息
Mock.mock(urls.getCourses, 'post', {
  code: 200,
  msg: '获取成功',
  'data|5-20': [
    {
      courseId: '@integer(1, 100)',
      courseName: '高数',
      score: '@integer(1, 100)'
    }
  ]
})
// 核验证书
Mock.mock(RegExp(urls.checkCerti + '.*'), 'get', {
  code: 200,
  msg: '核验通过'
})

// 延时200-600毫秒请求到数据
Mock.setup({
  timeout: '200-600'
})

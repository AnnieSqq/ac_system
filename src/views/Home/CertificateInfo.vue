<template>
  <a-card>
    <a-descriptions title="证书详情" bordered :column="1">
      <a-descriptions-item label="姓名">
        {{ certiInfo.educated_name }}
      </a-descriptions-item>
      <a-descriptions-item label="受教育者编号">
        {{ certiInfo.id_num }}
      </a-descriptions-item>
      <a-descriptions-item label="证书类别">
        {{ certiInfo.type }}
      </a-descriptions-item>
      <a-descriptions-item label="证书名称">
        {{ certiInfo.level }}{{ certiInfo.type }}
      </a-descriptions-item>
      <a-descriptions-item label="证书编号">
        {{ certiInfo.id }}
      </a-descriptions-item>
      <a-descriptions-item label="颁发机构">
        {{ adminInfo.name }}
      </a-descriptions-item>
      <a-descriptions-item label="颁发日期">
        {{ certiInfo.time.substring(0, 10) }}
      </a-descriptions-item>
      <a-descriptions-item label="认证">
        <a-space>
          <a-button
            v-if="certiInfo.type == '学历证书'"
            type="primary"
            shape="round"
            @click="handleStudyAuth"
          >
            学习认证
          </a-button>
          <a-button type="default" shape="round" @click="checkCerti"
            >核验证书</a-button
          >
        </a-space>
      </a-descriptions-item>
      <a-descriptions-item label="备注">
        {{ certiInfo.msg }}
      </a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>

<script>
import { mapState } from 'vuex'
import { getEducationInfo, getDegreeInfo } from '@/api'
export default {
  data() {
    return {
      certiInfo: {
        id: '45646512345',
        educated_name: '张三',
        id_num: '1234566789',
        type: '',
        level: '硕士',
        time: '2020-02-02',
        msg: '无'
      },
      type: ''
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    // 获取证书信息
    async getCertiInfo(id, type) {
      if (type === 'edu') {
        const res = await getEducationInfo(id)
        this.certiInfo = {
          id: res.data.data.academicId,
          educated_name: res.data.data.username,
          id_num: res.data.data.userId,
          level: res.data.data.academicName,
          time: res.data.data.graduateTime,
          type: '学历证书',
          msg: '无'
        }
      } else if (type === 'degree') {
        const res = await getDegreeInfo(id)
        this.certiInfo = {
          id: res.data.data.diplomaId,
          educated_name: res.data.data.username,
          id_num: res.data.data.userId,
          level: res.data.data.diplomaName,
          time: res.data.data.issueTime,
          type: '学位证书',
          msg: '无'
        }
      }
    },
    // 学习认证
    handleStudyAuth() {
      this.$router.push({
        path: 'study_auth',
        query: {
          id: this.certiInfo.id,
          username: this.certiInfo.educated_name,
          certiname: this.certiInfo.level
        }
      })
    },
    // 核验证书
    checkCerti() {
      let academicId, diplomaId
      if (this.type === 'edu') {
        academicId = this.certiInfo.id
      } else if (this.type === 'degree') {
        diplomaId = this.certiInfo.id
      }
      this.$router.push({
        path: '/code/check',
        query: { academicId, diplomaId }
      })
    }
  },
  mounted() {
    this.type = this.$route.query.type
    this.getCertiInfo(this.$route.query.id, this.$route.query.type)
  }
}
</script>

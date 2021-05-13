<template>
  <a-card>
    <a-descriptions title="证书详情" bordered :column="1">
      <a-descriptions-item label="姓名">
        {{ certiInfo.educated_name }}
      </a-descriptions-item>
      <a-descriptions-item label="身份证号">
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
        {{ certiInfo.time }}
      </a-descriptions-item>
      <a-descriptions-item label="认证">
        <a-space>
          <a-button type="primary" shape="round" @click="handleStudyAuth">
            学习认证
          </a-button>
          <a-button type="default" shape="round">核验证书</a-button>
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
export default {
  data() {
    return {
      certiInfo: {
        id: '45646512345',
        educated_name: '张三',
        id_num: '1234566789',
        type: '学位证书',
        level: '硕士',
        time: '2020-02-02',
        msg: '无'
      }
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    handleStudyAuth() {
      this.$router.push({
        path: 'study_auth',
        query: { id: this.certiInfo.id }
      })
    }
  }
}
</script>

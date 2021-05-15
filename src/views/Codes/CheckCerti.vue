<template>
  <div style="background-color: #f0f2f5">
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240); margin-bottom: 100px"
      title="学历学位证书核验"
    />
    <a-result
      v-if="status == 'valid'"
      status="success"
      title="证书有效"
      sub-title="您核验的证书是有效的"
    ></a-result>
    <a-result
      v-else-if="status == 'invalid'"
      status="error"
      title="证书无效"
      sub-title="您核验的证书是无效的"
    ></a-result>
    <a-result
      v-else-if="status == 'notexist'"
      status="warning"
      title="证书不存在"
      sub-title="您核验的证书不存在"
    ></a-result>
    <!-- <a-result
      v-else
      status="404"
      title="404"
      sub-title="Sorry, the page you visited does not exist."
    ></a-result> -->
  </div>
</template>

<script>
import { checkCerti } from '@/api'
export default {
  data() {
    return {
      // valid200 invalid500 notexsit401
      status: ''
    }
  },
  methods: {
    async check(query) {
      const res = await checkCerti(query)
      if (res.data.code === 200) {
        this.status = 'valid'
      } else if (res.data.code === 500) {
        this.status = 'invalid'
      } else if (res.data.code === 401) {
        this.status = 'notexist'
      }
    }
  },
  mounted() {
    const query = this.$route.query
    this.check(query)
  }
}
</script>

<template>
  <div>
    <a-page-header
      :title="pageTitle"
    />
    <a-list
      :grid="{ gutter: 16, xxl: 3, xl: 2, xs: 2 }"
      :data-source="courceList"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card>
          <a-descriptions bordered :column="1">
            <a-descriptions-item label="课程名">
              {{ item.courseName }}
            </a-descriptions-item>
            <a-descriptions-item label="课程号">
              {{ item.courseId }}
            </a-descriptions-item>
            <a-descriptions-item label="课程分数">
              {{ item.score }}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>
<script>
import { getCourses } from '@/api'
export default {
  data() {
    return {
      courceList: [],
      pageTitle: ''
    }
  },
  methods: {
    async getCourceList(id) {
      const res = await getCourses(id)
      this.courceList = res.data.data
    }
  },
  mounted() {
    this.pageTitle =
      this.$route.query.username +
      '的' +
      this.$route.query.certiname +
      '毕业证书学习认证：课程信息'
    this.getCourceList(this.$route.query.id)
  }
}
</script>

<style lang="less" scoped>
.cource_card {
  //   width: 60%;
}
</style>

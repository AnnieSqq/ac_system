<template>
  <div class="eduinfo_outer">
    <!-- 基础信息 -->
    <a-card :bordered="false">
      <a-descriptions bordered :column="1">
        <div slot="title">
          <span>基础信息</span>
          <a-button
            style="margin-left: 16px"
            @click="
              $router.push({
                path: '/code/educated',
                query: { educatedId: educatedInfo.educatedId },
              })
            "
            >查看扫码结果页面</a-button
          >
        </div>
        <a-descriptions-item label="姓名">
          {{ educatedInfo.username }}
        </a-descriptions-item>
        <a-descriptions-item label="身份证号">
          {{ educatedInfo.identity }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <!-- 证书信息 -->
    <a-row :gutter="16">
      <!-- 学历证书 -->
      <a-col :span="12">
        <a-card title="学历证书" :bordered="false">
          <!-- 授予学历证书 -->
          <div slot="extra">
            <a-popconfirm
              cancel-text="取消"
              ok-text="授予"
              @confirm="confirmGiveEdu"
            >
              <div slot="title">
                <span>证书级别：</span>
                <a-select
                  :default-value="eduLevel"
                  @change="
                    (value) => {
                      eduLevel = value;
                    }
                  "
                  style="width: 80px"
                >
                  <a-select-option value="小学">小学</a-select-option>
                  <a-select-option value="初中">初中</a-select-option>
                  <a-select-option value="高中">高中</a-select-option>
                  <a-select-option value="中专">中专</a-select-option>
                  <a-select-option value="大专">大专</a-select-option>
                  <a-select-option value="本科">本科</a-select-option>
                  <a-select-option value="硕士">硕士</a-select-option>
                  <a-select-option value="博士">博士</a-select-option>
                </a-select>
              </div>
              <a-icon slot="icon" type="rise" />
              <a-button type="primary" shape="round">授予</a-button>
            </a-popconfirm>
          </div>
          <!-- 学历证书列表 -->
          <a-list
            item-layout="vertical"
            :data-source="educationList"
            class="certi_list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-card hoverable @click="handleeEduClick(item.academicId)">
                <a-row type="flex" align="middle">
                  <a-col :span="10">
                    <p>{{ item.academicName }}学历证书</p>
                    <p>编号：{{ item.academicId }}</p>
                    <p>{{ item.graduateTime.substring(0, 10) }}</p>
                  </a-col>
                  <a-col :span="14">
                    <div class="certi_img">
                      <span>毕业</span>
                      <a-icon type="crown" />
                      <span>证书</span>
                      <div>{{ adminInfo.name  }}</div>
                    </div>
                  </a-col>
                </a-row>
              </a-card>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <!-- 学位证书 -->
      <a-col :span="12">
        <a-card :bordered="false" title="学位证书">
          <!-- 授予学位证书 -->
          <div slot="extra">
            <a-popconfirm
              cancel-text="取消"
              ok-text="授予"
              placement="topLeft"
              @confirm="confirmGiveDegree"
            >
              <div slot="title">
                <span>证书级别：</span>
                <a-select
                  :default-value="degreeLevel"
                  @change="
                    (value) => {
                      degreeLevel = value;
                    }
                  "
                  style="width: 80px"
                >
                  <a-select-option value="学士">学士</a-select-option>
                  <a-select-option value="硕士">硕士</a-select-option>
                  <a-select-option value="博士">博士</a-select-option>
                </a-select>
              </div>
              <a-icon slot="icon" type="rise" />
              <a-button type="primary" shape="round">授予</a-button>
            </a-popconfirm>
          </div>
          <!-- 学位证书列表 -->
          <a-list
            item-layout="vertical"
            :data-source="degreeList"
            class="certi_list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-card hoverable @click="handleeDegreeClick(item.diplomaId)">
                <a-row type="flex" align="middle">
                  <!-- 证书信息 -->
                  <a-col :span="10">
                    <p>{{ item.diplomaName }}学位证书</p>
                    <p>编号：{{ item.diplomaId }}</p>
                    <p>{{ item.issueTime.substring(0, 10) }}</p>
                  </a-col>
                  <!-- 证书小图 -->
                  <a-col :span="14">
                    <div class="certi_img">
                      <span>学位</span>
                      <a-icon type="bank" />
                      <span>证书</span>
                      <div>{{ adminInfo.name }}</div>
                    </div>
                  </a-col>
                </a-row>
              </a-card>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  getEducatedInfo,
  getEducationList,
  giveEducation,
  getDegreeList,
  giveDegree
} from '@/api'
export default {
  data() {
    return {
      // 受教育者信息
      educatedInfo: {
        identity: '45689799',
        username: '张三'
      },
      // 学历证书列表
      educationList: [],
      // 学位证书列表
      degreeList: [],
      // 学历证书等级
      eduLevel: '本科',
      // 学位证书等级
      degreeLevel: '学士'
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    // 获取受教育者信息
    async getEducated(id) {
      const res = await getEducatedInfo(id)
      this.educatedInfo = res.data.data
      this.getEduCertis()
      this.getDegrees()
    },
    // 获取学历证书列表
    async getEduCertis() {
      const res = await getEducationList(this.educatedInfo.educatedId)
      this.educationList = res.data.data
    },
    // 获取学位证书列表
    async getDegrees() {
      const res = await getDegreeList(this.educatedInfo.educatedId)
      this.degreeList = res.data.data
    },
    // 点击学历证书
    handleeEduClick(id) {
      this.$router.push({
        path: '/certificate_info',
        query: { id, type: 'edu' }
      })
    },
    // 点击学位证书
    handleeDegreeClick(id) {
      this.$router.push({
        path: '/certificate_info',
        query: { id, type: 'degree' }
      })
    },
    // 授予学历证书
    async confirmGiveEdu() {
      const res = await giveEducation({
        educatedId: this.educatedInfo.educatedId,
        educatorName: this.adminInfo.name,
        eduStage: this.eduLevel
      })
      if (res.data.code !== 200) {
        return this.$message.error('授予失败')
      }
      this.$message.success('授予成功')
      this.getEduCertis()
    },
    // 授予学位证书
    async confirmGiveDegree() {
      const res = await giveDegree({
        educatedId: this.educatedInfo.educatedId,
        educatorName: this.adminInfo.name,
        eduStage: this.degreeLevel
      })
      if (res.data.code !== 200) {
        return this.$message.error('授予失败')
      }
      this.$message.success('授予成功')
      this.getDegrees()
    }
  },
  mounted() {
    this.getEducated(this.$route.query.educatedId)
    // 为了保证执行顺序，就不在生命周期中顺序调用，而是将获取证书挪到获取受教育者个人信息汉书中
    // this.getEduCertis()
  }
}
</script>

<style lang="less" scoped>
.eduinfo_outer {
  .ant-card {
    margin-bottom: 16px;
  }
}
.certi_img {
  background-color: #027db4;
  height: 100px;
  font-size: 40px;
  color: #ffd700;
  text-align: center;
  > div {
    font-size: 20px;
    color: #e0e0e0;
  }
  > span {
    font-size: 24px;
    color: #fff0a6;
  }
}
.certi_list {
  height: 300px;
  overflow: auto;
}
</style>

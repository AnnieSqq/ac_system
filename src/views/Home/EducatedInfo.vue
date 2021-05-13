<template>
  <div class="eduinfo_outer">
    <!-- 基础信息 -->
    <a-card :bordered="false">
      <a-descriptions title="基础信息" bordered :column="1">
        <a-descriptions-item label="姓名">
          {{ educatedInfo.name }}
        </a-descriptions-item>
        <a-descriptions-item label="身份证号">
          {{ educatedInfo.id_num }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <!-- 证书信息 -->
    <a-row :gutter="16">
      <!-- 学历证书 -->
      <a-col :span="12">
        <a-card title="学历证书" :bordered="false">
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
                  <a-select-option value="primary">小学</a-select-option>
                  <a-select-option value="junior">初中</a-select-option>
                  <a-select-option value="senior">高中</a-select-option>
                  <a-select-option value="zhong_zhuan">中专</a-select-option>
                  <a-select-option value="da_zhaun">大专</a-select-option>
                  <a-select-option value="ben_ke">本科</a-select-option>
                  <a-select-option value="shuo_shi">硕士</a-select-option>
                  <a-select-option value="bo_shi">博士</a-select-option>
                </a-select>
              </div>
              <a-icon slot="icon" type="rise" />
              <a-button type="primary" shape="round">授予</a-button>
            </a-popconfirm>
          </div>
          <a-list
            item-layout="vertical"
            :data-source="educationList"
            class="certi_list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-card hoverable @click="handleeEduClick(item.id)">
                <a-row type="flex" align="middle">
                  <a-col :span="10">
                    <p>{{ item.name }}</p>
                    <p>{{ item.id }}</p>
                    <p>{{ item.time }}</p>
                  </a-col>
                  <a-col :span="14">
                    <div class="certi_img">
                      <span>毕业</span>
                      <a-icon type="crown" />
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
      <!-- 学位证书 -->
      <a-col :span="12">
        <a-card :bordered="false" title="学位证书">
          <div slot="extra">
            <a-popconfirm
              cancel-text="取消"
              ok-text="授予"
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
                  <a-select-option value="scholar">学士</a-select-option>
                  <a-select-option value="master">硕士</a-select-option>
                  <a-select-option value="doctor">博士</a-select-option>
                </a-select>
              </div>
              <a-icon slot="icon" type="rise" />
              <a-button type="primary" shape="round">授予</a-button>
            </a-popconfirm>
          </div>
          <a-list
            item-layout="vertical"
            :data-source="degreeList"
            class="certi_list"
          >
            <a-list-item slot="renderItem" slot-scope="item">
              <a-card hoverable @click="handleeDegreeClick(item.id)">
                <a-row type="flex" align="middle">
                  <!-- 证书信息 -->
                  <a-col :span="10">
                    <p>{{ item.name }}</p>
                    <p>{{ item.id }}</p>
                    <p>{{ item.time }}</p>
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
export default {
  data() {
    return {
      educatedInfo: {
        id_num: '45689799',
        name: '张三'
      },
      educationList: [
        {
          id: '123456',
          name: '小学毕业证书',
          time: '2020-02-02'
        },
        {
          id: '1234556',
          name: '小学毕业证书',
          time: '2020-02-02'
        },
        {
          id: '1234556',
          name: '小学毕业证书',
          time: '2020-02-02'
        },
        {
          id: '1234556',
          name: '小学毕业证书',
          time: '2020-02-02'
        },
        {
          id: '1234556',
          name: '小学毕业证书',
          time: '2020-02-02'
        },
        {
          id: '1234556',
          name: '小学毕业证书',
          time: '2020-02-02'
        },
        {
          id: '1234556',
          name: '小学毕业证书',
          time: '2020-02-02'
        }
      ],
      degreeList: [
        {
          id: '123454556',
          name: '学士学位证书',
          time: '2020-02-02'
        }
      ],
      // 学历证书等级
      eduLevel: 'ben_ke',
      // 学位证书等级
      degreeLevel: 'scholar'
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    handleeEduClick(id) {
      this.$router.push({
        path: '/certificate_info',
        query: { id, type: 'edu' }
      })
    },
    handleeDegreeClick(id) {
      this.$router.push({
        path: '/certificate_info',
        query: { id, type: 'degree' }
      })
    },
    confirmGiveEdu() {
      console.log('学历：' + this.eduLevel)
    },
    confirmGiveDegree() {
      console.log('学位：' + this.degreeLevel)
    }
  },
  mounted() {
    // console.log(this.$route.query.id_num)
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

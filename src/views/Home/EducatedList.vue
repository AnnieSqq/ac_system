<template>
  <div class="edu_list_outer">
    <!-- 搜索栏 -->
    <a-row class="search_row" type="flex" justify="space-between">
      <a-col :span="3"><a-input placeholder="姓名"></a-input></a-col>
      <a-col :span="5"><a-input placeholder="身份证号"></a-input></a-col>
      <a-col :span="3">
        <a-select default-value="prim">
          <a-select-option value="prim">小学</a-select-option>
          <a-select-option value="junior">初中</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="3"><a-button type="primary">检索</a-button></a-col>
      <a-col :span="3"><a-button type="default">取消</a-button></a-col>
      <a-col :span="6"></a-col>
    </a-row>
    <!-- <a-card
      style="border: 1px solid rgb(235, 237, 240);"
      title="受教育者列表"
    /> -->
    <!-- 统计栏 -->
    <a-row style="padding: 16px 0">
      <a-col :span="6"><a-tag color="blue">总计：{{eduList.length}}</a-tag></a-col>
    </a-row>
    <!-- 表格 -->
    <div style="background-color: #fff">
      <a-table
        rowKey="educatedId"
        :columns="eduListCols"
        :data-source="eduList"
        bordered
        :pagination="false"
        :customRow="customRowFunc"
      ></a-table>
    </div>
    <!-- 表格底栏 -->
    <a-row class="footer_row">
      <a-col :span="3"><a-button type="primary">批量颁发</a-button></a-col>
      <a-col :span="3"><a-button type="default">批量删除</a-button></a-col>
      <a-col :span="18">
        <a-pagination show-quick-jumper :default-current="2" :total="eduList.length" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getEducatedList } from '@/api'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // 受教育者表格列信息
      eduListCols: [
        {
          title: 'id',
          dataIndex: 'educatedId',
          width: '30%'
        },
        {
          title: '姓名',
          dataIndex: 'username',
          width: '20%'
        },
        {
          title: '身份证号',
          dataIndex: 'identity',
          width: '20%'
        },
        {
          title: '所属院校',
          dataIndex: 'educatorName'
        }
      ],
      // 受教育者列表
      eduList: []
    }
  },
  computed: {
    ...mapState(['adminInfo'])
  },
  methods: {
    // 表格行的处理函数
    customRowFunc(record, index) {
      const that = this
      return {
        on: {
          // 点击行
          click(e) {
            that.$router.push({
              path: '/educated_info',
              query: {
                educatedId: record.educatedId
              }
            })
          }
        }
      }
    },
    // 获取受教育者列表
    async getEduList() {
      const res = await getEducatedList(this.$store.state.adminInfo.id)
      this.eduList = res.data.data
    }
  },
  mounted() {
    this.getEduList()
  },
  watch: {
    adminInfo(newval, oldval) {
      this.getEduList()
    }
  }
}
</script>

<style lang="less">
// 样式都在这个类名中，去掉scope不会出啥问题吧。去掉scope是为了统一设置select的样式
.edu_list_outer > .search_row {
  background-color: #fff;
  padding: 16px;
  .ant-input,
  .ant-btn-default {
    background-color: #f0f2f5;
    border: none;
  }
  .ant-select,
  .ant-btn {
    width: 100%;
  }
  .ant-select-selection {
    background-color: #f0f2f5;
    border: none;
  }
}
.footer_row {
  padding: 16px 0;
  .ant-btn-default {
    border: none;
  }
}
</style>

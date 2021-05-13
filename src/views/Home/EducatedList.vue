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
    <!-- 统计栏 -->
    <a-row style="padding: 16px 0">
      <a-col :span="6"><a-tag color="blue">总计：1456</a-tag></a-col>
    </a-row>
    <!-- 表格 -->
    <div style="background-color: #fff">
      <a-table
        rowKey="id_num"
        :columns="eduListCols"
        :data-source="eduList"
        bordered
        :pagination="false"
        :customRow="customRowFunc"
      ></a-table>
    </div>
    <a-row class="footer_row">
      <a-col :span="3"><a-button type="primary">批量颁发</a-button></a-col>
      <a-col :span="3"><a-button type="default">批量删除</a-button></a-col>
      <a-col :span="18">
        <a-pagination show-quick-jumper :default-current="2" :total="500" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eduListCols: [
        {
          title: 'id',
          dataIndex: 'id_num',
          width: '30%'
          //   scopedSlots: { customRender: 'id_num' }
        },
        {
          title: '姓名',
          dataIndex: 'name',
          width: '20%'
          //   scopedSlots: { customRender: 'name' }
        },
        {
          title: '本校学历',
          dataIndex: 'this_school_edu',
          width: '20%'
          //   scopedSlots: { customRender: 'this_school_edu' }
        },
        {
          title: '毕业时间',
          dataIndex: 'graduate_time'
          //   scopedSlots: { customRender: 'graduate_time' }
        }
      ],
      eduList: [
        {
          id_num: '1345678913',
          name: '张三',
          this_school_edu: '本科',
          graduate_time: '2020-02-02'
        },
        {
          id_num: '1345678945',
          name: '李四',
          this_school_edu: '本科',
          graduate_time: '2020-02-02'
        }
      ]
    }
  },
  methods: {
    customRowFunc(record, index) {
      const that = this
      return {
        on: {
          // 点击行
          click(e) {
            that.$router.push({
              path: '/educated_info',
              query: {
                id_num: record.id_num
              }
            })
          }
        }
      }
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

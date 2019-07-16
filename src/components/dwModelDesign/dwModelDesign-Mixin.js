
export default {
  name: 'InlineEditTable',
  data () {
    return {
      addSrcTableIsShow: false,
      addModelIsShow: false,
      createTabBtnAble: true,
      listLoading: false,
      showModal: false,
      reqParams: {},
      createTabList: [],
      modelList: [],
      modelCellEditInput: '',
      tarColNameInput: '',
      activeNames: ['1'],
      dwBakTableInput: 'd_nct_erp_cux_cux_soa_wms_inbound_stg',
      activeName: 'first',
      dwDataLoadModel: '',
      dwStrategyList: [],
      editable: false,
      dwUsingTableInput: 'd_pty_mlgx_test_commodity',
      mapUsingTableInput: '',
      dwEngTableName: '',
      dwChnTableName: '',
      sourceParimaryKey: '',
      targetParimaryKey: '',
      partitionKey: '',
      dwTableCommentInput: '',
      cellEditInput: '',
      sourceTabName: '',
      addSrcTableInput: ''
    }
  },
  created () {
    // this.getList()
  },
  methods: {
    // 保存dw初始化脚本
    async saveInitScript () {
      var reqParams = {}
      reqParams.dwDataTable = this.dwEngTableName
      console.log(reqParams)
      const { data: { code, msg } } = await this.$http.get('/dwModelDesign/saveInitScript', { params: reqParams })
      if (code !== 200) {
        this.$message.error(msg)
      } else {
        this.$message.success(msg)
      }
    },
    // 保存映射关系
    async saveMapRel () {
      if (this.modelList.length > 0) {
        var flag = false
        var reqParams = {}
        reqParams.modelList = this.modelList
        reqParams.dwDataLoadModel = this.dwDataLoadModel
        reqParams.sourceParimaryKey = this.sourceParimaryKey
        reqParams.targetParimaryKey = this.targetParimaryKey
        this.modelList.forEach(item => {
          console.log('length:', item.cjDwTableMapRelInfos.length)
          if (item.cjDwTableMapRelInfos.length > 0) {
            item.cjDwTableMapRelInfos.forEach(element => {
              // if (element.sourceTableSchema.length === 0 || element.sourceTableName.length === 0 || element.sourceTableAliasName.length === 0
              //   || element.tableJoinType.length === 0 || element.joinTableSchema.length === 0 || element.joinTableName.length === 0
              //   || element.joinTableAliasName.length === 0 || element.joinTableCondition.length === 0) {
              //   flag = true
              //   console.log('pass')
              // }
              if (!element.sourceTableSchema || element.sourceTableSchema.length === 0) {
                flag = true
              } else if (!element.sourceTableName || element.sourceTableName.length === 0) {
                flag = true
              } else if (!element.sourceTableAliasName || element.sourceTableAliasName.length === 0) {
                flag = true
              } else if (!element.tableJoinType || element.tableJoinType.length === 0) {
                flag = true
              } else if (!element.joinTableSchema || element.joinTableSchema.length === 0) {
                flag = true
              } else if (!element.joinTableName || element.joinTableName.length === 0) {
                flag = true
              } else if (!element.joinTableAliasName || element.joinTableAliasName.length === 0) {
                flag = true
              } else if (!element.joinTableCondition || element.joinTableCondition.length === 0) {
                flag = true
              }
            })
          }
        })
        if (flag) {
          this.$message.warning('请完善表关联关系')
        } else {
          // console.log(this.modelList)
          const { data: { code, msg } } = await this.$http.post('/dwModelDesign/saveMapRel', reqParams)
          if (code !== 200) {
            this.$message.error(msg)
          } else {
            this.$message.success(msg)
          }
        }
      }
    },
    async getUsingTabInfo () {
      if (this.dwUsingTableInput.length >= 5) {
        var reqParams = {}
        reqParams.dwDataTable = this.dwUsingTableInput
        const { data: { code, msg, data } } = await this.$http.get('/dwModelDesign/getTabByUsingName', { params: reqParams })
        console.log(data)
        if (code !== 200) {
          this.$message.error(msg)
        } else {
          if (data.cjDwTableColMapRelInfoVos.length > 0) {
            this.addModelIsShow = true
            this.sourceParimaryKey = data.odsTablePrimaryCol
            this.targetParimaryKey = data.dWPrimaryCol
            this.dwDataLoadModel = data.dwDataLoadModel
            this.partitionKey = data.odsTablePartitionColName
            data.cjDwTableColMapRelInfoVos.forEach(element => {
              element.edit = ''
            })
            if (this.modelList[0] != null) {
              this.modelList[0].cjDwTableColMapRelInfoVos = data.cjDwTableColMapRelInfoVos
            } else {
              var model = {}
              model.cjDwTableColMapRelInfoVos = data.cjDwTableColMapRelInfoVos
              model.sourceTabName = data.odsDataTable
              model.cjDwTableMapRelInfos = []
              this.modelList.push(model)
            }
            this.dwEngTableName = data.cjDwTableColMapRelInfoVos[0].dwDataTable
            this.dwChnTableName = data.cjDwTableColMapRelInfoVos[0].targetTableComment
          }
        }
      } else {
        this.$message.warning('请按规则填写表名')
      }
    },
    async saveCol () {
      if (this.dwUsingTableInput.length >= 5) {
        if (this.createTabList.length > 0) {
          const loading = this.$loading({
            lock: true,
            text: '正在保存字段信息...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          this.reqParams.dwDataTable = this.dwUsingTableInput
          this.reqParams.cjDwTableColInfoDtos = JSON.stringify(this.createTabList)
          const { data: { code, msg } } = await this.$http.post('/dwModelDesign/saveDWUsingCols', this.reqParams)
          loading.close()
          if (code !== 200) {
            this.$message.error(msg)
          } else {
            this.createTabBtnAble = false
            this.$message.success(msg)
          }
          this.reqParams = {}
        } else {
          this.$message.warning('保存字段列表为空')
        }
      } else {
        this.$message.warning('表名不得少于五个字符')
      }
    },
    async createTable () {
      if (this.dwBakTableInput.length > 5 && this.dwUsingTableInput.length > 5) {
        this.reqParams.dwBakTable = this.dwBakTableInput
        this.reqParams.dwUsingDataTable = this.dwUsingTableInput
        this.reqParams.odsDataTable = this.odsDataTable
        this.reqParams.cjDwTableColInfoDtos = JSON.stringify(this.createTabList)
        const loading = this.$loading({
          lock: true,
          text: '正在保存建表...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        const { data: { code, msg } } = await this.$http.post('/dwModelDesign/createDwUsingTable', this.reqParams)
        loading.close()
        if (code !== 200) {
          this.$message.error(msg)
        } else {
          this.$message.success(msg)
        }
        this.reqParams = {}
      } else {
        this.$message.warning('请正确填写备用区与在用区表名')
      }
    },
    async getBakColInfo () {
      if (this.dwBakTableInput.length >= 5) {
        this.reqParams.dwDataTable = this.dwBakTableInput
        const { data: { data, code, msg } } = await this.$http.get('/dwModelDesign/getTabByBakName', { params: this.reqParams })
        if (code !== 200) {
          this.$message.error(msg)
          this.createTabList = []
        } else {
          var cjDwTableColInfos = data.cjDwTableColInfos
          this.odsDataTable = data.odsDataTable
          cjDwTableColInfos.forEach(item => {
            item.edit = ''
            item.targetTableColName = item.dwTableColName
          })
          this.createTabList = cjDwTableColInfos
        }
        this.reqParams = {}
      } else {
        this.$message.warning('请正确填写备用区表名')
      }
    },
    addModel () {
      this.addSrcTableIsShow = true
    },
    removeModel (key) {
      if (key !== 0) {
        this.modelList.splice(key, 1)
      } else {
        this.$message.warning('不可删除基本映射模型')
      }
    },
    cancelAddSrcTable () {
      this.addSrcTableIsShow = false
    },
    // 添加一个分组
    async confirmAddSrcTable () {
      var reqParams = {}
      reqParams.odsDataTable = this.addSrcTableInput
      reqParams.dwDataTable = this.dwEngTableName
      const { data: { data, code, msg } } = await this.$http.get('/dwModelDesign/getOdsTabInfoByName', { params: reqParams })
      if (code !== 200) {
        this.$message.error(msg)
      } else {
        console.log(data)
        data.forEach(element => {
          element.edit = ''
        })
        // 将之前已经获得的目标表的字段信息和新获得的源表信息合并
        var groupData = []
        var dwInfo = this.modelList[0].cjDwTableColMapRelInfoVos
        var sourceTableSchema = dwInfo[0].sourceTableSchema
        var schemaFlag = true
        var fullSchema = 'acquisition_ods'
        if (sourceTableSchema !== data[0].sourceTableSchema) {
          schemaFlag = false
        }
        // for (let i = 0; i < (dwInfo.length > data.length ? dwInfo.length : data.length); i++) {
        //   var groupItem = {}
        //   if (i < data.length) {
        //     console.log(data[i].sourceTableColName)
        //     groupItem.sourceTableName = data[i].sourceTableName
        //     groupItem.sourceTableSchema = sourceTableSchema
        //     groupItem.sourceTableColName = data[i].sourceTableColName
        //     groupItem.sourceTableColComment = data[i].sourceTableColComment
        //     groupItem.sourceTableColType = data[i].sourceTableColType
        //   }
        //   if (i < dwInfo.length) {
        //     groupItem.targetTableColName = dwInfo[i].targetTableColName
        //     groupItem.targetTableColComment = dwInfo[i].targetTableColComment
        //     groupItem.targetTableColType = dwInfo[i].targetTableColType
        //     groupItem.targetTableColOrder = dwInfo[i].targetTableColOrder
        //     groupItem.sourceTargetMappDefine = dwInfo[i].sourceTargetMappDefine
        //   }
        //   groupItem.edit = ''
        //   groupData.push(groupItem)
        // }
        if (!schemaFlag) {
          if (sourceTableSchema !== fullSchema) {
            this.modelList[0].cjDwTableColMapRelInfoVos.forEach(item => {
              item.sourceTableSchema = fullSchema
            })
          }
          if (data[0].sourceTableSchema !== fullSchema) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].sourceTableSchema) {
                data[i].sourceTableSchema = fullSchema
              }
              // groupData[i].sourceTableSchema = fullSchema
            }
          }
        }
        this.addSrcTableIsShow = false
        var model = {}
        model.sourceTabName = this.addSrcTableInput
        model.cjDwTableColMapRelInfoVos = data
        model.cjDwTableMapRelInfos = []
        this.modelList.push(model)
        this.addSrcTableInput = ''
      }
    },
    addMapRel (key) {
      var mapRelItem = {}
      if (this.modelList[key].cjDwTableColMapRelInfoVos.length > 0) {
        mapRelItem.edit = ''
        this.modelList[key].cjDwTableMapRelInfos.push(mapRelItem)
        console.log(this.modelList)
      } else {
        // this.$message.error('')
      }
    },
    modelCellEdit (key, index, column) {
      this.showModal = true
      this.modelList[key].cjDwTableColMapRelInfoVos[index].edit = column
      this.modelCellEditInput = this.modelList[key].cjDwTableColMapRelInfoVos[index][column]
      console.log(this.modelList)
    },
    modelConfirmEdit (key, index, column) {
      this.showModal = false
      this.modelList[key].cjDwTableColMapRelInfoVos[index].edit = ''
      this.modelList[key].cjDwTableColMapRelInfoVos[index][column] = this.modelCellEditInput
      this.modelCellEditInput = ''
    },
    modelCancelEdit (key, index) {
      this.showModal = false
      this.modelList[key].cjDwTableColMapRelInfoVos[index].edit = ''
      this.modelCellEditInput = ''
    },
    mapCellEdit (key, index, column) {
      this.showModal = true
      this.modelList[key].cjDwTableMapRelInfos[index].edit = column
      this.modelCellEditInput = this.modelList[key].cjDwTableMapRelInfos[index][column]
      console.log(this.modelList)
    },
    mapConfirmEdit (key, index, column) {
      this.showModal = false
      this.modelList[key].cjDwTableMapRelInfos[index].edit = ''
      this.modelList[key].cjDwTableMapRelInfos[index][column] = this.modelCellEditInput
      this.modelCellEditInput = ''
    },
    mapCancelEdit (key, index) {
      this.showModal = false
      this.modelList[key].cjDwTableMapRelInfos[index].edit = ''
      this.modelCellEditInput = ''
    },
    cellEdit (index, column) {
      this.showModal = true
      this.createTabList[index].edit = column
      this.cellEditInput = this.createTabList[index][column]
      console.log(this.createTabList)
    },
    cancelEdit (index) {
      this.showModal = false
      this.createTabList[index].edit = ''
      this.cellEditInput = ''
    },
    confirmEdit (index, column) {
      this.showModal = false
      this.createTabList[index].edit = ''
      this.createTabList[index][column] = this.cellEditInput
      this.cellEditInput = ''
    },
    handleChange (val) {
      console.log(val)
    }
  }
}

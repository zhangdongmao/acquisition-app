<template>
  <el-tabs v-model="activeName" type="card">
    <div class="modalContainer" v-if="showModal"></div>
    <el-dialog title="请输入源表名" :visible.sync="addSrcTableIsShow">
      <el-form>
        <el-form-item label="源表名">
          <el-input v-model="addSrcTableInput" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelAddSrcTable">取 消</el-button>
        <el-button type="primary" @click="confirmAddSrcTable">确 定</el-button>
      </div>
    </el-dialog>
    <el-tab-pane label="DW在用区建表" name="first">
      <div class="tool-bar">
        <div class="tool-item">
          <el-input
            class="info-input"
            placeholder="请输入备用区表名"
            v-model="dwBakTableInput"
            clearable
            size="mini"
          ></el-input>
          <el-button size="mini" type="primary" plain @click="getBakColInfo()">搜索</el-button>
        </div>
        <div class="tool-item">
          <el-input
            class="info-input"
            placeholder="请输入在用区表名"
            v-model="dwUsingTableInput"
            clearable
            size="mini"
          ></el-input>
          <el-button size="mini" type="primary" plain @click="saveCol()">保存字段</el-button>
          <el-button
            size="mini"
            type="primary"
            :disabled="createTabBtnAble"
            plain
            @click="createTable()"
          >在用区建表</el-button>
        </div>
      </div>
      <el-card>
        <el-row :gutter="20">
          <!-- 级联 -->
          <el-col :span="24">
            <el-table
              height="418"
              v-loading="listLoading"
              :data="createTabList"
              border
              fit
              highlight-current-row
              style="width: 100%"
            >
              <el-table-column align="center" label="字段名称" width="300">
                <template slot-scope="scope">
                  <template v-if="scope.row.edit === 'targetTableColName'">
                    <el-input v-model="cellEditInput" class="table-edit-input"></el-input>
                    <div class="edit-option">
                      <el-button
                        type="success"
                        size="small"
                        icon="el-icon-circle-check-outline"
                        @click="confirmEdit(scope.$index,'targetTableColName')"
                        class="table-edit-btn"
                      >Ok</el-button>
                      <el-button
                        type="success"
                        size="small"
                        icon="el-icon-circle-check-outline"
                        @click="cancelEdit(scope.$index)"
                        class="table-edit-btn"
                      >Cancel</el-button>
                    </div>
                  </template>
                  <div
                    class="edit-cell"
                    @dblclick="cellEdit(scope.$index,'targetTableColName')"
                    v-else
                  >
                    <span>{{scope.row.targetTableColName}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="字段类型" width="120">
                <template slot-scope="scope">
                  <span>{{ scope.row.dwTableColType }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="字段注释" width="300">
                <template slot-scope="scope">
                  <template v-if="scope.row.edit === 'dwTableColComment'">
                    <el-input v-model="cellEditInput" class="table-edit-input"></el-input>
                    <div class="edit-option">
                      <el-button
                        type="success"
                        size="small"
                        icon="el-icon-circle-check-outline"
                        @click="confirmEdit(scope.$index,'dwTableColComment')"
                        class="table-edit-btn"
                      >Ok</el-button>
                      <el-button
                        type="success"
                        size="small"
                        icon="el-icon-circle-check-outline"
                        @click="cancelEdit(scope.$index)"
                        class="table-edit-btn"
                      >Cancel</el-button>
                    </div>
                  </template>
                  <div
                    class="edit-cell"
                    @dblclick="cellEdit(scope.$index,'dwTableColComment')"
                    v-else
                  >
                    <span>{{scope.row.dwTableColComment}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="dw分区标志" width="180">
                <template slot-scope="scope">
                  <div class="edit-cell" @click="chengenum(scope.$index)">
                    <span>{{scope.row.dwTablePartitionFlag}}</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
    </el-tab-pane>

    <el-tab-pane label="DW在用区映射设计" name="second">
      <div class="tool-bar">
        <div class="tool-item">
          <el-input
            class="info-input"
            placeholder="请输入在用区表名"
            v-model="dwUsingTableInput"
            clearable
            size="mini"
          ></el-input>
          <el-button size="mini" type="primary" plain @click="getUsingTabInfo()">搜索</el-button>
        </div>
        <div class="tool-item">
          <el-button size="mini" type="primary" plain @click="saveMapRel()">保存映射关系</el-button>
          <el-button size="mini" type="primary" plain @click="saveInitScript()">创建DW初始化脚本</el-button>
          <el-button size="mini" type="primary" plain @click="getUsingTabInfo()">导出映射关系</el-button>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="dw-table-info">
        <div class="dw-info-row">
          <div class="dw-info-item">
            <div class="dw-info-title title-font">目标英文表名：</div>
            <el-input
              class="dw-input"
              placeholder="目标表英文名"
              v-model="dwEngTableName"
              clearable
              size="mini"
            ></el-input>
          </div>
          <div class="dw-info-item">
            <div class="dw-info-title title-font">目标中文表名：</div>
            <el-input
              class="dw-input"
              placeholder="目标中文表名"
              v-model="dwChnTableName"
              clearable
              size="mini"
            ></el-input>
          </div>
        </div>
        <div class="dw-info-row">
          <div class="dw-info-item">
            <div class="dw-info-title title-font">数据源表主键：</div>
            <el-input
              class="dw-input"
              placeholder="数据源表主键"
              v-model="sourceParimaryKey"
              clearable
              size="mini"
            ></el-input>
          </div>
          <div class="dw-info-item">
            <div class="dw-info-title title-font">目标表主键：</div>
            <el-input
              class="dw-input"
              placeholder="目标表主键"
              v-model="targetParimaryKey"
              clearable
              size="mini"
            ></el-input>
          </div>
        </div>
        <div class="dw-info-row">
          <div class="dw-info-item">
            <div class="dw-info-title title-font">分区字段：</div>
            <el-input
              class="dw-input"
              placeholder="分区字段"
              v-model="partitionKey"
              clearable
              size="mini"
            ></el-input>
          </div>
          <div class="dw-info-item">
            <div class="dw-info-title title-font">加载策略：</div>
            <el-select clearable v-model="dwDataLoadModel" placeholder="请选择加载策略" size="mini">
              <el-option
                v-for="item in dwStrategyList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>

      <el-button
        class="model-btn"
        v-if="addModelIsShow"
        size="mini"
        type="primary"
        plain
        @click="addModel"
      >添加</el-button>
      <el-collapse v-model="activeNames" @change="handleChange" v-for="(item,key) in modelList">
        <el-collapse-item v-bind:title="'源表名：'+item.sourceTabName">
          <el-button
        class="model-btn"
        v-if="addModelIsShow"
        size="mini"
        type="primary"
        plain
        @click="removeModel(key)"
      >删除</el-button>
          <el-table
            v-loading="listLoading"
            :data="item.cjDwTableColMapRelInfoVos"
            border
            fit
            height="500px"
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column align="center" label="源库名" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.sourceTableSchema }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="源字段英文名" width="160">
              <template slot-scope="scope">
                <span>{{ scope.row.sourceTableColName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="源字段中文名" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.sourceTableColComment }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="源字段类型" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.sourceTableColType }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="目标字段英文名" width="180">
              <template slot-scope="scope">
                <!-- <template v-if="scope.row.edit === 'targetTableColName'">
                  <el-input v-model="modelCellEditInput" class="table-edit-input"></el-input>
                  <div class="edit-option">
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="modelConfirmEdit(key,scope.$index,'targetTableColName')"
                      class="table-edit-btn"
                    >Ok</el-button>
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="modelCancelEdit(key,scope.$index)"
                      class="table-edit-btn"
                    >Cancel</el-button>
                  </div>
                </template>
                <div
                  class="edit-cell"
                  @dblclick="modelCellEdit(key,scope.$index,'targetTableColName')"
                  v-else
                > -->
                  <span>{{scope.row.targetTableColName}}</span>
                <!-- </div> -->
              </template>
            </el-table-column>
            <el-table-column align="center" label="目标字段中文名" width="160">
              <template slot-scope="scope">
                <!-- <template v-if="scope.row.edit === 'targetTableColComment'">
                  <el-input v-model="modelCellEditInput" class="table-edit-input"></el-input>
                  <div class="edit-option">
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="modelConfirmEdit(key,scope.$index,'targetTableColComment')"
                      class="table-edit-btn"
                    >Ok</el-button>
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="modelCancelEdit(key,scope.$index)"
                      class="table-edit-btn"
                    >Cancel</el-button>
                  </div>
                </template>
                <div
                  class="edit-cell"
                  @dblclick="modelCellEdit(key,scope.$index,'targetTableColComment')"
                  v-else
                > -->
                  <span>{{scope.row.targetTableColComment}}</span>
                <!-- </div> -->
              </template>
            </el-table-column>
            <el-table-column align="center" label="目标字段类型" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.targetTableColType }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="映射规则" width="180">
              <template slot-scope="scope">
                <template v-if="scope.row.edit === 'sourceTargetMappDefine'">
                  <el-input v-model="modelCellEditInput" class="table-edit-input"></el-input>
                  <div class="edit-option">
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="modelConfirmEdit(key,scope.$index,'sourceTargetMappDefine')"
                      class="table-edit-btn"
                    >Ok</el-button>
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="modelCancelEdit(key,scope.$index)"
                      class="table-edit-btn"
                    >Cancel</el-button>
                  </div>
                </template>
                <div
                  class="edit-cell"
                  @dblclick="modelCellEdit(key,scope.$index,'sourceTargetMappDefine')"
                  v-else
                >
                  <span>{{scope.row.sourceTargetMappDefine}}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-divider></el-divider>
          <div class="map-rel">
            <div>关联条件</div>
            <el-button
              type="success"
              size="small"
              icon="el-icon-circle-check-outline"
              @click="addMapRel(key)"
              class="table-edit-btn"
            >添加</el-button>
          </div>
          <el-table
            v-loading="listLoading"
            :data="item.cjDwTableMapRelInfos"
            border
            fit
            highlight-current-row
            style="width: 100%"
          >
            <el-table-column align="center" label="左库" width="120">
              <template slot-scope="scope">
                <template v-if="scope.row.edit === 'sourceTableSchema'">
                  <el-input v-model="modelCellEditInput" class="table-edit-input"></el-input>
                  <div class="edit-option">
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="mapConfirmEdit(key,scope.$index,'sourceTableSchema')"
                      class="table-edit-btn"
                    >Ok</el-button>
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="mapCancelEdit(key,scope.$index)"
                      class="table-edit-btn"
                    >Cancel</el-button>
                  </div>
                </template>
                <div class="edit-cell" @dblclick="mapCellEdit(key,scope.$index,'sourceTableSchema')" v-else>
                  <span>{{scope.row.sourceTableSchema}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="左表名" width="180">
              <template slot-scope="scope">
                <template v-if="scope.row.edit === 'sourceTableName'">
                  <el-input v-model="modelCellEditInput" class="table-edit-input"></el-input>
                  <div class="edit-option">
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="mapConfirmEdit(key,scope.$index,'sourceTableName')"
                      class="table-edit-btn"
                    >Ok</el-button>
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="mapCancelEdit(key,scope.$index)"
                      class="table-edit-btn"
                    >Cancel</el-button>
                  </div>
                </template>
                <div
                  class="edit-cell"
                  @dblclick="mapCellEdit(key,scope.$index,'sourceTableName')"
                  v-else
                >
                  <span>{{scope.row.sourceTableName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="左表别名" width="100">
              <template slot-scope="scope">
                <template v-if="scope.row.edit === 'sourceTableAliasName'">
                  <el-input v-model="modelCellEditInput" class="table-edit-input"></el-input>
                  <div class="edit-option">
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="mapConfirmEdit(key,scope.$index,'sourceTableAliasName')"
                      class="table-edit-btn"
                    >Ok</el-button>
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="mapCancelEdit(key,scope.$index)"
                      class="table-edit-btn"
                    >Cancel</el-button>
                  </div>
                </template>
                <div
                  class="edit-cell"
                  @dblclick="mapCellEdit(key,scope.$index,'sourceTableAliasName')"
                  v-else
                >
                  <span>{{scope.row.sourceTableAliasName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="关联类型" width="120">
              <template slot-scope="scope">
                <template v-if="scope.row.edit === 'tableJoinType'">
                  <el-input v-model="modelCellEditInput" class="table-edit-input"></el-input>
                  <div class="edit-option">
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="mapConfirmEdit(key,scope.$index,'tableJoinType')"
                      class="table-edit-btn"
                    >Ok</el-button>
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="mapCancelEdit(key,scope.$index)"
                      class="table-edit-btn"
                    >Cancel</el-button>
                  </div>
                </template>
                <div class="edit-cell" @dblclick="mapCellEdit(key,scope.$index,'tableJoinType')" v-else>
                  <span>{{scope.row.tableJoinType}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="右库" width="120">
              <template slot-scope="scope">
                <template v-if="scope.row.edit === 'joinTableSchema'">
                  <el-input v-model="modelCellEditInput" class="table-edit-input"></el-input>
                  <div class="edit-option">
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="mapConfirmEdit(key,scope.$index,'joinTableSchema')"
                      class="table-edit-btn"
                    >Ok</el-button>
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="mapCancelEdit(key,scope.$index)"
                      class="table-edit-btn"
                    >Cancel</el-button>
                  </div>
                </template>
                <div class="edit-cell" @dblclick="mapCellEdit(key,scope.$index,'joinTableSchema')" v-else>
                  <span>{{scope.row.joinTableSchema}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="右表名" width="180">
              <template slot-scope="scope">
                <template v-if="scope.row.edit === 'joinTableName'">
                  <el-input v-model="modelCellEditInput" class="table-edit-input"></el-input>
                  <div class="edit-option">
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="mapConfirmEdit(key,scope.$index,'joinTableName')"
                      class="table-edit-btn"
                    >Ok</el-button>
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="mapCancelEdit(key,scope.$index)"
                      class="table-edit-btn"
                    >Cancel</el-button>
                  </div>
                </template>
                <div
                  class="edit-cell"
                  @dblclick="mapCellEdit(key,scope.$index,'joinTableName')"
                  v-else
                >
                  <span>{{scope.row.joinTableName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="右表别名" width="100">
              <template slot-scope="scope">
                <template v-if="scope.row.edit === 'joinTableAliasName'">
                  <el-input v-model="modelCellEditInput" class="table-edit-input"></el-input>
                  <div class="edit-option">
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="mapConfirmEdit(key,scope.$index,'joinTableAliasName')"
                      class="table-edit-btn"
                    >Ok</el-button>
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="mapCancelEdit(key,scope.$index)"
                      class="table-edit-btn"
                    >Cancel</el-button>
                  </div>
                </template>
                <div
                  class="edit-cell"
                  @dblclick="mapCellEdit(key,scope.$index,'joinTableAliasName')"
                  v-else
                >
                  <span>{{scope.row.joinTableAliasName}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="关联条件" width="180">
              <template slot-scope="scope">
                <template v-if="scope.row.edit === 'joinTableCondition'">
                  <el-input v-model="modelCellEditInput" class="table-edit-input"></el-input>
                  <div class="edit-option">
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="mapConfirmEdit(key,scope.$index,'joinTableCondition')"
                      class="table-edit-btn"
                    >Ok</el-button>
                    <el-button
                      type="success"
                      size="small"
                      icon="el-icon-circle-check-outline"
                      @click="mapCancelEdit(key,scope.$index)"
                      class="table-edit-btn"
                    >Cancel</el-button>
                  </div>
                </template>
                <div
                  class="edit-cell"
                  @dblclick="mapCellEdit(key,scope.$index,'joinTableCondition')"
                  v-else
                >
                  <span>{{scope.row.joinTableCondition}}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import mixin from "./dwModelDesign-Mixin";
export default {
  mixins: [mixin]
};
</script>
<style >
.map-rel {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
}
.tool-bar {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.tool-item {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  text-align: center;
  margin-bottom: 10px;
}
.info-input {
  width: 300px;
}
.cellEditInput {
  width: 280px;
}
.dw-input {
  width: 300px;
}
.dw-table-info {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.dw-info-row {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.dw-info-item {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  text-align: left;
}
.dw-info-title {
  width: 25%;
}
.title-font {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 10px;
}
.cell {
  height: 100%;
}
.edit-cell {
  position: relative;
  width: 100%;
  min-height: 20px;
}
.edit-option {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  text-align: center;
}
.modalContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 100;
}
.table-edit-input {
  z-index: 130;
}
.table-edit-btn {
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
  z-index: 130;
}
.model-btn {
  position: relative;
  margin-bottom: 10px;
}
</style>
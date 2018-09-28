<template>
<div class="app-container calendar-list-container">

  <!-- 查询和其他操作 -->
  <div class="filter-container">
    <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入商品编号" v-model="listQuery.param.goodsCode">
    </el-input>
    <el-input clearable class="filter-item" style="width: 200px;" placeholder="请输入商品名称" v-model="listQuery.param.name">
    </el-input>
    <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">查找</el-button>
    <el-button class="filter-item" type="primary" @click="handleCreate" icon="el-icon-edit">添加</el-button>
    <el-button class="filter-item" type="primary" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出</el-button>
  </div>

  <!-- 查询结果 -->
  <el-table size="small" :data="list" v-loading="listLoading" element-loading-text="正在查询中。。。" border fit highlight-current-row>

    <el-table-column align="center" label="操作" width="250" class-name="small-padding fixed-width">
      <template slot-scope="scope">
          <!-- <router-link tag="a" target="_blank" :to="{path:'goodspreview',params:{catId:0},query:{keywords:'手机'}}">预览</router-link> -->
          <el-button type="primary" size="mini" @click="handlePreview(scope.row)">预览</el-button>
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini"  @click="handleDelete(scope.row)" v-show="scope.row.status === 0 ? true : false">禁用</el-button>
          <el-button type="success" size="mini"  @click="handleJh(scope.row)" v-show="scope.row.status === 1 ? true : false">激活</el-button>
        </template>
    </el-table-column>

    <!-- <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="demo-table-expand">
            <el-form-item label="首页主图">
              <span>{{ props.row.listPicUrl }}</span>
            </el-form-item>
            <el-form-item label="宣传画廊">
              <span>{{ props.row.gallery }}</span>
            </el-form-item>
            <el-form-item label="商品介绍">
              <span>{{ props.row.goodsBrief }}</span>
            </el-form-item>
            <el-form-item label="商品详细介绍">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
            <el-form-item label="商品主图">
              <span>{{ props.row.primaryPicUrl }}</span>
            </el-form-item>
            <el-form-item label="商品单位">
              <span>{{ props.row.goodsUnit }}</span>
            </el-form-item>
            <el-form-item label="关键字">
              <span>{{ props.row.keyword }}</span>
            </el-form-item>
            <el-form-item label="类目ID">
              <span>{{ props.row.categoryId }}</span>
            </el-form-item>
            <el-form-item label="品牌商ID">
              <span>{{ props.row.brandId }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->

    <!-- <el-table-column align="center" width="100px" label="商品ID" prop="id" sortable>
    </el-table-column> -->

    <el-table-column align="center" min-width="100px" label="商品编号" prop="goodsCode">
    </el-table-column>

    <el-table-column align="center" min-width="100px" label="商品名称" prop="name">
    </el-table-column>

    <el-table-column align="center" min-width="100px" label="所属分类" prop="categoryId">
    </el-table-column>

    <el-table-column align="center" min-width="100px" label="商品描述" prop="description">
    </el-table-column>

    <el-table-column align="center" min-width="100px" label="店铺价格" prop="price">
    </el-table-column>

    <el-table-column align="center" min-width="100px" label="市场价格" prop="priceMart">
    </el-table-column>

    <el-table-column align="center" min-width="100px" label="总库存" prop="numTotal">
    </el-table-column>

    <el-table-column align="center" min-width="100px" label="总可销售库存" prop="numTotal">
    </el-table-column>

    <el-table-column align="center" min-width="100px" label="总销量" prop="numSale">
    </el-table-column>

    <el-table-column align="center" min-width="100px" label="是否上架" prop="isOnSale">
      <template slot-scope="scope">
          <el-tag :type="scope.row.isOnSale === 1 ? 'success' : 'error' ">{{scope.row.isOnSale === 1 ? '是' : '否'}}</el-tag>
        </template>
    </el-table-column>

    <el-table-column align="center" min-width="150px" label="属性详情" prop="isBestGoods">
      <template slot-scope="scope">
          <el-popover placement="right" width="1000" trigger="click">
             <el-table :data="gridData">
               <!-- <el-table-column width="100" property="attributeId" label="属性名ID"></el-table-column> -->
                 <el-table-column width="100" property="attributeNames" label="属性名"></el-table-column>
                 <!-- <el-table-column width="100" property="attributeValueId" label="属性值ID"></el-table-column> -->
                 <el-table-column width="100" property="attributeValueNames" label="属性值"></el-table-column>
                 <el-table-column width="100" property="numTotal" label="库存"></el-table-column>
                 <el-table-column width="100" property="numCurrent" label="可销售库存"></el-table-column>
                 <el-table-column width="100" property="numSale" label="销量"></el-table-column>
                 <el-table-column width="140" property="price" label="价格（单价）"></el-table-column>
                 <el-table-column align="center" min-width="100px" label="图片" prop="source">
                     <template slot-scope="scope2">
                       <img :src="scope2.row.source" alt="" style="width: 80px;height: 80px">
                     </template>
    </el-table-column>
  </el-table>
  <el-button slot="reference" type="primary" size="mini" @click="handlegridData(scope.row)">查看</el-button>
  </el-popover>
  </template>
  </el-table-column>

  <el-table-column align="center" min-width="100px" label="是否精品" prop="isBestGoods">
    <template slot-scope="scope">
          <el-tag :type="scope.row.isBestGoods === 1 ? 'success' : 'error' ">{{scope.row.isBestGoods === 1 ? '是' : '否'}}</el-tag>
        </template>
  </el-table-column>

  <el-table-column align="center" min-width="100px" label="是否热销" prop="isHot">
    <template slot-scope="scope">
          <el-tag :type="scope.row.isHot === 1 ? 'success' : 'error' ">{{scope.row.isHot === 1 ? '是' : '否'}}</el-tag>
        </template>
  </el-table-column>

  <el-table-column align="center" min-width="100px" label="是否新品" prop="isNew">
    <template slot-scope="scope">
          <el-tag :type="scope.row.isNew === 1 ? 'success' : 'error' ">{{scope.row.isNew === 1 ? '是' : '否'}}</el-tag>
        </template>
  </el-table-column>

  <el-table-column align="center" min-width="100px" label="是否特惠" prop="isPreference">
    <template slot-scope="scope">
          <el-tag :type="scope.row.isPreference === 1 ? 'success' : 'error' ">{{scope.row.isPreference === 1 ? '是' : '否'}}</el-tag>
        </template>
  </el-table-column>

  <el-table-column align="center" min-width="100px" label="是否推荐" prop="isShare">
    <template slot-scope="scope">
          <el-tag :type="scope.row.isShare === 1 ? 'success' : 'error' ">{{scope.row.isShare === 1 ? '是' : '否'}}</el-tag>
        </template>
  </el-table-column>

  <!-- <el-table-column align="center" min-width="100px" label="是否热销" prop="isHot">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isHot ? 'success' : 'error' ">{{scope.row.isHot ? '热品' : '非热品'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="是否新品" prop="isHot">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isHot ? 'success' : 'error' ">{{scope.row.isHot ? '热品' : '非热品'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="是否特惠" prop="isHot">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isHot ? 'success' : 'error' ">{{scope.row.isHot ? '热品' : '非热品'}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px" label="是否推荐" prop="isHot">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isHot ? 'success' : 'error' ">{{scope.row.isHot ? '热品' : '非热品'}}</el-tag>
        </template>
      </el-table-column> -->

  <el-table-column align="center" min-width="100px" label="缩略图" prop="goodsBannerFileList">
    <template slot-scope="scope">
          <!-- {{scope.row.goodsSources[0].source}} -->
          <img v-if="scope.row.goodsBannerFileList!=null && scope.row.goodsBannerFileList.length>0 " :src="scope.row.goodsBannerFileList[0].url" alt="" style="width: 80px;height: 80px">
        </template>
  </el-table-column>

  <el-table-column align="center" min-width="100px" label="图片简介" prop="isBestGoods">
    <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="click">
             <el-table :data="gridImageJJData">
                 <el-table-column align="center" min-width="100px" label="图片简介" prop="source">
                     <template slot-scope="scope3">
                       <img :src="scope3.row.url" alt="" style="width: 80px;height: 80px">
                     </template>
  </el-table-column>
  </el-table>
  <el-button slot="reference" type="primary" size="mini" @click="handleImageJJgridData(scope.row)">查看</el-button>
  </el-popover>
  </template>
  </el-table-column>

  <el-table-column align="center" min-width="100px" label="图片商品介绍" prop="isBestGoods">
    <template slot-scope="scope">
          <el-popover placement="right" width="100" trigger="click">
             <el-table :data="gridImageSHData">
                 <el-table-column align="center" min-width="100px" label="图片商品介绍" prop="source">
                     <template slot-scope="scope4">
                       <img :src="scope4.row.url" alt="" style="width: 80px;height: 80px">
                     </template>
  </el-table-column>
  </el-table>
  <el-button slot="reference" type="primary" size="mini" @click="handleImageSHgridData(scope.row)">查看</el-button>
  </el-popover>
  </template>
  </el-table-column>

  <el-table-column align="center" min-width="100px" label="是否禁用" prop="status">
    <template slot-scope="scope">
          <el-tag :type="scope.row.status === 0 ? 'success' : 'error' ">{{scope.row.status === 0 ? '正常' : '禁用'}}</el-tag>
        </template>
  </el-table-column>


  <el-table-column align="center" min-width="100px" label="排序" prop="priority">
  </el-table-column>

  <el-table-column align="center" min-width="150px" label="创建时间" prop="createTime" :formatter="dateFormat">
  </el-table-column>

  <el-table-column align="center" min-width="150px" label="修改时间" prop="updateTime" :formatter="dateFormat">
  </el-table-column>



  </el-table>

  <!-- 分页 -->
  <div class="pagination-container">
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-sizes="[10,20,30,50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>

  <el-tooltip placement="top" content="返回顶部">
    <back-to-top :visibilityHeight="100"></back-to-top>
  </el-tooltip>

  <!-- 添加或修改对话框 -->
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" @open="openDialog" :close-on-click-modal="false">
    <el-form :rules="rules" ref="dataForm" :model="dataForm" status-icon label-position="left" label-width="100px" style='width: 400px; margin-left:50px; display:inline'>
      <!-- <el-form-item label="商品编号" prop="goodsSn">
          <el-input v-model="dataForm.goodsSn"></el-input>
        </el-form-item> -->
      <el-form-item label="商品名称" prop="name" style="width:300px">
        <el-input v-model="dataForm.name"></el-input>
      </el-form-item>

      <el-form-item label="所属分类" prop="categoryId">
        <el-select clearable class="filter-item" style="width: 200px;" v-model="dataForm.categoryId" placeholder="请选择所属分类">
          <el-option v-for="item in goodsClassify" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品描述" prop="description" style="width:500px">
        <el-input v-model="dataForm.description"></el-input>
      </el-form-item>

      <!-- <el-form-item style="width: 700px;" label="商品详细介绍">
          <tinymce v-model="dataForm.goodsDesc"></tinymce>
        </el-form-item> -->

      <el-form-item label="店铺价格" prop="price" style="width:300px">
        <el-input v-model="dataForm.price"></el-input>
      </el-form-item>

      <el-form-item label="市场价格" prop="priceMart" style="width:300px">
        <el-input v-model="dataForm.priceMart"></el-input>
      </el-form-item>

      <el-form-item label="商品关键字" prop="keyWords" style="width:300px">
        <el-input v-model="dataForm.keyWords"></el-input>
      </el-form-item>

      <el-form-item label="总库存" prop="numTotal" style="width:300px">
        <el-input v-model.number="dataForm.numTotal" :disabled="numTotalDisabled"></el-input>
      </el-form-item>

      <el-form-item label="预警库存" prop="numWarning" style="width:300px">
        <el-input v-model.number="dataForm.numWarning"></el-input>
      </el-form-item>

      <el-form-item label="商品属性">
        <template slot-scope="scope">
            <el-checkbox-group v-model="checkAttributeList">
              <el-checkbox v-for="item in attributeList" :label="item" :key="item.id">{{item.name}}</el-checkbox>
            </el-checkbox-group>

            <el-table :data="dynamicFormData" v-show = "checkAttributeList.length>0" border fit highlight-current-row style="width: 100%">

              <el-table-column align="center" label="操作" width="100" class-name="small-padding fixed-width">
                      <template slot-scope="scope">
                        <el-button type="danger" size="mini"  @click="handleDeleteItem(scope.row)">删除</el-button>
                      </template>
        </el-table-column>

        <el-table-column :key='item.id' v-for='(item, index) in checkAttributeList' :label="item.name">
          <template slot-scope="scopeT">
                            <el-select clearable class="filter-item" v-model="scopeT.row.attri[index]" placeholder="请选择属性值" :key="key+item.id+item.name">
                              <el-option v-for="item2 in item.attributeValues" :key="key+item2.id+item2.name" :label="item2.name" :value="item2.id">
                              </el-option>
                            </el-select>
                      </template>
        </el-table-column>

        <el-table-column align="center" label="库存" width="100" class-name="small-padding fixed-width">
          <template slot-scope="scopeY">
                              <!-- <el-input v-model="dataForm.priceMart"></el-input> -->
                              <el-input size="small" v-model="scopeY.row.inventory" :change="calculationNumTotal()"></el-input>
                      </template>
        </el-table-column>

        <el-table-column align="center" label="单价" width="100" class-name="small-padding fixed-width">
          <template slot-scope="scopeZ">
                              <!-- <el-input v-model="dataForm.priceMart"></el-input> -->
                              <el-input size="small" v-model="scopeZ.row.price"></el-input>
                      </template>
        </el-table-column>

        <el-table-column align="center" label="商品图片" width="150" class-name="small-padding fixed-width">
          <template slot-scope="scopeX">
                    <el-upload class="avatar-uploader" action="#" :http-request="uploadPicUrls3" :show-file-list="false" :before-upload="beforeAvatarUpload" :data="{type: 'logo',index : scopeX.$index}">
                        <img v-if="scopeX.row.attriSource" :src="scopeX.row.attriSource" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </template>
        </el-table-column>

        <!-- <el-form-item label="属性图片">
                <template slot-scope="scopeX">
                  <el-upload class="avatar-uploader" action="#" :http-request="uploadPicUrls3" :show-file-list="false" :before-upload="beforeAvatarUpload">
                      <img v-if="scopeX.row.attriSource" :src="scopeX.row.attriSource" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </template>
              </el-form-item> -->

        </el-table>

        <el-button v-show="checkAttributeList.length>0" class='cancel-btn' size="small" type="warning" @click="addItem()">添加数据</el-button>

        <!-- <template slot-scope="scope3">
              <template>
                <el-button class='cancel-btn' size="small" type="warning" @click="cancelEdit(scope.row)">添加数据</el-button>
              </template>
            </template> -->

        </template>
      </el-form-item>

      <el-form-item label="商品卖点">
        <!-- <el-checkbox-group v-model="checkList">
          </el-checkbox-group> -->
        <el-checkbox v-model="dataForm.isBestGoods">设为精品</el-checkbox>
        <el-checkbox v-model="dataForm.isHot">设为热销</el-checkbox>
        <el-checkbox v-model="dataForm.isNew">设为新品</el-checkbox>
        <el-checkbox v-model="dataForm.isPreference">设为特惠</el-checkbox>
        <el-checkbox v-model="dataForm.isShare">设为推荐</el-checkbox>
      </el-form-item>


      <!-- <el-form-item label="是否新品" prop="isNew">
          <el-select v-model="dataForm.isNew" placeholder="请选择">
            <el-option label="新品" :value="true">
            </el-option>
            <el-option label="新品" :value="false">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否热品" prop="isHot">
          <el-select v-model="dataForm.isHot" placeholder="请选择">
            <el-option label="热品" :value="true">
            </el-option>
            <el-option label="非热品" :value="false">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否在售" prop="isOnSale">
          <el-select v-model="dataForm.isOnSale" placeholder="请选择">
            <el-option label="在售" :value="true">
            </el-option>
            <el-option label="未售" :value="false">
            </el-option>
          </el-select>
        </el-form-item> -->

      <!-- <el-form-item label="首页主图">
          <el-input v-model="dataForm.listPicUrl"></el-input>
        </el-form-item>

        <el-form-item label="宣传画廊">
          <el-input v-model="dataForm.gallery"></el-input>
        </el-form-item>

        <el-form-item label="商品介绍">
          <el-input v-model="dataForm.goodsBrief"></el-input>
        </el-form-item> -->

      <el-form-item label="排序" style="width:300px">
        <el-input v-model="dataForm.priority"></el-input>
      </el-form-item>

      <el-form-item label="商品图片">
        <el-upload action="#" :limit="5" :http-request="uploadPicUrls" :show-file-list="true" :file-list="dataForm.goodsBannerFileList" :before-upload="beforeAvatarUpload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-exceed="handleGoBeyond"
          :on-remove="handlerOnRemove" ref="upload">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="商品详情图片">
        <el-upload action="#" :http-request="uploadPicUrls2" :show-file-list="true" :file-list="dataForm.goodsDetailFileList" :before-upload="beforeAvatarUpload" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handlerOnRemove2" ref="upload2">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="上架">
        <el-radio v-model="dataForm.isOnSale" :label="shangjia">立即上架</el-radio>
        <el-radio v-model="dataForm.isOnSale" :label="bushangjia">暂不上架</el-radio>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">确定</el-button>
      <el-button v-else type="primary" @click="updateData">确定</el-button>
    </div>
  </el-dialog>

  <el-dialog :visible.sync="dialogVisible">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>


  <el-dialog :visible.sync="previewDialogVisible" width="500px">
    <div class="van-doc-simulator van-doc-simulator-fixed">
        <van-swipe class="goods-swipe" :autoplay="3000">
          <van-swipe-item v-for="url in goods.bannerImgList" :key="url">
            <img :src="url" width="460px">
          </van-swipe-item>
        </van-swipe>

        <van-cell-group>
          <van-cell>
            <div class="goods-title">商品名称:{{ goods.title }}</div>
            <div style="display: flex;justify-content: flex-start; align-items:center;">
                <div style="display: flex;justify-content: flex-start; align-items:center;">
                   商品价格:<h2 style="color:red;">  &nbsp;&nbsp;&nbsp;  ￥{{ goods.price }}</h2>
                </div>
                <div style="text-decoration:line-through;display: flex;justify-content: flex-start;align-items:center;">
                    ￥{{ goods.priceMart }}
                </div>
             </div>
          </van-cell>
          <!-- <van-cell> -->
            <!-- <van-col span="10">运费：{{ goods.express }}</van-col> -->
            <!-- <van-col span="14">剩余：{{ goods.remain }}</van-col>
          </van-cell> -->
        </van-cell-group>

        <van-cell-group>
          <van-cell style="text-align: center;margin: 0 auto;">
               <img v-for="url in goods.detailImgList" :key="url" :src="url" width="430px">
          </van-cell>
        </van-cell-group>
        <!-- <van-cell-group class="goods-cell-group">
          <van-cell value="进入店铺" icon="shop" is-link>
            <template slot="title">
              <span class="van-cell-text">有赞的店</span>
              <van-tag type="danger">官方</van-tag>
            </template>
          </van-cell>
          <van-cell title="线下门店" icon="location" is-link />
        </van-cell-group>

        <van-cell-group class="goods-cell-group">
          <van-cell title="查看商品详情" is-link />
        </van-cell-group> -->

        <van-goods-action class="myVan-goods-action">
          <van-goods-action-mini-btn icon="chat" >
            客服
          </van-goods-action-mini-btn>
          <van-goods-action-mini-btn icon="cart">
            购物车
          </van-goods-action-mini-btn>
          <van-goods-action-big-btn >
            加入购物车
          </van-goods-action-big-btn>
          <van-goods-action-big-btn primary>
            立即购买
          </van-goods-action-big-btn>
        </van-goods-action>
      </div>
  </el-dialog>


</div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 200px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
}

.el-dialog {
  width: 800px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.myVan-goods-action {
	left: 0;
	right: 0;
	bottom: 0;
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	position: static;
	justify-content: center;
	align-items: center;
	width: auto;
	margin: 0 auto;
}
</style>

<script>
import Vue from 'vue'
import {
  listGoods,
  createGoods,
  updateGoods,
  deleteGoods
} from '@/api/goods'
import {
  listGoodsClassify
} from '@/api/goods-classify'
import {
  listGoodsAttribute
} from '@/api/goods-attribute'
import {
  uploadFile
} from '@/api/upload'
import waves from '@/directive/waves' // 水波纹指令
import BackToTop from '@/components/BackToTop'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'Goods',
  components: {
    BackToTop,
    Tinymce
  },
  directives: {
    waves
  },
  data() {
    return {
      list: undefined,
      numTotalDisabled: false,
      goodsClassify: [],
      attributeList: [],
      gridData: [],
      gridImageJJData: [],
      gridImageSHData: [],
      total: undefined,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 20,
        param: {
          name: undefined,
          goodsCode: undefined
        }
      },
      dataForm: {
        id: undefined,
        categoryId: undefined,
        goodsCode: undefined,
        name: undefined,
        unit: undefined,
        description: undefined,
        price: undefined,

        priceMart: undefined,
        keyWords: undefined,
        numTotal: undefined,
        numCurrent: 1,
        numWarning: undefined,
        numSale: 0,
        isOnSale: 1,

        isBestGoods: undefined,
        isHot: undefined,
        isNew: undefined,
        isPreference: undefined,
        isShare: undefined,
        priority: undefined,
        status: 0,
        goodsBannerFileList: [],
        goodsDetailFileList: [],
        goodsAttributeList: [],
      },
      checkAttributeList: [],
      dynamicFormData: [{
        id: undefined,
        inventory: undefined,
        price: undefined,
        attributeFile: undefined,
        attri: [],
        attriSource: undefined
      }],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '创建'
      },
      shangjia: 1,
      bushangjia: 0,
      dialogImageUrl: '',
      dialogVisible: false,
      previewDialogVisible:false,
      goods: {
        title: '美国伽力果（约680g/3个）',
        price: 2680,
        priceMart: 3000,
        express: '免运费',
        remain: 19,
        bannerImgList: [
          'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
          'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
        ],
        detailImgList: [
        ]
      },
      rules: {
        name: [{
          required: true,
          message: '商品名称不能为空',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '店铺价格不能为空',
          trigger: 'blur'
        }],
        priceMart: [{
          required: true,
          message: '市场价格不能为空',
          trigger: 'blur'
        }],
        keyWords: [{
          required: true,
          message: '关键字不能为空',
          trigger: 'blur'
        }],
        numTotal: [{
          required: true,
          message: '总库存不能为空',
          trigger: 'blur'
        }],
        numWarning: [{
          required: true,
          message: '预警库存不能为空',
          trigger: 'blur'
        }],
        priority: [{
          required: true,
          message: '排序不能为空',
          trigger: 'blur'
        }]
      },
      downloadLoading: false
    }
  },
  computed: {
    key: function() {
      return this.getCurrentTime()
    }
  },
  watch: {
    checkAttributeList: {
      //当c变化后会回调handler函数
      handler(newValue, oldValue) {
        // console.log('newValue\n' + JSON.stringify(newValue,null,2))
        // console.log('oldValue\n' + JSON.stringify(oldValue,null,2))
        // console.log('checkAttributeList值\n' + JSON.stringify(this.checkAttributeList,null,2))
        if (this.checkAttributeList.length <= 0) {
          this.numTotalDisabled = false
        } else {
          this.numTotalDisabled = true
        }

        //如果属性名一条都没选中则重置dynamicFormData，默认其实是有一条空数据的
        if (this.checkAttributeList.length <= 0) {
          this.dynamicFormData = [{
            inventory: undefined,
            price: undefined,
            attributeFile: undefined,
            attri: [],
            attriSource: undefined
          }]
        }

        //固定数组的大小，防止删除属性名的时候属性值数据不对，没有的置为""
        for (var i = 0; i < this.dynamicFormData.length; i++) {
          for (var j = 0; j < this.checkAttributeList.length; j++) {
            if (this.dynamicFormData[i].attri[j] === undefined) {
              this.dynamicFormData[i].attri[j] = ""
            }
          }
        }
        if (newValue.length < oldValue.length) { //说明是减少
          var delindex = -1

          var isExisting = true
          for (var i = 0; i < oldValue.length; i++) {
            for (var j = 0; j < newValue.length; j++) {
              if (oldValue[i].id === newValue[j].id) {
                isExisting = true
                break
              } else {
                isExisting = false
              }
            }
            if (!isExisting) {
              delindex = i
              break
            }
          }
          console.log('被删掉的index' + delindex)

          for (var j = 0; j < this.dynamicFormData.length; j++) {
            this.dynamicFormData[j].attri.splice(delindex, 1)
          }
        }
        //Vue.set(this.dynamicFormData, 0, this.dynamicFormData[0])
        console.log('this.dynamicFormData\n' + JSON.stringify(this.dynamicFormData, null, 2))
      },
      deep: true
    }
  },
  created() {
    this.getList()
    this.getClassList()
    this.getAttributeList()
  },
  methods: {
    getList() {
      this.listLoading = true
      listGoods(this.listQuery).then(response => {
        this.list = response.data.recordList
        this.total = response.data.totalCount
        this.listLoading = false
      }).catch(() => {
        this.list = []
        this.total = 0
        this.listLoading = false
      })
    },
    getClassList() { //获取分类
      var query = {
        currentPage: 1,
        pageSize: 50,
      }
      listGoodsClassify(query).then(response => {
        this.goodsClassify = response.data.recordList
      }).catch(() => {
        this.goodsClassify = []
      })
    },
    getAttributeList() {
      var query = {
        currentPage: 1,
        pageSize: 50,
      }
      listGoodsAttribute(query).then(response => {
        this.attributeList = response.data.recordList
      }).catch(() => {
        this.attributeList = []
      })
    },
    openDialog() {
      //if (this.dialogStatus == 'create') {
      // this.getClassList()
      // this.getAttributeList()
      //}
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    resetForm() {
      this.checkAttributeList = []
      this.dataForm = {
        id: undefined,
        categoryId: undefined,
        goodsCode: undefined,
        name: undefined,
        unit: '个',
        description: undefined,
        price: undefined,

        priceMart: undefined,
        keyWords: undefined,
        numTotal: undefined,
        numCurrent: 200,
        numWarning: undefined,
        numSale: 0,
        isOnSale: 1,

        isBestGoods: true,
        isHot: false,
        isNew: false,
        isPreference: false,
        isShare: false,
        priority: undefined,
        status: 0,
        goodsBannerFileList: [],
        goodsDetailFileList: [],
        goodsAttributeList: []
      }
    },
    filterLevel(value, row) {
      return row.level === value
    },
    handleGoBeyond(files, fileList) {
      this.$message.error('最多上传5张图片!')
    },
    //如果上传到最后一张了取消加号
    hidePictureCardUpload() {
      if (this.dataForm.goodsBannerFileList.length >= 5) {
        document.getElementsByClassName('el-upload el-upload--picture-card')[0].style.display = 'none'
      } else {
        document.getElementsByClassName('el-upload el-upload--picture-card')[0].style.display = ''
      }
    },
    handlerOnRemove(files, fileList) {
      console.log('触发handlerOnRemove');
      console.log('item值\n' + JSON.stringify(fileList, null, 2))
      // this.dataForm.fileList = fileList
      this.dataForm.goodsBannerFileList = fileList
      this.hidePictureCardUpload()
    },
    handlerOnRemove2(files, fileList) {
      this.dataForm.goodsDetailFileList = fileList
    },
    uploadPicUrls(item) {
      // console.log('item值\n' + JSON.stringify(this.$refs['dataForm'],null,2))

      const formData = new FormData()
      formData.append('file', item.file)
      uploadFile(formData).then(res => {
        //console.log('新的图片返回值DATA\n' + JSON.stringify(res,null,2))

        var uploadUrlSuc = {
          name: res.data.fileName,
          url: res.data.fileName
        }
        this.dataForm.goodsBannerFileList.push(uploadUrlSuc)
        // this.fileList.push(uploadUrlSuc)

        // console.log('item值\n' + JSON.stringify(this.dataForm.fileList,null,2))
        this.hidePictureCardUpload()

        this.$notify({
          title: '图片上传成功',
          message: '~\(≧▽≦)/~啦啦啦',
          type: 'success',
          duration: 2000
        })

      }).catch(() => {
        this.$message.error('上传失败，请重新上传')
        this.dataForm.goodsBannerFileList.splice(this.dataForm.goodsBannerFileList.length, 1)
        console.log('item值\n' + JSON.stringify(this.dataForm.goodsBannerFileList, null, 2))
      })
    },
    uploadPicUrls2(item) {
      const formData = new FormData()
      formData.append('file', item.file)
      uploadFile(formData).then(res => {
        var uploadUrlSuc = {
          name: res.data.fileName,
          url: res.data.fileName
        }
        this.dataForm.goodsDetailFileList.push(uploadUrlSuc)
        this.$notify({
          title: '图片上传成功',
          message: '~\(≧▽≦)/~啦啦啦',
          type: 'success',
          duration: 2000
        })
      }).catch(() => {
        this.$message.error('上传失败，请重新上传')
        this.dataForm.goodsDetailFileList.splice(this.dataForm.goodsDetailFileList.length, 1)
      })
    },
    uploadPicUrls3(item) {
      console.log('uploadPicUrls3中item值\n' + JSON.stringify(item, null, 2))
      var index = item.data.index
      const formData = new FormData()
      formData.append('file', item.file)
      uploadFile(formData).then(res => {
        var uploadUrlSuc = {
          name: res.data.fileName,
          url: res.data.fileName
        }
        //this.dataForm.goodsDetailFileList.push(uploadUrlSuc)
        // console.log('index'+index)
        //this.dynamicFormData[index].attriSource = uploadUrlSuc.url
        var item = this.dynamicFormData[index]
        item.attriSource = uploadUrlSuc.url
        this.dynamicFormData.splice(index, 1, item)

        this.$notify({
          title: '图片上传成功',
          message: '~\(≧▽≦)/~啦啦啦',
          type: 'success',
          duration: 2000
        })
      }).catch(() => {
        this.$message.error('上传失败，请重新上传')
        var item = this.dynamicFormData[index]
        item.attriSource = ''
        this.dynamicFormData.splice(index, 1, item)
        //this.dataForm.goodsDetailFileList.splice(this.dataForm.goodsDetailFileList.length, 1)
      })
    },
    beforeAvatarUpload(file) {
      console.log(file.type);
      // const isJPG = file.type === 'image/jpeg';
      var isJPG = true;
      if (file.type.indexOf('image') === -1) {
        isJPG = false;
      }

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片格式不对!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.hidePictureCardUpload()
      })
    },
    booleanConvertInt() { //true false 转为 1 0
      this.dataForm.isBestGoods = this.dataForm.isBestGoods ? 1 : 0;
      this.dataForm.isHot = this.dataForm.isHot ? 1 : 0;
      this.dataForm.isNew = this.dataForm.isNew ? 1 : 0;
      this.dataForm.isPreference = this.dataForm.isPreference ? 1 : 0;
      this.dataForm.isShare = this.dataForm.isShare ? 1 : 0;
    },
    intConvertBoolean() {
      this.dataForm.isBestGoods = this.dataForm.isBestGoods === 1 ? true : false;
      this.dataForm.isHot = this.dataForm.isHot === 1 ? true : false;
      this.dataForm.isNew = this.dataForm.isNew === 1 ? true : false;
      this.dataForm.isPreference = this.dataForm.isPreference === 1 ? true : false;
      this.dataForm.isShare = this.dataForm.isShare === 1 ? true : false;
    },
    calculationNumTotal() { //如果选择了属性名，总库存以属性值的库存总和为准
      if (this.checkAttributeList.length > 0) {
        var total = 0
        for (var i = 0; i < this.dynamicFormData.length; i++) {
          if (!isNaN(this.dynamicFormData[i].inventory)) {
            total += parseInt(this.dynamicFormData[i].inventory)
          }
        }
        this.dataForm.numTotal = total
      }
    },
    checkLegal(){ //验证各个参数的合法性
      var result = true
      //验证前面的输入框
      if(this.dataForm.categoryId == null || this.dataForm.categoryId == undefined){
        this.$message.error('商品分类不能为空!');
        result = false
        return result
      }

      if(isNaN(this.dataForm.price)){
        this.$message.error('请填写正确的商品价格!');
        result = false
        return result
      }

      if(isNaN(this.dataForm.priceMart)){
        this.$message.error('请填写正确的商品市场价格!');
        result = false
        return result
      }

      if(isNaN(this.dataForm.numTotal)){
        this.$message.error('请填写正确的总库存!');
        result = false
        return result
      }

      if(isNaN(this.dataForm.numWarning)){
        this.$message.error('请填写正确的预警库存!');
        result = false
        return result
      }

      if(this.dataForm.goodsBannerFileList == null || this.dataForm.goodsBannerFileList.length <= 0){
        this.$message.error('请上传商品图片!');
        result = false
        return result
      }

      if(this.dataForm.goodsDetailFileList == null || this.dataForm.goodsDetailFileList.length <= 0){
        this.$message.error('请上传商品详情图片!');
        result = false
        return result
      }

      return result
    },
    createData() {
      console.log('dynamicFormData\n' + JSON.stringify(this.dynamicFormData, null, 2))
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if(!this.checkLegal()){
             return
          }
          //这边开始封装商品属性
          this.dataForm.goodsAttributeList = []
          if (this.checkAttributeList.length > 0) {
            for (var i = 0; i < this.dynamicFormData.length; i++) {
              if (this.dynamicFormData[i].inventory === '' || this.dynamicFormData[i].inventory === undefined) {
                this.$message.error('商品属性中库存不能为空!');
                return
              }
              if(isNaN(this.dynamicFormData[i].inventory)){
                this.$message.error('商品属性中库存填写错误!');
                return
              }
              if (this.dynamicFormData[i].price === '' || this.dynamicFormData[i].price === undefined) {
                this.$message.error('商品属性中单价不能为空!');
                return
              }
              if(isNaN(this.dynamicFormData[i].price )){
                this.$message.error('商品属性中单价填写错误!');
                return
              }
              for (var j = 0; j < this.dynamicFormData[i].attri.length; j++) {
                if (this.dynamicFormData[i].attri[j] === '') {
                  this.$message.error(this.checkAttributeList[j].name + '不能为空!');
                  return
                }
              }
            }

            var attributeId = ''
            var attributeNames = ''
            for (var i = 0; i < this.checkAttributeList.length; i++) {
              attributeId += this.checkAttributeList[i].id + ','
              attributeNames += this.checkAttributeList[i].name + ','
            }

            console.log('attributeId的值\n' + JSON.stringify(attributeId, null, 2))
            console.log('attributeNames的值\n' + JSON.stringify(attributeNames, null, 2))

            for (var i = 0; i < this.dynamicFormData.length; i++) {
              var attributeItem = {
                attributeId: undefined,
                attributeNames: undefined,
                attributeValueId: undefined,
                attributeValueNames: undefined,
                source: undefined,
                price: undefined,
                numCurrent: undefined,
                numTotal: undefined,
                numSale: 0,
              }

              attributeItem.numCurrent = this.dynamicFormData[i].inventory
              attributeItem.numTotal = this.dynamicFormData[i].inventory
              attributeItem.price = this.dynamicFormData[i].price

              attributeItem.attributeId = attributeId.substr(0, attributeId.length - 1)
              attributeItem.attributeNames = attributeNames.substr(0, attributeNames.length - 1)

              attributeItem.source = this.dynamicFormData[i].attriSource

              var attributeValueId = ''
              var attributeValueNames = ''

              for (var j = 0; j < this.dynamicFormData[i].attri.length; j++) {
                attributeValueId += this.dynamicFormData[i].attri[j] + ','
                attributeValueNames += this.dynamicFormData[i].attri[j] + ','
              }

              attributeItem.attributeValueId = attributeValueId.substr(0, attributeValueId.length - 1)
              attributeItem.attributeNames = attributeNames.substr(0, attributeNames.length - 1)

              this.dataForm.goodsAttributeList.push(attributeItem)
            }

          }
          console.log('保存的值\n' + JSON.stringify(this.dataForm, null, 2))

          this.booleanConvertInt()
          this.dataForm.goodsCode = this.getCurrentTime().toString();
          console.log('保存的值\n' + JSON.stringify(this.dataForm, null, 2))
          createGoods(this.dataForm).then(response => {
            // this.list.unshift(response.data.data)
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handlePreview(row){
        this.previewDialogVisible = true
        var rowItem = Object.assign({}, row)
        this.goods.title = rowItem.name
        this.goods.price = rowItem.price
        this.goods.priceMart = rowItem.priceMart
        this.goods.remain = rowItem.numTotal
        this.goods.bannerImgList = []
        this.goods.detailImgList = []
        if (typeof(rowItem.goodsBannerFileList) != undefined){
            for (var i = 0; i < rowItem.goodsBannerFileList.length; i++) {
                this.goods.bannerImgList.push(rowItem.goodsBannerFileList[i].url)
            }
        }
        if (typeof(rowItem.goodsDetailFileList) != undefined){
            for (var i = 0; i < rowItem.goodsDetailFileList.length; i++) {
                this.goods.detailImgList.push(rowItem.goodsDetailFileList[i].url)
            }
        }

    },
    handleUpdate(row) {
      var rowItem = Object.assign({}, row)
      this.dataForm = rowItem
      if (rowItem.goodsBannerFileList == null) {
        this.dataForm.goodsBannerFileList = []
      }
      this.dynamicFormData = []
      this.checkAttributeList = []
      //先填充属性名
      var attributeid = []
      if (rowItem.goodsAttributeList != null && rowItem.goodsAttributeList.length > 0) {
        attributeid = rowItem.goodsAttributeList[0].attributeId.split(",")
      }

      for (var i = 0; i < attributeid.length; i++) {
        for (var j = 0; j < this.attributeList.length; j++) {
          if (attributeid[i] == this.attributeList[j].id) {
            this.checkAttributeList.push(this.attributeList[j])
            break
          }
        }
      }

      //再填充属性值
      for (var i = 0; i < rowItem.goodsAttributeList.length; i++) {
        var item = {
          id: rowItem.goodsAttributeList[i].id,
          inventory: rowItem.goodsAttributeList[i].numCurrent,
          price: rowItem.goodsAttributeList[i].price,
          attributeFile: undefined,
          attri: rowItem.goodsAttributeList[i].attributeValueId.split(',').map(Number), //字符串数组改为数字数组
          attriSource: rowItem.goodsAttributeList[i].source,
          numSale: rowItem.goodsAttributeList[i].numSale
        }
        this.dynamicFormData.push(item)
      }


      this.calculationNumTotal()

      this.intConvertBoolean()

      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.hidePictureCardUpload()
      })
    },
    updateData() {
      console.log('dynamicFormData\n' + JSON.stringify(this.dynamicFormData, null, 2))
      console.log('保存的值\n' + JSON.stringify(this.dataForm, null, 2))
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if(!this.checkLegal()){
             return
          }
          //这边开始封装商品属性
          this.dataForm.goodsAttributeList = []
          if (this.checkAttributeList.length > 0) {
            for (var i = 0; i < this.dynamicFormData.length; i++) {
              if (this.dynamicFormData[i].inventory === '' || this.dynamicFormData[i].inventory === undefined) {
                this.$message.error('商品属性中库存不能为空!');
                return
              }
              if(isNaN(this.dynamicFormData[i].inventory)){
                this.$message.error('商品属性中库存填写错误!');
                return
              }
              if (this.dynamicFormData[i].price === '' || this.dynamicFormData[i].price === undefined) {
                this.$message.error('商品属性中单价不能为空!');
                return
              }
              if(isNaN(this.dynamicFormData[i].price )){
                this.$message.error('商品属性中单价填写错误!');
                return
              }

              for (var j = 0; j < this.dynamicFormData[i].attri.length; j++) {
                if (this.dynamicFormData[i].attri[j] === '') {
                  this.$message.error(this.checkAttributeList[j].name + '不能为空!');
                  return
                }
              }
            }


            var attributeId = ''
            var attributeNames = ''
            for (var i = 0; i < this.checkAttributeList.length; i++) {
              attributeId += this.checkAttributeList[i].id + ','
              attributeNames += this.checkAttributeList[i].name + ','
            }

            console.log('attributeId的值\n' + JSON.stringify(attributeId, null, 2))
            console.log('attributeNames的值\n' + JSON.stringify(attributeNames, null, 2))

            for (var i = 0; i < this.dynamicFormData.length; i++) {
              var attributeItem = {
                id: undefined,
                attributeId: undefined,
                attributeNames: undefined,
                attributeValueId: undefined,
                attributeValueNames: undefined,
                source: undefined,
                price: undefined,
                numCurrent: undefined,
                numTotal: undefined,
                numSale: undefined
              }

              if (this.dynamicFormData[i].id != null) {
                attributeItem.id = this.dynamicFormData[i].id
              }

              if (this.dynamicFormData[i].numSale != null) {
                attributeItem.numSale = this.dynamicFormData[i].numSale
              }

              attributeItem.numCurrent = this.dynamicFormData[i].inventory
              attributeItem.numTotal = this.dynamicFormData[i].inventory
              attributeItem.price = this.dynamicFormData[i].price
              attributeItem.source = this.dynamicFormData[i].attriSource

              attributeItem.attributeId = attributeId.substr(0, attributeId.length - 1)
              attributeItem.attributeNames = attributeNames.substr(0, attributeNames.length - 1)

              var attributeValueId = ''
              var attributeValueNames = ''

              for (var j = 0; j < this.dynamicFormData[i].attri.length; j++) {
                attributeValueId += this.dynamicFormData[i].attri[j] + ','
                attributeValueNames += this.dynamicFormData[i].attri[j] + ','
              }

              attributeItem.attributeValueId = attributeValueId.substr(0, attributeValueId.length - 1)
              attributeItem.attributeNames = attributeNames.substr(0, attributeNames.length - 1)

              this.dataForm.goodsAttributeList.push(attributeItem)
            }

          }

          this.booleanConvertInt()
          updateGoods(this.dataForm).then(() => {
            // for (const v of this.list) {
            //   if (v.id === this.dataForm.id) {
            //     const index = this.list.indexOf(v)
            //     this.list.splice(index, 1, this.dataForm)
            //     break
            //   }
            // }
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确定禁用吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.status = 1
        deleteGoods(row).then(response => {
          this.$notify({
            title: '成功',
            message: '禁用成功',
            type: 'success',
            duration: 2000
          })
          // const index = this.list.indexOf(row)
          // this.list.splice(index, 1)
          this.getList()

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          });
        });
      })

    },
    handleJh(row) {
      this.$confirm('确定激活吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        row.status = 0
        deleteGoods(row).then(response => {
          this.$notify({
            title: '成功',
            message: '激活成功',
            type: 'success',
            duration: 2000
          })

          this.getList()
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消激活'
        });
      });
    },
    handleDeleteItem(row) {
      if (this.dynamicFormData.length <= 1) {
        this.$message.error('至少保留一条数据!');
        return
      }
      const index = this.dynamicFormData.indexOf(row)
      this.dynamicFormData.splice(index, 1)
    },
    addItem() {
      var item = {
        inventory: undefined,
        price: undefined,
        attributeFile: undefined,
        attri: []
      }
      this.dynamicFormData.push(item)

      for (var i = 0; i < this.dynamicFormData.length; i++) {
        for (var j = 0; j < this.checkAttributeList.length; j++) {
          if (this.dynamicFormData[i].attri[j] === undefined) {
            this.dynamicFormData[i].attri[j] = ""
          }
        }
      }
    },
    handlegridData(row) {
      this.gridData = []
      var rowItem = Object.assign({}, row)
      this.gridData = rowItem.goodsAttributeList
    },
    handleImageJJgridData(row) {
      this.gridImageJJData = []
      var rowItem = Object.assign({}, row)
      this.gridImageJJData = rowItem.goodsBannerFileList
    },
    handleImageSHgridData(row) {
      this.gridImageSHData = []
      var rowItem = Object.assign({}, row)
      this.gridImageSHData = rowItem.goodsDetailFileList
    },
    handleDownload() {
      this.downloadLoading = true
      import ('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['商品ID', '商品编号', '名称', '专柜价格', '当前价格', '是否新品', '是否热品', '是否在售', '首页主图', '宣传画廊', '商品介绍', '详细介绍', '商品主图', '商品单位', '关键字', '类目ID', '品牌商ID']
        const filterVal = ['id', 'goodsSn', 'name', 'counterPrice', 'retailPrice', 'isNew', 'isHot', 'isOnSale', 'listPicUrl', 'gallery', 'goodsBrief', 'goodsDesc', 'primaryPicUrl', 'goodsUnit', 'keywords', 'categoryId', 'brandId']
        excel.export_json_to_excel2(tHeader, this.list, filterVal, '商品信息')
        this.downloadLoading = false
      })
    },
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return this.getDateTime(date);
    }
  }
}
</script>

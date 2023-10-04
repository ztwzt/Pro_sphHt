<template>
    <div>
        <!-- 按钮 -->
        <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px;" @click="showDialog">添加</el-button>
        <!--
        data:组件将来要展示的数据--数组类型
        border:表格边框
        column
        label:显示标题
        width:对应的宽度
        align:对齐方式
        prop:
        element-ui table 是以一列一列展示数据的
    -->
        <el-table :data="list" style="width:100%" border="">
            <el-table-column type="index" prop="prop" label="序号" width="80px" align="center">
            </el-table-column>
            <el-table-column prop="tmName" label="品牌名称" width="width">
            </el-table-column>
            <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
                <template slot-scope="{row,$index}">
                    <img :src="row.logoUrl" style="width: 100px;height: 100px;">
                </template>
            </el-table-column>
            <el-table-column prop="prop" label="操作" width="width">
                <template slot-scope="{row,$index}">
                    <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMask(row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 
        分页器 
            current-page 当前第几页
            total 数据总条数
            page-size 每一页条数
            layout 分页器布局
            page-sizes 设置每一页展示条数
            page-count 连续页码数
        @size-change="handlerSizeChange"
        @current-change="handlerCurrentChange" 
        -->
        <el-pagination style="margin-top: 20px; textAlign:center" @current-change="getPageList()"
            @size-change="handlerSizeChange" :current-page="page" :total="total" :page-count="5" :page-size="limit"
            :page-sizes="[3, 5, 10]" layout="prev,pager,next,jumper,->,sizes,total">
        </el-pagination>
        <!-- 
            添加 对话框 
            :visible.sync 控制对话框显示和隐藏
            Form 组件提供了表单验证的功能，
            只需要通过 rules 属性传入约定的验证规则，
            并将 Form-Item 的 prop 属性设置为需校验的字段名即可。
        -->
        <el-dialog :title="tmForm.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible">
            <!-- form 表单 model属性 收集表单的数据至那个对象，表单验证也需要-->
            <el-form style="width: 80%;" :model="tmForm" :rules="rules" ref="ruleForm">
                <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                    <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
                </el-form-item>
                <el-form-item label="品牌logo" label-width="100px" prop="logoUrl">
                    <!-- 
                        图片上传
                        这里不能v-model 因为不是表单元素
                        action 设置图片上传地址
                        :on-success :可以检测到上传成功 当图片上传成功时会执行一次
                        :before-upload:在上传图片之前，会执行一次
                     -->
                    <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload" :show-file-list="false"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrUpdateTradeMask">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'tradeMake',
    data() {
        //自定义校验规则
        var validateTmName = (rule, value, callback) => {
            //自定义校验规则
            if (value.length < 2 || value.length > 10) {
                callback(new Error('品牌名称2-10位'))
            } else {
                callback()
            }
        }
        return {
            page: 1,
            limit: 3,
            total: 0,
            list: [],
            dialogFormVisible: false,
            //表单数据
            tmForm: {
                tmName: '',
                logoUrl: '',
            },
            //表单验证规则
            rules: {
                //品牌名称验证规则
                //required 必须要校验的数据 message 提示信息 trigger 用户行为设置
                // min max 长度限制 
                tmName: [
                    { required: true, message: '请输入品牌名称', trigger: 'blur' },
                    //{ min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
                    //自定义校验规则
                    { validator: validateTmName, trigger: 'blur' }
                ],
                //品牌logo验证规则
                logoUrl: [
                    { required: true, message: '请选择品牌图片', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        async getPageList(pager = 1) {
            //优化操作
            this.page = pager
            const { page, limit } = this;
            //获取品牌列表接口 初始化需要参数
            let result = await this.$API.tradeMask.reqTradeMarkList(page, limit)
            if (result.code == 200) {
                this.total = result.data.total
                this.list = result.data.records
            }
        },
        //pageSize change
        handlerSizeChange(limit) {
            this.limit = limit
            this.getPageList()
        },
        //展示dialig
        showDialog() {
            this.dialogFormVisible = true
            //重置数据
            this.tmForm = { tmName: '', logoUrl: '' }
        },
        //修改 品牌数据
        updateTradeMark(row) {
            this.dialogFormVisible = true
            //tmForm 存储的即为服务器返回的品牌数据
            this.tmForm = { ...row }//注意----浅拷贝
        },
        //图片上传成功
        handleAvatarSuccess(res, file) {
            //res 上传成功返回的数据
            //file 上传成功返回的数据
            this.tmForm.logoUrl = res.data;
        },
        //图片上传之前
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        addOrUpdateTradeMask() {
            //当所有字段都通过验证的时候再执行业务
            this.$refs.ruleForm.validate(async (valid) => {
                //都符合条件
                if (valid) {
                    //添加/修改 确定 发请求
                    this.dialogFormVisible = false
                    let result = await this.$API.tradeMask.reqAddOrUpdateTradeMask(this.tmForm)
                    if (result.code == 200) {
                        //弹出信息
                        this.$message({
                            type: 'success',
                            message: this.tmForm.id ? '修改品牌成功' : '添加品牌成功'
                        })
                        //如果是修改品牌，应该停留在当前页
                        //添加品牌则留在最后一页
                        this.getPageList(this.page)
                    } else {
                        //弹出信息
                        this.$message(this.tmForm.id ? '修改品牌失败' : '添加品牌失败')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //删除
        deleteTradeMask(row) {
            //弹窗
            this.$confirm(`此操作将永久删除${row.tmName}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                //确定
                let result= await this.$API.tradeMask.reqDeleteTradeMask(row.id)
                if(result.code==200){
                    this.$message({
                         type: 'success',
                        message: '删除成功!'
                    })
                    //当前页商品数量
                    this.getPageList(this.list.length>1?this.page:this.page-1)
                }
            }).catch(() => {
                //取消
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
        }

    },
    mounted() {
        this.getPageList()
    }
}
</script>

<style>
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
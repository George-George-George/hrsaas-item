<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :http-request="onRequest"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      class="custom-upload"
      :class="fileList.length ? 'hide' : ''"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog
      v-loading="loading"
      :visible.sync="isShow"
      :before-close="handleClose"
    >
      <img :src="imgUrl" />
    </el-dialog>
  </div>
</template>

<script>
// id: AKIDVquiFUSAbkcDXaLp2yd18yXppZ2D7k6B
// key: oNfgQt50f6JHzRdYCbkeHeka9RSEkzwd
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDVquiFUSAbkcDXaLp2yd18yXppZ2D7k6B',
  SecretKey: 'oNfgQt50f6JHzRdYCbkeHeka9RSEkzwd'
})
export default {
  name: 'UpLoadImg',
  data() {
    return {
      fileList: [],
      isShow: false,
      imgUrl: '',
      loading: false
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      cos.putObject(
        {
          Bucket: 'qiaozhi-1301023273' /* 必须 */,
          Region: 'ap-nanjing' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          if (err || data.statusCode != 200) {
            return this.$message.error('fail')
          }
          this.$emit('onSuccess', {
            url: 'http://' + data.Location
          })
        }
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
      console.log(file)
      console.log(fileList)
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.isShow = true
      this.imgUrl = file.url
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    beforeUpload(file) {
      this.loading = true
      const types = ['image/jpeg', 'image/jpg']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join(',') + '图片')
        return false
      }
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片不能超过2mb')
        this.loading = false
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>

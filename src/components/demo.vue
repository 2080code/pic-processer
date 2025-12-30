<template>
  <header>
    <h1>@2080code/pic-processer demo</h1>
  </header>
  <article>
    <dl>
      <dt>
        <h2>选取图片</h2>
      </dt>
      <dd>
        <input type="file" draggable @change="event=>selectFile(event as InputEvent)" />
      </dd>
    </dl>

    <hr />

    <dl>
      <dt>
        <h2>getDataURL</h2>
      </dt>
      <dd>
      </dd>
      <dd>
        <label for="data-url-text">原始图片转为 dataURL：</label>
        <textarea id="data-url-text" ref="data-url-text" v-model="originDataURL" readonly rows="5"></textarea>
      </dd>
    </dl>

    <hr />

    <dl>
      <dt>
        <h2>compress</h2>
      </dt>
      <dd>
        <label for="compress-ratio">ratio：</label>
        <select id="compress-ratio" v-model="compressOptions.ratio" @change="compressOptionChange">
          <option value="1" selected>1（无压缩，输出字节可能会远大于原图）</option>
          <option value="0.8">0.8</option>
          <option value="0.6">0.6</option>
          <option value="0.4">0.4</option>
          <option value="0.2">0.2</option>
        </select>
      </dd>
      <dd>
        <label for="compress-max-width">maxWidth：</label>
        <input type="number" inputmode="numeric" id="compress-max-width" v-model="compressOptions.maxWidth" @change="compressOptionChange" />px
      </dd>
      <dd>
        <label for="compress-mime">mime：</label>
        <select id="compress-mime" v-model="compressOptions.mime" @change="compressOptionChange">
          <option value="image/jpeg" selected>image/jpeg</option>
          <option value="image/png">image/png</option>
        </select>
      </dd>
      <dd>
        <div>
          <template v-if="file">original file size: <em>{{file.size}} byte</em><br/></template>
          <template v-if="exportedFile">compressed file size: <em>{{exportedFile.size}} byte</em></template>
        </div>
      </dd>
      <dd>
        <img v-show="compressedDataURL" :src="compressedDataURL" alt="preview">
      </dd>
    </dl>

    <hr />

    <dl>
      <dt>
        <h2>dataURLtoFile</h2>
      </dt>
      <dd>
        <label for="exported-file-name">输入文件名：</label>
        <input type="text" id="exported-file-name" v-model="exportedFileName" placeholder="请输入文件名" @change="compressOptionChange" />
      </dd>
      <dd>
        通过上面 compress 方法输出的 dataURL 被转为 File 对象后的信息:
        <div v-if="exportedFile">
          name: <em>{{exportedFile.name}}</em><br/>
          size: <em>{{exportedFile.size}} byte</em><br/>
          type: <em>{{exportedFile.type}}</em><br/>
        </div>
        <div v-else>
          <small>请先在 compress 中选择文件</small>
        </div>
      </dd>
    </dl>

  </article>
</template>

<script setup lang="ts">
import { ref,reactive,useTemplateRef } from 'vue'
import PicProcesser from '@/major/pic-processer'
// import PicProcesser from '@2080code/pic-processer'

const file=ref<File|null>(null)
const dataURLText= useTemplateRef<HTMLTextAreaElement>('data-url-text')
const originDataURL=ref<string>('')
const compressOptions=reactive<{
  ratio:string,
  maxWidth:string,
  mime: PicProcesserTypes.MIMETypes
}>({
  ratio:'1',
  maxWidth:'300',
  mime:'image/jpeg'
})
const compressedDataURL=ref<string>('')
const exportedFileName=ref<string>('')
const exportedFile=ref<File|null>(null)

const picProcesser = new PicProcesser()

async function selectFile(event:InputEvent){
  file.value=(event.target as HTMLInputElement).files?.[0]!
  // getDataURL
  originDataURL.value = await picProcesser.getDataURL(file.value)
  dataURLText.value!.scrollTop = 0
  compressOptionChange()
  return originDataURL.value
}

async function compressOptionChange(){
  // compress
  if(file.value){
    compressedDataURL.value = await picProcesser.compress(
      file.value,
      {
        ratio:+compressOptions.ratio,
        maxWidth:+compressOptions.maxWidth,
        mime:compressOptions.mime
      }
    )
    // dataURLtoFile
    exportedFile.value = await picProcesser.dataURLtoFile(
      exportedFileName.value || file.value.name,
      compressedDataURL.value
    )
    return compressedDataURL.value
  }else{
    return ''
  }
}

</script>

<style scoped>
dl dd:not(:last-child){
  margin-bottom: 5px;
}
label{
  font-weight: bold;
}
em{
  color: #888;
  text-decoration: underline;
}
#data-url-text{
  resize: vertical;
  width: 100%;
  box-sizing: border-box;
  padding: 6px;
  min-height: min-content;
}
</style>

# pic-processer
图片压缩、改变图片尺寸、File 和 dataURL 互转

## 安装
```bash
npm install @2080code/pic-processer
```

## 使用
```javascript
import picProcesser from '@2080code/pic-processer'
```
或
```html
<script src="lib/pic-processer.min.js"></script>
```

例子：
```javascript
// 使用前先实例化一个对象：
const picProcesser = new PicProcesser()
// 应用：
picProcesser.getDataURL(file)
picProcesser.compress(file, 0.2)
picProcesser.getDataURL(file)
```

## 方法
### compress
压缩图片质量、改变图片尺寸，输出 dataURL

```javascript
picProcesser.compress(file, 0.2, 1000, 'image/png')
```
#### 参数
参数|类型|默认值|说明
---|---|---|---
`file` | File | `null` | 图片文件
`ratio` | number | `0.5` | 压缩比例，`0`-`1` 之间的小数
`maxWidth` | number | `null` | 图片宽度上限，>1的整数，单位px，`0` 或 `null` 表示不限制，输出图片的高度会等比例缩放
`mime` | string | `image/jpeg` | 输出图片类型

#### 返回
返回值|类型|说明
---|---|---
`Promise<string>` | `Promise<string>` | 压缩后的图片 dataURL 编码

*注意：因为是借助 canvas 渲染输出，几乎是重绘了图片，所以如果压缩比率（`ratio`）设置得太高，最终文件字节可能会比原图更大*

### getDataURL
File 转 dataURL

```javascript
picProcesser.getDataURL(file)
```
#### 参数
参数|类型|默认值|说明
---|---|---|---
`file` | File|Blob | `null` | 图片文件

#### 返回
返回值|类型|说明
---|---|---
`Promise<FileReader>` | `Promise<FileReader>` | 完整的 FileReader 对象，通过`result`属性获取 base64 编码

### dataURLtoFile
dataURL 转 File 对象

```javascript
picProcesser.dataURLtoFile('export.jpg', dataURL)
```

#### 参数
参数|类型|默认值|说明
---|---|---|---
`fileName` | string | `null` | 输出文件名
`dataURL` | string | `null` | base64编码

#### 返回
返回值|类型|说明
---|---|---
`Promise<File>` | `Promise<File>` | File 对象
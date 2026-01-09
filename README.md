# @2080code/pic-processer
![NPM Version](https://img.shields.io/npm/v/%402080code%2Fpic-processer?label=NPM%20Version)
![npm package minimized gzipped size](https://img.shields.io/bundlejs/size/%402080code%2Fpic-processer?format=both&label=NPM%20Package%20Size)
![NPM Last Update](https://img.shields.io/npm/last-update/%402080code%2Fpic-processer?label=NPM%20Last%20Update)
![NPM Downloads](https://img.shields.io/npm/dw/%402080code%2Fpic-processer?label=NPM%20Downloads)

## 介绍
用来对图片做压缩，把 File 对象转为 dataURL，又或者把 dataURL 转为 File 对象。

***

## 安装
```bash
npm install @2080code/pic-processer
```

***

## 使用
```javascript
import PicProcesser from '@2080code/pic-processer'
```
或
```html
<script src="dist/pic-processer.min.js"></script>
```

例子：
```javascript
// 使用前先实例化一个对象：
const picProcesser = new PicProcesser()
// 应用：
picProcesser.getDataURL(file)
picProcesser.compress(file, 0.2)
picProcesser.dataURLtoFile(dataURL, 'export.jpg')
```

***

## 方法
### compress
压缩图片质量、改变图片尺寸，输出 dataURL

```javascript
picProcesser.compress(file, 0.2, 1000, 'image/png')
```
##### 参数
参数|类型|默认值|说明
---|---|---|---
`file` | File | `null` | 图片文件
`options` | [PicProcesser.CompressOptions](######PicProcesser.CompressOptions) | `{ratio: 0.5, maxWidth: null,mime:'image/jpeg'}` | 压缩选项

###### PicProcesser.CompressOptions
参数|类型|默认值|说明
---|---|---|---
`ratio` | number | `0.5` | 压缩比例，`0`-`1` 之间的小数
`maxWidth` | number | `null` | 图片宽度上限，>1的整数，单位px，`0` 或 `null` 表示不限制，输出图片的高度会等比例缩放
`mime` | string | `image/jpeg` | 输出图片类型

##### 返回
返回值|类型|说明
---|---|---
`Promise<string>` | `Promise<string>` | 压缩后的图片 dataURL 编码

*注意：因为是借助 canvas 渲染输出，几乎是重绘了图片，所以如果压缩比率（`ratio`）设置得太高，最终文件字节可能会比原图更大*

***

### getDataURL
File 转 dataURL

```javascript
picProcesser.getDataURL(file)
```
##### 参数
参数|类型|默认值|说明
---|---|---|---
`file` | File \| Blob | `null` | 图片文件

##### 返回
返回值|类型|说明
---|---|---
`Promise<FileReader>` | `Promise<FileReader>` | 完整的 FileReader 对象，通过`result`属性获取 base64 编码

***

### dataURLtoFile
dataURL 转 File 对象

```javascript
picProcesser.dataURLtoFile(dataURL, 'export.jpg')
```

##### 参数
参数|类型|默认值|说明
---|---|---|---
`dataURL` | string | `null` | base64编码
`fileName` | string | `null` | 输出文件名

##### 返回
返回值|类型|说明
---|---|---
`Promise<File>` | `Promise<File>` | File 对象
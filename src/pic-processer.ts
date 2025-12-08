/**
 * picture processer
 * 用来对图片做压缩，把 File 对象转为 dataURL，又或者把 dataURL 转为 File 对象。
 * @author Warren
 */

/**
 * File 转为dataURL
 * @param {File,Blob} file
 * @returns {Promise}
 */
function getDataURL(file:File|Blob):Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // reader.addEventListener('loadstart', () => {
        // })
        reader.addEventListener('load', () => {
            resolve(reader?.result as string)
        }, false);
        reader.addEventListener('loadend', () => {
            console.log('loadend',reader)
            resolve(reader?.result as string)
        })
        reader.addEventListener('error', () => {
            reject(new Error('getDataURL error!'))
        })
        reader.addEventListener('abort', () => {
            reject(new Error('getDataURL abort!'))
        })
        if (file && [Blob,File].some(type=>file instanceof type)) {
            reader.readAsDataURL(file)
        } else {
            reject(new Error('Unspecified file!'))
        }
    })
}

/**
 * 压缩
 * @param {File,Blob} file
 * @param {Number} ratio 压缩比
 * @param {Number} maxWidth 尺寸限制，单位像素
 * @param {string} mime 输出图片类型，默认`image/jpeg`
 * @returns {Promise}
 */
function compress(file:File|Blob, ratio:number = 0.5, maxWidth:number = null,mime:string='image/jpeg'):Promise<string> {
    // console.log(ratio, maxWidth)
    // 通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
    return new Promise((resolve, reject) => {
        let dataURL = '';
        const img = new Image();

        // 尺寸限制必须大于1，否则canvas是渲染不出内容的
        if(maxWidth && maxWidth<2) {
            reject(new Error('maxWidth must be greater than 1!'))
        }

        img.addEventListener('loadstart', () => {
        })
        img.addEventListener('load', () => {
            const canvas = document.createElement('canvas'); // 创建canvas元素
            let scaleRatio = 1
            if (maxWidth && img.width > maxWidth) {
                scaleRatio = maxWidth / img.width
            }
            const width=img.width * scaleRatio
            const height=img.height * scaleRatio
            // 确保canvas的尺寸和图片一样
            canvas.width = width;
            canvas.height = height;
            canvas.getContext('2d').drawImage(img, 0, 0, width, height); // 将图片绘制到canvas中
            dataURL = canvas.toDataURL(mime, +ratio); // 转换图片为dataURL
            resolve(dataURL)
        }, false);
        img.addEventListener('loadend', () => {
            resolve(dataURL)
        })
        img.addEventListener('error', () => {
            reject(new Error('compress error!'))
        })
        img.addEventListener('abort', () => {
            reject(new Error('compress abort!'))
        })

        if (file && [Blob,File].some(type=>file instanceof type)) {
            this.getDataURL(file).then(res => {
                img.src = res
            }).catch(error => {
                reject(error)
            })
        } else {
            reject(new Error('no file!'))
        }

        
    })
}

/**
 * dataURL 转为 File
 * @param {String} fileName 文件名
 * @param {String} dataURL
 * @returns {File}
 */
function dataURLtoFile(fileName:string, dataURL:string):File {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}

export default class PicProcesser {
  constructor() {
  }
  compress=compress
  getDataURL=getDataURL
  dataURLtoFile=dataURLtoFile
}

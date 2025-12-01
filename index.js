/**
 * compress for picture
 * @author Warren
 */

/**
 * 转为dataURL
 * @param {File,Blob} file
 * @returns {Promise}
 */
function getDataURL(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.addEventListener('loadstart', () => {
    })
    reader.addEventListener('load', () => {
      resolve(reader.result)
    }, false);
    reader.addEventListener('loadend', () => {
      resolve()
    })
    reader.addEventListener('error', () => {
      reject(new Error('getDataURL error!'))
    })
    reader.addEventListener('abort', () => {
      reject(new Error('getDataURL abort!'))
    })
    if (file && (file instanceof Blob || file instanceof File)) {
      reader.readAsDataURL(file)
    } else {
      reject(new Error('no file!'))
    }
  })
}

/**
 * 压缩
 * @param {File,Blob} file
 * @param {Number} ratio 压缩比
 * @param {Number} widthLimit 尺寸限制，单位像素
 * @returns {Promise}
 */
function compress(file, ratio = 0.5, widthLimit = null) {
  // console.log(ratio, widthLimit)
  // 通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
  let dataURL = '';

  return new Promise((resolve, reject) => {
    let img = new Image();
    img.addEventListener('loadstart', () => {
    })
    img.addEventListener('load', () => {
      let canvas = document.createElement('canvas'); // 创建canvas元素
      let width = img.width; // 确保canvas的尺寸和图片一样
      let height = img.height;
      if (widthLimit && width > widthLimit) {
        let sRatio = widthLimit / width
        canvas.width = width * sRatio;
        canvas.height = height * sRatio;
      } else {
        canvas.width = width;
        canvas.height = height;
      }
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height); // 将图片绘制到canvas中
      dataURL = canvas.toDataURL('image/jpeg', ratio); // 转换图片为dataURL
      resolve(dataURL)
    }, false);
    img.addEventListener('loadend', () => {
      resolve()
    })
    img.addEventListener('error', () => {
      reject(new Error('compress error!'))
    })
    img.addEventListener('abort', () => {
      reject(new Error('compress abort!'))
    })

    if (file && (file instanceof Blob || file instanceof File)) {
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
 * dataURL转File
 * @param {String} name 文件名
 * @param {String} dataURL
 * @returns {File}
 */
function dataURLtoFile(name, dataURL) {
  let arr = dataURL.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = window.atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], name, { type: mime });
}

export {
  getDataURL,
  compress,
  dataURLtoFile
}
